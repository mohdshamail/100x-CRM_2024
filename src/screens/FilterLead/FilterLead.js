import { View, Platform } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { primaryColor } from "../../constants/constants";
import { ScrollView } from "react-native-gesture-handler";
import SnackBar from "../../components/SnackBar/SnackBar";
import { Button, Text, Searchbar, Checkbox, Appbar } from "react-native-paper";
import DropDownComponent from "../../components/DropDown/DropDown";
import DatePickerComponent from "../../components/DatePicker/DatePicker";
import { leadFilterFormAPI } from "../../api/LeadFilterFormAPI/leadFilterFormAPI";
import MultiSelectComponent from "../../components/DropDown/MultiSelectComponent";
import {
  filterblankData,
  campaignDropDownData,
  certificateStatusDropDownData,
  sortDropDownData,
  countryDropDownData,
  callCountDropDownData,
  pipelineBulkDropDownData,
} from "./FilterFormData";
import { getDropdownValues, getCourseListData,getValueFromStorage } from "../../utility/utility";
import { storageKeys } from '../../constants/constants';
import { submitFilterFormAPI } from "../../api/LeadFilterFormAPI/submitFilterAPI";
import { leadDetailsAPI } from "../../api/LeadDetailsAPI/LeadDetailsAPI";


const FilterLead = ({ navigation }) => {
  const [showMoreFilter, setShowMoreFilter] = useState(false);
  const [filterFormData, setFilterFormData] = useState(null);
  const [dateArray, setDateArray] = useState([]);

  const [mid, setmid] = useState('');
  const [email, setEmail] = useState('');
  const [valall, setValall] = useState("");
  const [filter_lead_quality, setleadQ] = useState([]);
  const [filter_blank, setBlank] = useState([]);
  const [camp_filter, setCamp_filter] = useState("");
  const [esdate, setEsdate] = useState("");
  const [eedate, setEedate] = useState("");
  const [allocation_s_date, setallocation_s_date] = useState("");
  const [allocation_e_date, setallocation_e_date] = useState("");
  const [certificate_status, setcertificate_status] = useState("");
    const [sortby, setSortBy] = useState("");
    const [countryFilterData, setCountryFilterData] = useState("");//mila nhi hai
    const [lmsdate, setLmsdate] = useState("");
    const [lmedate, setLmedate] = useState("");
    const [followupFrom, setFollowupFrom] = useState("");
    const [followupTo, setFollowupTo] = useState("");
    const [filter_course, setCourse] = useState([]);
    const [filter_lCity, setLcity] = useState([]);
    const [filter_pain, setpain] = useState([]);
    const [fliter_product, setFilter_product] = useState([]);
    const [filter_lead1, setLead1] = useState([]);
    const [filter_lead2, setLead2] = useState([]);
    const [callCount, setcallCount] = useState("");
    const [filter_pbd, setPbd] = useState([]);
    const [campaignFrom, setCampaignFrom] = useState("");
    const [campaignTo, setCampaignTo] = useState("");
    const [productleadQ, setproduct_lead_quality] = useState([]);
    const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reseting, setReseting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  // const [filteredRecords, setFilteredRecords] = useState([]);


  const onChangeSearch = (query) => setValall(query);
  const handleCheckboxChange = () => {
    setChecked(!checked);
  };
  const sharedLeadFilter = checked ? "1" : "0";


  // console.log("search" , valall);
  // console.log("lead Qty" , filter_lead_quality);
  // console.log("Filter blank" , filter_blank);
  // console.log("campaign" , camp_filter);//ok
  // console.log("sort" , sortby);
  // console.log("country" , countryFilterData);
  // console.log("course" , filter_course);
  // console.log("lead city" , filter_lCity);
  // console.log("pain area" , filter_pain);
  // console.log("product" , fliter_product);
  // console.log("original lead source" , filter_lead1);
  // console.log("lead source" , filter_lead2);
  // console.log("call count" , callCount);
  // console.log("pipe line bulk demo (pbd)" , filter_pbd);
  // console.log("product lead qty" , valall);
  // console.log("search" , productleadQ);
  // console.log("shared leads" , sharedLeadFilter);



 

  useEffect(()=>{
    getmid();
  },[]);

const getmid = async () => {
  try {
    const getmid = await getValueFromStorage(storageKeys.MEMBER_ID);
    const getemail = await getValueFromStorage(storageKeys.EMAIL_ID);
    if (getmid) {
      setmid(getmid);
      setEmail(getemail);
    }
  } catch (error) {
    console.error('Error fetching mid:', error);
  }};



  

  const datePickedhandler = (date, key) => {
    // Update state for individual date pickers
    switch (key) {
      case "enquiryStartDate":
        setEsdate(date);
        break;
      case "enquiryEndDate":
        setEedate(date);
        break;
      case "allocationStartDate":
        setallocation_s_date(date);
        break;
      case "allocationEndDate":
        setallocation_e_date(date);
        break;
      case "lastModifyStartDate":
        setLmsdate(date);
        break;
      case "lastModifyEndDate":
        setLmedate(date);
        break;
      case "followupFromDate":
        setFollowupFrom(date);
        break;
      case "followupToDate":
        setFollowupTo(date);
        break;
      case "campaignFromDate":
        setCampaignFrom(date);
        break;
      case "campaignToDate":
        setCampaignTo(date);
        break;
      default:
        break;
    }
    // Update or add date object in the array
    const index = dateArray.findIndex((item) => item.key === key);
    const newDateObject = { key, value: date };

    if (index !== -1) {
      const updatedDateArray = [...dateArray];
      updatedDateArray[index] = newDateObject;
      setDateArray(updatedDateArray);
    } else {
      setDateArray([...dateArray, newDateObject]);
    }
  };

  //console.log("this is filter Data == ", filterFormData);
  const getFormDetails = useCallback(async () => {
    try {
      const formDetails = await leadFilterFormAPI();
      setFilterFormData(formDetails);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [leadFilterFormAPI]);

  useEffect(() => {
    getFormDetails();
  }, [getFormDetails]);

  if (filterFormData) {
    const leadQualityData = filterFormData.lead_quality_filt;
    const leadQualityDropDownData = getDropdownValues(leadQualityData);
    const courseFilterData = filterFormData?.course_filter;
    const courseFilters = getCourseListData(courseFilterData);
    const cityLeadFilter = filterFormData?.city_state_filter;
    const city_Filter = cityLeadFilter.map((city) => ({
      label: city,
      value: city,
    }));
    const pain_area_filt = filterFormData?.pain_area_filt;
    const painAreaFilters = pain_area_filt.map((painarea) => ({
      label: painarea,
      value: painarea,
    }));
    const leadSourceFilter = filterFormData?.lead_source_filter;
    const lead_source_filter = getDropdownValues(leadSourceFilter);
    const productsData = filterFormData?.products;
    const productsFilterdata = productsData.map((item) => ({
      label: item.name,
      value: item.id.toString(),
    }));
    //console.log(productsFilterdata);
   
    const submitFilterHandler = async () => {
      try {
        setLoading(true);
        const filterResponse = await submitFilterFormAPI(
          mid,
          email,
          valall,
          filter_lead_quality,
          filter_blank,
          camp_filter,
          esdate,
          eedate,
          allocation_s_date,
          allocation_e_date,
          certificate_status,
          sortby,
          //country
          lmsdate,
          lmedate,
          followupFrom,
          followupTo,
          filter_course,
          filter_lCity,
          filter_pain,
          fliter_product,
          filter_lead1,
          filter_lead2,
          callCount,
          filter_pbd,
          campaignFrom,
          campaignTo,
          productleadQ,
          sharedLeadFilter,     
       );
        // console.log("filterResponse" ,filterResponse);
        if (filterResponse == "null" || filterResponse === null || filterResponse === false) {
          setLoading(false);
          setSuccessMsg("No record Found!");
          setTimeout(() => {
            setSuccessMsg(null);
          }, 2000);
        } else {
          // setFilteredRecords(filterResponse?.records);
          setLoading(false);
          setSuccessMsg("filter Applied Successfully!");
          setTimeout(() => {
            setSuccessMsg(null);
            navigation.navigate("myLeadScreen" ,
            { filteredRecords: filterResponse?.records,
              numberOfRecord:filterResponse?.records.length, 
            }); // Pass filtered records as params
          }, 1000);
        }
      } catch (error) {
        setLoading(false);
        console.log("error in filter lead", error);
      }
    };


const resetFilter = async() => {
 try{
  setReseting(true);
  const resetResponse = await leadDetailsAPI(mid);
  if (resetResponse?.message == "Login again (wrong token)") {
    doLogout();
    setReseting(true);
  } else {
    setReseting(false);
    setSuccessMsg("Reset Applied Successfully!");
    setTimeout(() => {
      setSuccessMsg(null);
      navigation.navigate("myLeadScreen" , 
      {
        filteredRecords: resetResponse?.records,
        numberOfRecord:resetResponse?.records.length, 
      }); 
    }, 1000);
  }
 }catch(error){
  console.log("error in reset filter ", error ); 
 }
};


    return (
      <View
        className={`flex flex-1 bg-white ${Platform.OS === "ios" && "pb-4"}`}
      >
        <View>
          <Appbar.Header
            style={{ backgroundColor: primaryColor }}
            elevated="true"
          >
            <Appbar.Action
              size={30}
              iconColor="white"
              icon="arrow-left"
              onPress={() => navigation.goBack()}
              // onPress={() => navigation.navigate('myLeadScreen')}
            />
            <Appbar.Content titleStyle={{ color: "white" }} title="Filter" />
          </Appbar.Header>
        </View>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          alwaysBounceVertical={true}
        >
          <View className=" flex p-5">
            <View className="flex p-1">
              {filterFormData && mid && email && (
                <>
                  <View>
                    <View className="flex-row justify-between">
                      <Text className="mt-2" variant="titleLarge">
                        Lead Filter
                      </Text>
                      <View className="pb-3">
                        <Button
                          mode="contained"
                          onPress={() => setShowMoreFilter(!showMoreFilter)}
                        >
                          {!showMoreFilter ? "View all" : "View less"}
                        </Button>
                      </View>
                    </View>
                    <Searchbar
                      iconColor={primaryColor}
                      inputStyle={{ paddingBottom: 7 }}
                      style={{
                        height: 50,
                        borderRadius: 5,
                        borderColor: "rgba(28,27,31,1)",
                        backgroundColor: "white",
                        borderWidth: 1,
                      }}
                      onBlur={submitFilterHandler}
                      placeholder="Name,Email,Mobile"
                      onChangeText={onChangeSearch}
                      value={valall}
                    />
                  </View>
                  <View className="mt-2">
                    <Text variant="titleMedium">Lead Quality</Text>
                    <MultiSelectComponent
                      data={leadQualityDropDownData}
                      setSelected={setleadQ}
                      selected={filter_lead_quality}
                    />
                  </View>
                  <View className="mt-2">
                    <Text variant="titleMedium">Filter Blank</Text>
                    <MultiSelectComponent
                      data={filterblankData}
                      setSelected={setBlank}
                      selected={filter_blank}
                    />
                  </View>
                  <View className="mt-2">
                    <Text variant="titleMedium">Campaign</Text>
                    <DropDownComponent
                      search={true}
                      data={campaignDropDownData}
                      value={camp_filter}
                      setValue={setCamp_filter}
                    />
                  </View>
                  <View className="mt-2">
                    <Text variant="titleMedium">Enquiry Start Date (F)</Text>
                    <DatePickerComponent
                      initialDate={esdate}
                      onDateChange={(date) =>
                        datePickedhandler(date, "enquiryStartDate")
                      }
                      // onDateChange={(date) => setEnquiryStartDate(date)}
                    />
                  </View>
                  <View className="mt-2">
                    <Text variant="titleMedium">Enquiry End Date (F)</Text>
                    <DatePickerComponent
                      //it receives 2 prop initialDate,onDateChange
                      initialDate={eedate}
                      onDateChange={(date) =>
                        datePickedhandler(date, "enquiryEndDate")
                      }
                    />
                  </View>
                  <View className="mt-2">
                    <Text variant="titleMedium">
                      Allocation Start Date (F+R)
                    </Text>
                    <DatePickerComponent
                      //it receives 2 prop initialDate,onDateChange
                      initialDate={allocation_s_date}
                      //onDateChange={datePickedhandler}
                      onDateChange={(date) =>
                        datePickedhandler(date, "allocationStartDate")
                      }
                    />
                  </View>
                  <View className="mt-2">
                    <Text variant="titleMedium">Allocation End Date (F+R)</Text>
                    <DatePickerComponent
                      //it receives 2 prop initialDate,onDateChange
                      initialDate={allocation_e_date}
                      //onDateChange={datePickedhandler}
                      onDateChange={(date) =>
                        datePickedhandler(date, "allocationEndDate")
                      }
                    />
                  </View>
                  {showMoreFilter && (
                    <View>
                      <View className="mt-2">
                        <Text variant="titleMedium">Certificate status</Text>
                        <DropDownComponent
                          search={true}
                          data={certificateStatusDropDownData}
                          value={certificate_status}
                          setValue={setcertificate_status}
                        />
                      </View>
                      <View className="mt-2">
                        <Text variant="titleMedium">Sort</Text>
                        <DropDownComponent
                          search={true}
                          data={sortDropDownData}
                          value={sortby}
                          setValue={setSortBy}
                        />
                      </View>
                      <View className="mt-2">
                        <Text variant="titleMedium">Country</Text>
                        <DropDownComponent
                          search={true}
                          data={countryDropDownData}
                          value={countryFilterData}
                          setValue={setCountryFilterData}
                        />
                      </View>
                      <View className="mt-2">
                        <Text variant="titleMedium">
                          Last Modify Start Date
                        </Text>
                        <DatePickerComponent
                          //it receives 2 prop initialDate,onDateChange
                          initialDate={lmsdate}
                          //onDateChange={datePickedhandler}
                          onDateChange={(date) =>
                            datePickedhandler(date, "lastModifyStartDate")
                          }
                        />
                      </View>
                      <View className="mt-2">
                        <Text variant="titleMedium">Last Modify End Date</Text>
                        <DatePickerComponent
                          //it receives 2 prop initialDate,onDateChange
                          initialDate={lmedate}
                          //onDateChange={datePickedhandler}
                          onDateChange={(date) =>
                            datePickedhandler(date, "lastModifyEndDate")
                          }
                        />
                      </View>
                      <View className="mt-2">
                        <Text variant="titleMedium">Followup From</Text>
                        <DatePickerComponent
                          //it receives 2 prop initialDate,onDateChange
                          initialDate={followupFrom}
                          //onDateChange={datePickedhandler}
                          onDateChange={(date) =>
                            datePickedhandler(date, "followupFromDate")
                          }
                        />
                      </View>
                      <View className="mt-2">
                        <Text variant="titleMedium">Followup To</Text>
                        <DatePickerComponent
                          //it receives 2 prop initialDate,onDateChange
                          initialDate={followupTo}
                          //onDateChange={datePickedhandler}
                          onDateChange={(date) =>
                            datePickedhandler(date, "followupToDate")
                          }
                        />
                      </View>
                      <View className="mt-2">
                        <Text variant="titleMedium">Course</Text>
                        <MultiSelectComponent
                          data={courseFilters}
                          setSelected={setCourse}
                          selected={filter_course}
                        />
                      </View>
                      <View className="mt-2">
                        <Text variant="titleMedium">Lead City</Text>
                        <MultiSelectComponent
                          data={city_Filter}
                          setSelected={setLcity}
                          selected={filter_lCity}
                        />
                      </View>
                      <View className="mt-2">
                        <Text variant="titleMedium">Pain Area</Text>
                        <MultiSelectComponent
                          data={painAreaFilters}
                          setSelected={setpain}
                          selected={filter_pain}
                        />
                      </View>
                      {/* only this filter remains  */}
                      <View className="mt-2">
                        <Text variant="titleMedium">Product</Text>
                        <MultiSelectComponent
                          data={productsFilterdata}
                          setSelected={setFilter_product}
                          selected={fliter_product}
                        />
                      </View>
                      <View className="mt-2">
                        <Text variant="titleMedium">Original Lead Source</Text>
                        <MultiSelectComponent
                          data={lead_source_filter}
                          setSelected={setLead1}
                          selected={filter_lead1}
                        />
                      </View>
                      <View className="mt-2">
                        <Text variant="titleMedium">Lead Source</Text>
                        <MultiSelectComponent
                          data={lead_source_filter}
                          setSelected={setLead2}
                          selected={filter_lead2}
                        />
                      </View>
                      <View className="mt-2">
                        <Text variant="titleMedium">Call Count</Text>
                        <DropDownComponent
                          search={false}
                          data={callCountDropDownData}
                          value={callCount}
                          setValue={setcallCount}
                        />
                      </View>
                      <View className="mt-2">
                        <Text variant="titleMedium">Pipeline/Bulk/Demo</Text>
                        <MultiSelectComponent
                          data={pipelineBulkDropDownData}
                          selected={filter_pbd}
                          setSelected={setPbd}
                        />
                      </View>
                      <View className="mt-2">
                        <Text variant="titleMedium">Campaign From</Text>
                        <DatePickerComponent
                          //it receives 2 prop initialDate,onDateChange
                          initialDate={campaignFrom}
                          //onDateChange={datePickedhandler}
                          onDateChange={(date) =>
                            datePickedhandler(date, "campaignFromDate")
                          }
                        />
                      </View>
                      <View className="mt-2">
                        <Text variant="titleMedium">Campaign To</Text>
                        <DatePickerComponent
                          initialDate={campaignTo}
                          //onDateChange={datePickedhandler}
                          onDateChange={(date) =>
                            datePickedhandler(date, "campaignToDate")
                          }
                        />
                      </View>
                      <View className="mt-2">
                        <Text variant="titleMedium">Product Lead Quality</Text>
                        <MultiSelectComponent
                          data={leadQualityDropDownData}
                          setSelected={setproduct_lead_quality}
                          selected={productleadQ}
                        />
                      </View>
                      <View className="flex-row">
                        <View className="mt-1">
                          <Checkbox
                            status={checked ? "checked" : "unchecked"}
                            onPress={handleCheckboxChange}
                          />
                        </View>
                        <View>
                          <Text variant="titleMedium" className="mt-3">
                            Shared Leads
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}

                  <View>
                    <Button
                      mode="contained"
                      loading={loading}
                      disabled={loading ? true : false}
                      // style={{ marginVertical: 10 }}
                      onPress={submitFilterHandler}
                      className="mt-3"
                    >
                      Filter Lead
                    </Button>
                   <View className='mt-2'>
                   <Button 
                    style={{borderColor:primaryColor,borderWidth:1}}
                    mode="outlined"
                    onPress={resetFilter}
                    loading={reseting}
                    disabled={reseting ? true : false}
                    // style={{ marginVertical: 10 }}
                    >
                      Reset
                    </Button>
                   </View>
                  </View>
                </>
              )}
            </View>
          </View>
        </ScrollView>
        {successMsg && <SnackBar snackLabel="Ok" snackText={successMsg} />}
      </View>
    );
  }
};
export default FilterLead;
