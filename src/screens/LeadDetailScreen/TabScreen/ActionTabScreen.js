import { View, TouchableOpacity, Image, StyleSheet,Alert } from "react-native";
import React, { useState } from "react";
import DataTableComponent from '../../../components/DataTable/DataTableComponent';
import { primaryColor } from "../../../constants/constants";
import { Card, TextInput, Text, Button, } from "react-native-paper";
import DateAndTimePicker from '../../../components/DateAndTimePicker/DateAndTimePicker';
import DropDownComponent from "../../../components/DropDown/DropDown";
import { ScrollView } from "react-native-gesture-handler";
import SnackBar from '../../../components/SnackBar/SnackBar';
// import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { customerCall,getDropdownValues } from "../../../utility/utility";
import {languageData} from '../filterFormData'
import { useNavigation } from '@react-navigation/native';
import axios from "axios";


const ActionTabScreen = ({ lead_data, filterRecordData }) => {
  const navigation = useNavigation();
  const leadID = lead_data?.id;
  const [user_name, setUser_name] = useState(lead_data?.name);
  const [dateInput, setDateInput] = useState(null);
  const [language, setLanguage] = useState(null);
  const [leadqty, setLeadqty] = useState(null);
  const [leadQtyList, setLeadQtyList] = useState(false);
  const [productleadQtyList, setProductLeadQtyList] = useState(false);
  const [painAreaList, setPainAreaList] = useState(false);
  const [courseList, setCourseList] = useState(false);
  const [leadSourceList, setLeadSourceList] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [showtableLeadQty , setShowTableLeadQty] = useState(false);
  const [showtableProductQty , setShowTableProductQty] = useState(false);
  const [showtablePainArea , setShowTablePainArea] = useState(false);
  const [showtableCourse , setShowTableCourse] = useState(false);

  // console.log(language);
  // console.log(leadQtyList);

  const nameChangeHandler = (text) => {
    setUser_name(text);
  };
 
 const leadQty_filt = getDropdownValues(filterRecordData?.lead_quality_filt);
 const pain_area_filt = getDropdownValues(filterRecordData?.pain_area_filt);
 const course_filt = filterRecordData?.course_list_r.map(({ course_name }) => ({
  label: course_name,
  value: course_name,
}));
const products_filt = filterRecordData?.products.map(({id, name }) => ({
  label: name,
  value: id,
}));

console.log(language);

   //call by ozonetel
   const ozoentelCallHandler = () => {
    const uid = lead_data?.email;
    const cn = lead_data?.ozonetel_campaign_name;
    const mob = lead_data?.mobile;
    customerCall(uid,cn,mob);
  };
  const datafortable = [
    // { sno: 1, name: "Alice", date: "2023-11-21" },
    // { sno: 2, name: "Bob", date: "2023-12-05" },
    // { sno: 11, name: "Alice", date: "2023-11-21" },
  ]
  console.log(leadID,user_name)

  // async function nameChangeAPI() {
  //   try {
  //       const response = await axios.get(`https://crm.henryharvin.com/portal-new/amob/for/update?l_id=${leadID}&name=${user_name}`,{
  //         headers: {
  //           'Content-Type': 'text/html',
  //         },
  //       });
  //       if(response?.data?.message){
  //         Alert.alert(  "Success",
  //         "Name updated Successfully");
  //       }else{
  //         Alert.alert("Error in updating country Code!");
  //       }
  //   } catch (error) {
  //       console.error('Error fetching data:', error);
  //   }};

    // async function languageChangeAPI() {
    //   try {
    //       const response = await axios.get(`https://crm.henryharvin.com/portal-new/app-lswsheets/${leadID}?col=language&value=${language}`,{
    //         headers: {
    //           'Content-Type': 'text/html',
    //         },
    //       });
    //       if(response?.data?.message){
    //         Alert.alert(  "Success",
    //         response?.data?.message );
    //       }else{
    //         Alert.alert("Error in updating country Code!");
    //       }
    //   } catch (error) {
    //       console.error('Error fetching data:', error);
    //   }};




  const handleMsg = () => {
    setSuccessMsg("This feature will be available soon");
    setTimeout(() => {
      setSuccessMsg(null);
    }, 3000);
  } 


  return (
    <View style={{ flex: 1, paddingBottom: 10 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mx-6 mt-5">
          <View className="mb-2">
            <Text className="mx-3 text-gray-600 font-bold">Original date / Time: {lead_data?.datetime}</Text>
          </View>
          <Card style={{ backgroundColor: "white", height:'auto', padding: 2 }}>
            {/* <LinearGradient
             colors={['rgba(0,0,0,0.8)', 'transparent']} > */}
            <View className="flex-row mt-2 flex-wrap">
              <View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleMsg}
                >
                  <Image
                    source={require("../../../../assets/icons_img/addPipeline.png")}
                    style={styles.img}
                  />
                  <Text style={styles.text} className='text-gray-600'>Add pipeline</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleMsg}
                >
                  <Image
                    source={require("../../../../assets/icons_img/cpLead.png")}
                    style={styles.img}
                  />
                  <Text style={styles.text} className='text-gray-600'>Potential CP Lead</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleMsg}
                >
                  <Image
                    source={require("../../../../assets/icons_img/IPLeads.png")}
                    style={styles.img}
                  />
                  <Text style={styles.text} className='text-gray-600'>Potential IP Lead</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => 
                    navigation.navigate('ActionLeadDetailForm',
                    {
                      leadID:leadID,
                      filterRecordData:filterRecordData
                    }
                    )}
                >
                  <Image
                    source={require("../../../../assets/icons_img/LeadDetail.png")}
                    style={styles.img}
                  />
                  <Text style={styles.text} className='text-gray-600'>Lead Details</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleMsg}
                >
                  <Image
                    source={require("../../../../assets/icons_img/sendMailer.png")}
                    style={styles.img}
                  />
                  <Text style={styles.text} className='text-gray-600'>Send Mailer</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleMsg}
                >
                  <Image
                    source={require("../../../../assets/icons_img/Traningdoc.png")}
                    style={styles.img}
                  />
                  <Text style={styles.text} className='text-gray-600'>Training Docs</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleMsg}
                >
                  <Image
                    source={require("../../../../assets/icons_img/shareLead.png")}
                    style={styles.img}
                  />
                  <Text style={styles.text} className='text-gray-600'>Share Lead</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={ozoentelCallHandler}
                >
                  <Image
                    source={require("../../../../assets/icons_img/call.png")}
                    style={styles.img}
                  />
                  <Text style={styles.text} className='text-gray-600 px-2 pt-1'>Call</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* </LinearGradient> */}
          </Card>
        </View>
        <View className="mx-8 mt-3">
          {/* <View className="">
            <Text variant="titleMedium" className="mx-2">
              Full Name
            </Text>
            <View>
              <TextInput
                style={{ height: 50, marginTop: 3,backgroundColor:"white" }}
                mode="outlined"
                placeholder={"Enter Name"}
                value={user_name}
                onBlur={nameChangeAPI}
                onChangeText={nameChangeHandler}
                right={<TextInput.Icon icon={"pencil"} color={primaryColor} />}
              />
            </View>
          </View> */}
          {/* <View className="mt-3">
            <Text variant="titleMedium" className="mx-2">
              Language Candidate Speaks *
            </Text>
            <View className="mt-2">
              <DropDownComponent
                placeholder={lead_data?.language}
                data={languageData}
                value={language}
                onSetValue={languageChangeAPI}
                setValue={setLanguage}
              />
            </View>
          </View> */}
          {/* date time picker starts here */}
          <View className="mt-3">
            <Text variant="titleMedium" className="mx-2">
              Followup / Modify Date/Time
            </Text>
            <View className="mt-2">
              <DateAndTimePicker
              placeholder={lead_data?.followuptime}
               initialDate={dateInput}
               onDateChange={(date) => setDateInput(date)}
              />
             </View>
          </View>
          {/* DateTime picker ends here */}
          <View className="mt-2">
            <View className="flex flex-row justify-between">
              <Text variant="titleMedium" className="mx-2 mt-2">
                Lead Quality
              </Text>
              <Button onPress={() => setShowTableLeadQty(!showtableLeadQty)}>
                View All
              </Button>
            </View>
          { showtableLeadQty && <View className='mb-4'>
            <DataTableComponent data={datafortable} tableTitle={"LEAD QUALITY List"}/>
            </View>}
            <View>
              <DropDownComponent
                placeholder={lead_data?.lead_quality}
                data={leadQty_filt}
                value={leadqty}
                setValue={setLeadqty}
              />
            </View>
          </View>
          <View className="mt-2">
            <View className="flex flex-row justify-between">
              <Text variant="titleMedium" className="mx-2 mt-2">
                Product Lead Quality
              </Text>
              <Button onPress={() => setShowTableProductQty(!showtableProductQty)}>
                View All
              </Button>
            </View>
            { showtableProductQty && <View className='mb-4'>
            <DataTableComponent data={datafortable} tableTitle={"PRODUCTLEAD QUALITY List"}/>
            </View>}
            <View className="">
              <DropDownComponent
                placeholder={lead_data?.product_lead_quality}
                data={leadQty_filt}
                value={leadqty}
                setValue={setLeadqty}
              />
            </View>
          </View>
          <View className="mt-3">
            <View className=" flex-row justify-between">
              <Text variant="titleMedium" className="mx-2 mt-2">
                Pain Area
              </Text>
              <Button onPress={() => setShowTablePainArea(!showtablePainArea)}>
                View All
              </Button>
            </View>
            { showtablePainArea && <View className='mb-4'>
            <DataTableComponent data={datafortable} tableTitle={"PAINAREA List"}/>
            </View>}
            <View>
              <DropDownComponent
                placeholder={lead_data?.painarea}
                data={pain_area_filt}
                value={leadqty}
                setValue={setLeadqty}
              />
            </View>
          </View>
          <View className="mt-3">
            <View className="flex-row justify-between">
              <Text variant="titleMedium" className="mx-2 mt-2">
                Course
              </Text>
              <Button onPress={() => setShowTableCourse(!showtableCourse)}>
                View All
              </Button>
            </View>
            {showtableCourse && (<View className='mb-4'>
            <DataTableComponent data={datafortable} tableTitle={"COURSE List"}/>
            </View>)}
            <View>
              <DropDownComponent
                placeholder={lead_data?.course}
                data={course_filt}
                value={leadqty}
                setValue={setLeadqty}
              />
            </View>
          </View>
          <View className="mt-3 mb-3">
            <Text variant="titleMedium" className="mx-2">
              Product
            </Text>
            <View className="mt-2">
              <DropDownComponent
                placeholder={lead_data?.products}
                data={products_filt}
                value={leadqty}
                setValue={setLeadqty}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      {successMsg && <SnackBar snackLabel="Ok" snackText={successMsg} />}
    </View>
  );
};

export default ActionTabScreen;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 50,
    width: 80,
    marginLeft: 5,
  },
  img: {
    // Adjust image size and position:
    width: 40,
    height: 40,
    marginLeft: 7,
    borderRadius:0
  },
  text: {
    fontSize: 12,
    marginLeft: 9,
    marginTop: 2,
    fontWeight:'700',
  },
});
