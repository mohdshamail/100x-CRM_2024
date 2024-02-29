import { View, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import DataTableComponent from "../../../components/DataTable/DataTableComponent";
import { primaryColor } from "../../../constants/constants";
import {
  Card,
  IconButton,
  Text,
  Button,
  Modal,
  Portal,
  Headline,
} from "react-native-paper";
import DateAndTimePicker from "../../../components/DateAndTimePicker/DateAndTimePicker";
import DropDownComponent from "../../../components/DropDown/DropDown";
import { ScrollView } from "react-native-gesture-handler";
import SnackBar from "../../../components/SnackBar/SnackBar";
import { customerCall, getDropdownValues } from "../../../utility/utility";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const ActionTabScreen = ({ lead_data, filterRecordData, mid }) => {
  const navigation = useNavigation();
  const leadID = lead_data?.id;
  const [user_name, setUser_name] = useState(lead_data?.name);
  const [dateInput, setDateInput] = useState(null);
  const [language, setLanguage] = useState(null);
  const [leadqty, setLeadqty] = useState(null);
  const [leadQtyList, setLeadQtyList] = useState(false);
  const [painAreaQty, setPainAreaQty] = useState(null);
  const [courseQty, setCourseQty] = useState(null);
  const [productQty, setProductQty] = useState(null);
  const [productData, setProductsData] = useState(null);
  const [cpvisible, setCPVisible] = useState(false);
  const [ipvisible, setIPVisible] = useState(false);
  const [shareLeadvisible, setShareLeadvisible] = useState(false);
  const [shareLead, setShareLead] = useState("");
  const [successMsg, setSuccessMsg] = useState(null);
  const [showtableLeadQty, setShowTableLeadQty] = useState(false);
  const [showtableProductQty, setShowTableProductQty] = useState(false);
  const [showtablePainArea, setShowTablePainArea] = useState(false);
  const [showtableCourse, setShowTableCourse] = useState(false);
  const [pipelineStatus, setPipelineStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  // console.log(language);
  // console.log(leadQtyList);

  // const nameChangeHandler = (text) => {
  //   setUser_name(text);
  // };

  const leadQty_filt = getDropdownValues(filterRecordData?.lead_quality_filt);
  const pain_area_filt = getDropdownValues(filterRecordData?.pain_area_filt);
  const course_filt = filterRecordData?.course_list_r.map(
    ({ course_name }) => ({
      label: course_name,
      value: course_name,
    })
  );
  const products_filt = filterRecordData?.products.map(({ id, name }) => ({
    label: name,
    value: id,
  }));
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 18,
  };
  const showModal = () => setCPVisible(true);
  const hideModal = () => setCPVisible(false);
  const showIPModal = () => setIPVisible(true);
  const hideIPModal = () => setIPVisible(false);
  const hideShareLeadModal = () => setShareLeadvisible(false);
  const showShareLeadModal = () => setShareLeadvisible(true);

  //call by ozonetel
  const ozoentelCallHandler = () => {
    const uid = lead_data?.email;
    const cn = lead_data?.ozonetel_campaign_name;
    const mob = lead_data?.mobile;
    customerCall(uid, cn, mob);
  };
  const datafortable = [];
  async function addPipelineAPI() {
    try {
      const response = await axios.get(
        `https://crm.henryharvin.com/portal-new/app_addpipe?mid=${mid}&id=${leadID}`,
        {
          headers: {
            "Content-Type": "text/html",
          },
        }
      );
      console.log("response of the Added to pipeline =", response.data.success);
      if (response?.data?.success) {
        setPipelineStatus(!pipelineStatus);
        Alert.alert("Success", "Lead successfully Added to pipeline");
      } else {
        Alert.alert("Error", "Something went wrong!");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function removePipelineAPI() {
    try {
      const response = await axios.get(
        `https://crm.henryharvin.com/portal-new/app-lswsheets/${leadID}?col=pipeline&value=0`,
        {
          headers: {
            "Content-Type": "text/html",
          },
        }
      );
      console.log(
        "response of the removed from pipeline = ",
        response?.data?.success
      );
      if (response?.data?.success) {
        setPipelineStatus(!pipelineStatus);
        Alert.alert("Success", "Lead successfully removed from pipeline");
      } else {
        Alert.alert("Error", "Something went wrong!");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function potentialCPLeadAPI() {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://crm.henryharvin.com/portal-new/app_lswsheets/${leadID}/lead-transfer-cp-ip?mid=${mid}&department=CP`,
        {
          headers: {
            "Content-Type": "text/html",
          },
        }
      );
      console.log("response of the potentialCPLeadAPI = ", response);
      if (response?.data?.success) {
        setLoading(false);
        hideModal();
        setPipelineStatus(!pipelineStatus);
        Alert.alert(
          "Success",
          "Your lead has been successfully shared to CP team."
        );
      } else {
        setLoading(false);
        hideModal();
        Alert.alert("Error", "Something went wrong!");
      }
    } catch (error) {
      setLoading(false);
      hideModal();
      console.error("Error fetching data:", error);
    }
  }

  async function potentialIPLeadAPI() {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://crm.henryharvin.com/portal-new/app_lswsheets/${leadID}/lead-transfer-cp-ip?mid=${mid}&department=IP`,
        {
          headers: {
            "Content-Type": "text/html",
          },
        }
      );
      console.log("response of the potentialCPLeadAPI = ", response);
      if (response?.data?.success) {
        setLoading(false);
        hideModal();
        setPipelineStatus(!pipelineStatus);
        Alert.alert(
          "Success",
          "Your lead has been successfully shared to CP team."
        );
      } else {
        setLoading(false);
        hideModal();
        Alert.alert("Error", "Something went wrong!");
      }
    } catch (error) {
      setLoading(false);
      hideModal();
      console.error("Error fetching data:", error);
    }
  }

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
  };

  return (
    <View style={{ flex: 1, paddingBottom: 10 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mx-6 mt-5">
          <View className="mb-2">
            <Text className="mx-3 text-gray-600 font-bold">
              Original date / Time: {lead_data?.datetime}
            </Text>
          </View>
          <Card
            style={{ backgroundColor: "white", height: "auto", padding: 5 }}
          >
            <View className="flex-row mt-2 mb-5 flex-wrap justify-evenly">
              {pipelineStatus ? (
                <View className="mr-2">
                  <IconButton
                    icon="credit-card-minus-outline" //minus
                    iconColor={primaryColor}
                    size={35}
                    onPress={removePipelineAPI}
                  />
                  <View style={styles.container}>
                    <Text
                      className="text-gray-600 font-bold"
                      style={styles.addText}
                    >
                      Remove
                    </Text>
                    <Text
                      className="text-gray-600 font-bold"
                      style={styles.pipelineText}
                    >
                      pipeline
                    </Text>
                  </View>
                </View>
              ) : (
                <View className="mr-2">
                  <IconButton
                    icon="credit-card-plus-outline" //minus
                    iconColor={primaryColor}
                    size={35}
                    onPress={addPipelineAPI}
                  />
                  <View style={styles.container}>
                    <Text
                      className="text-gray-600 font-bold"
                      style={styles.addText}
                    >
                      Add
                    </Text>
                    <Text
                      className="text-gray-600 font-bold"
                      style={styles.pipelineText}
                    >
                      pipeline
                    </Text>
                  </View>
                </View>
              )}
              <View className="mr-2">
                <IconButton
                  icon="bag-personal-outline" //-check
                  iconColor={primaryColor}
                  size={35}
                  onPress={showModal}
                />
                <View style={styles.container}>
                  <Text
                    className="text-gray-600 font-bold"
                    style={styles.addText}
                  >
                    Potential
                  </Text>
                  <Text
                    className="text-gray-600 font-bold"
                    style={styles.pipelineText}
                  >
                    CP Lead
                  </Text>
                </View>
              </View>
              <View>
                <Portal className="rounded-lg">
                  <Modal
                    className="mx-8"
                    visible={cpvisible}
                    onDismiss={hideModal}
                    contentContainerStyle={containerStyle}
                  >
                    <View>
                      <Headline
                        style={{ color: primaryColor }}
                        className="text-center font-bold"
                      >
                        Are you sure?
                      </Headline>
                    </View>
                    <Text className="text-lg text-slate-700 mt-3">
                      You won't be able to revert this!
                    </Text>
                    <View className="flex-row mt-6">
                      <Button
                        onPress={potentialCPLeadAPI}
                        loading={loading}
                        mode="contained"
                      >
                        Potential CP Lead
                      </Button>
                      <Button
                        className="mx-2"
                        mode="outlined"
                        onPress={hideModal}
                      >
                        Cancel
                      </Button>
                    </View>
                  </Modal>
                </Portal>
              </View>
              <View className="mr-2">
                <IconButton
                  icon="book-multiple-outline" //-check
                  iconColor={primaryColor}
                  size={35}
                  onPress={showIPModal}
                />
                <View style={styles.container}>
                  <Text
                    className="text-gray-600 font-bold"
                    style={styles.addText}
                  >
                    Potential
                  </Text>
                  <Text
                    className="text-gray-600 font-bold"
                    style={styles.pipelineText}
                  >
                    IP Lead
                  </Text>
                </View>
              </View>
              <View>
                <Portal className="rounded-lg">
                  <Modal
                    className="mx-8"
                    visible={ipvisible}
                    onDismiss={hideIPModal}
                    contentContainerStyle={containerStyle}
                  >
                    <View>
                      <Headline
                        style={{ color: primaryColor }}
                        className="text-center font-bold"
                      >
                        Are you sure?
                      </Headline>
                    </View>
                    <Text className="text-lg text-slate-700 mt-3">
                      You won't be able to revert this!
                    </Text>
                    <View className="flex-row mt-6">
                      <Button
                        onPress={potentialIPLeadAPI}
                        loading={loading}
                        mode="contained"
                      >
                        Potential IP Lead
                      </Button>
                      <Button
                        className="mx-2"
                        mode="outlined"
                        onPress={hideIPModal}
                      >
                        Cancel
                      </Button>
                    </View>
                  </Modal>
                </Portal>
              </View>
              <View>
                <IconButton
                  icon="card-account-details-star-outline" //-check
                  iconColor={primaryColor}
                  size={35}
                  onPress={() =>
                    navigation.navigate("ActionLeadDetailForm", {
                      leadID: leadID,
                      filterRecordData: filterRecordData,
                    })
                  }
                />
                <View style={styles.container}>
                  <Text
                    className="text-gray-600 font-bold"
                    style={styles.addText}
                  >
                    Lead
                  </Text>
                  <Text
                    className="text-gray-600 font-bold"
                    style={styles.pipelineText}
                  >
                    Details
                  </Text>
                </View>
              </View>
              <View>
                <IconButton
                  icon="email-outline" //-check
                  iconColor={primaryColor}
                  size={35}
                  onPress={handleMsg}
                />
                <View style={styles.container}>
                  <Text
                    className="text-gray-600 font-bold"
                    style={styles.addText}
                  >
                    Send
                  </Text>
                  <Text
                    className="text-gray-600 font-bold"
                    style={styles.pipelineText}
                  >
                    Mailer
                  </Text>
                </View>
              </View>
              <View>
                <IconButton
                  icon="file-document-outline" //-check
                  iconColor={primaryColor}
                  size={35}
                  onPress={handleMsg}
                />
                <View style={styles.container}>
                  <Text
                    className="text-gray-600 font-bold"
                    style={styles.addText}
                  >
                    Training
                  </Text>
                  <Text
                    className="text-gray-600 font-bold"
                    style={styles.pipelineText}
                  >
                    Docs
                  </Text>
                </View>
              </View>
              <View>
                <IconButton
                  icon="share-variant-outline" //-check
                  iconColor={primaryColor}
                  size={35}
                  onPress={showShareLeadModal}
                />
                <View style={styles.container}>
                  <Text
                    className="text-gray-600 font-bold"
                    style={styles.addText}
                  >
                    Share
                  </Text>
                  <Text
                    className="text-gray-600 font-bold"
                    style={styles.pipelineText}
                  >
                    Lead
                  </Text>
                </View>
              </View>
              <View>
                <Portal className="rounded-lg">
                  <Modal
                    className="mx-8"
                    visible={shareLeadvisible}
                    onDismiss={hideShareLeadModal}
                    contentContainerStyle={containerStyle}
                  >
                    <View>
                      <Text
                        style={{ color: primaryColor }}
                        className="text-center text-xl font-bold"
                      >
                       Share Lead with other member
                      </Text>
                    </View>
                    <Text className="text-lg text-slate-700 mt-3">
                    Share Lead With:
                    </Text>
                    <View className='mt-3'>
                        <DropDownComponent 
                          search={true}
                          placeholder={"--Select Member--"}
                          data={leadQty_filt}
                          value={shareLead}
                          setValue={setShareLead}
                        />
                      </View>
                    <View className="flex-row mt-4 justify-end">
                      <Button
                        className="mx-2"
                        mode="outlined"
                        onPress={hideShareLeadModal}
                      >
                        Cancel
                      </Button>
                      <Button
                        onPress={() => {console.log("first")}}
                        loading={loading}
                        mode="contained"
                      >
                        Submit
                      </Button>
                    </View>
                  </Modal>
                </Portal>
              </View>
              <View>
                <IconButton
                  icon="phone-in-talk" //-check
                  iconColor={primaryColor}
                  size={35}
                  onPress={ozoentelCallHandler}
                />
                <View style={styles.container}>
                  <Text
                    className="text-gray-600 font-bold"
                    style={styles.addText}
                  >
                    Call
                  </Text>
                </View>
              </View>
            </View>
          </Card>
        </View>
        <View className="mx-8 mt-3">
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
            {showtableLeadQty && (
              <View className="mb-4">
                <DataTableComponent
                  data={datafortable}
                  tableTitle={"LEAD QUALITY List"}
                />
              </View>
            )}
            <View>
              <DropDownComponent
                search={true}
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
              <Button
                onPress={() => setShowTableProductQty(!showtableProductQty)}
              >
                View All
              </Button>
            </View>
            {showtableProductQty && (
              <View className="mb-4">
                <DataTableComponent
                  data={datafortable}
                  tableTitle={"PRODUCTLEAD QUALITY List"}
                />
              </View>
            )}
            <View className="">
              <DropDownComponent
                search={true}
                placeholder={lead_data?.product_lead_quality}
                data={leadQty_filt}
                value={productQty}
                setValue={setProductQty}
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
            {showtablePainArea && (
              <View className="mb-4">
                <DataTableComponent
                  data={datafortable}
                  tableTitle={"PAINAREA List"}
                />
              </View>
            )}
            <View>
              <DropDownComponent
                search={true}
                placeholder={lead_data?.painarea}
                data={pain_area_filt}
                value={painAreaQty}
                setValue={setPainAreaQty}
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
            {showtableCourse && (
              <View className="mb-4">
                <DataTableComponent
                  data={datafortable}
                  tableTitle={"COURSE List"}
                />
              </View>
            )}
            <View>
              <DropDownComponent
                search={true}
                placeholder={lead_data?.course}
                data={course_filt}
                value={courseQty}
                setValue={setCourseQty}
              />
            </View>
          </View>
          <View className="mt-3 mb-3">
            <Text variant="titleMedium" className="mx-2">
              Product
            </Text>
            <View className="mt-2">
              <DropDownComponent
                search={true}
                placeholder={lead_data?.products}
                data={products_filt}
                value={productData}
                setValue={setProductsData}
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
  container: {
    flexDirection: "column", // Stack elements vertically
    alignItems: "center",
    marginTop: -10, // Align text horizontally in the center
  },
  addText: {
    fontSize: 12, // Maintain original font size
    // Introduce a small margin below "Add"
  },

  button: {
    padding: 8,
    borderRadius: 50,
    width: 80,
    marginLeft: 5,
  },
  img: {
    // Adjust image size and position:
    width: 35,
    height: 35,
    marginLeft: 7,
    borderRadius: 0,
  },
  text: {
    fontSize: 12,
    marginLeft: 9,
    marginTop: 2,
    fontWeight: "600",
  },
});
