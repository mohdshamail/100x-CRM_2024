import { View, StyleSheet, Alert } from "react-native";
import * as Clipboad from "expo-clipboard";
import React, { useState, useEffect } from "react";
import { TextInput } from "react-native-paper";
import { primaryColor } from "../../constants/constants";
import { storageKeys } from "../../constants/constants";
import {
  hideLastFourDigits,
  getValueFromStorage,
  customerCall,
} from "../../utility/utility";
import SnackBar from "../../components/SnackBar/SnackBar";
import { getDropdownValues, formatDate } from "../../utility/utility";
import { languageData } from "../LeadDetailScreen/filterFormData";
import axios from "axios";
import { Base64 } from "js-base64";
import {
  Card,
  Text,
  IconButton,
  Button,
  Tooltip,
  Modal,
  Portal,
  Divider,
} from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import TextInputComponent from "../../components/TextInput/TextInput";
import DateAndTimePicker from "../../components/DateAndTimePicker/DateAndTimePicker";
import DropDownComponent from "../../components/DropDown/DropDown";
import ButtonComponent from "../../components/Button/Button";
import AppHeader from "../../components/AppHeader/AppHeader";
import { useNavigation, useRoute } from "@react-navigation/native";
import { leadDetailFormAPI } from "../../api/LeadDetailFormAPI/leadDetailFormAPI";
import { submitleadDetailFormAPI } from "../../api/LeadDetailFormAPI/submitLeadDetailFormAPI";
import { checkShopseAPI } from "../../api/LeadDetailFormAPI/checkShopseAPI";
import { Linking } from "react-native";

const ActionLeadDetailForm = () => {
  const [dataFromAPI, setDataFromAPI] = useState(null);
  // console.log(dataFromAPI)
  const route = useRoute();
  const { leadID, filterRecordData } = route.params;
  const leadQty_filt = getDropdownValues(filterRecordData?.lead_quality_filt);
  const pain_area_filt = getDropdownValues(filterRecordData?.pain_area_filt);
  const course_filt = filterRecordData?.course_list_r.map(
    ({ course_name, crm_course_id }) => ({
      label: course_name,
      value: crm_course_id,
    })
  );
  // console.log(leadQty_filt)
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("");
  const [course, setCourse] = useState("");
  const [followUpDate, setfollowUpDate] = useState("");
  const [lead_quality, setLead_quality] = useState("");
  const [painArea, setPainArea] = useState("");
  const [add_description, setDescription] = useState("");
  const [lead_revival_commnt, setRevivalComment] = useState("");
  const [oldComment, setOldComment] = useState("");
  const [email_Id, setEmail_Id] = useState("");
  const [altEmail_Id, setAltEmail_Id] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [altCountryCode, setAltCountryCode] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [altMobileNo, setAltMobileNo] = useState("");
  // const [shopseEligibility, setShopseeEligibility] = useState('');
  const [altShopseEligibility, setAltShopseeEligibility] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAltModalVisible, setIsAltModalVisible] = useState(false);
  const [memberId, setmemberId] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const nameChangeHandler = (text) => {
    setName(text);
  };
  const descriptionChangeHandler = (text) => {
    setDescription(text);
  };
  const revivalCommentHandler = (text) => {
    setRevivalComment(text);
  };
  const oldCommentHandler = (text) => {
    setOldComment(text);
  };
  const emailChangeHandler = (text) => {
    setEmail_Id(text);
  };
  const altEmailChangeHandler = (text) => {
    setAltEmail_Id(text);
  };
  const mobileNumberChangeHandler = (text) => {
    setMobileNo(text);
  };
  const altMobileNumberChangeHandler = (text) => {
    setAltMobileNo(text);
  };
  const countryCodeChangeHandler = (text) => {
    setCountryCode(text);
    // Call the API when the text input changes
  };
  const shopseeAmountHandler = (text) => {
    setAmount(text);
  };
  const altshopseeAmountHandler = (text) => {
    setAltShopseeEligibility(text);
  };

  async function emailUpdater() {
    try {
      const response = await axios.get(
        `https://crm.henryharvin.com/portal-new/app_add_demail?l_id=${leadID}&des=${email_Id}`,
        {
          headers: {
            "Content-Type": "text/html",
          },
        }
      );
      // console.log(response?.data);
      if (response?.data?.success) {
        Alert.alert(
          "Success",
          response?.data?.message
            ? response?.data?.message
            : "Email update successfully"
        );
      } else {
        Alert.alert("Error in updating Email");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function mobileNoUpdater() {
    try {
      const response = await axios.get(
        `https://crm.henryharvin.com/portal-new/app_add_dmobile?l_id=${leadID}&des=${mobileNo}`,
        {
          headers: {
            "Content-Type": "text/html",
          },
        }
      );
      //console.log(response);
      if (response?.data?.success) {
        Alert.alert(
          "Success",
          response?.message
            ? response?.message
            : "mobile number update successfully"
        );
      } else if (response?.data?.message) {
        Alert.alert(response?.data?.message);
      } else {
        Alert.alert("Error in updating mobile no");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function alternatemobileNoUpdater() {
    try {
      const response = await axios.get(
        `https://crm.henryharvin.com/portal-new/app_add_dmobile?l_id=${leadID}&des=${altMobileNo}`,
        {
          headers: {
            "Content-Type": "text/html",
          },
        }
      );

      if (response?.data?.success) {
        Alert.alert(
          "Success",
          response?.message
            ? response?.message
            : "mobile number update successfully"
        );
      } else if (response?.data?.message) {
        Alert.alert(response?.data?.message);
      } else {
        Alert.alert("Error in updating mobile no");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function countryCodeData() {
    try {
      const response = await axios.get(
        `https://crm.henryharvin.com/portal-new/app-lswsheets/${leadID}?col=countryCode&value=${countryCode}`,
        {
          headers: {
            "Content-Type": "text/html",
          },
        }
      );
      if (response?.data?.message) {
        Alert.alert("Success", response?.data?.message);
      } else {
        Alert.alert("Error in updating country Code!");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function alternateEmailUpdate() {
    try {
      const response = await axios.get(
        `https://crm.henryharvin.com/portal-new/app_add_demail?l_id=${leadID}&des=${altEmail_Id}`,
        {
          headers: {
            "Content-Type": "text/html",
          },
        }
      );
      if (response?.data?.success) {
        Alert.alert(
          "Success",
          response?.data?.message
            ? response?.data?.message
            : "Alternate Email Successfully Added"
        );
      } else {
        Alert.alert("Error in updating alternate Email!");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  //call by ozonetel
  const ozoentelCallHandler = () => {
    const uid = dataFromAPI?.email;
    const cn = dataFromAPI?.member?.ozonetel_campaign_name;
    const mob = dataFromAPI?.mobile;
    customerCall(uid, cn, mob);
  };
  const ozoentelAltNoCallHandler = () => {
    const uid = dataFromAPI?.email;
    const cn = dataFromAPI?.member?.ozonetel_campaign_name;
    const mob = dataFromAPI?.alt_mobile;
    customerCall(uid, cn, mob);
    // console.log("uid,cn,mob = ",uid,cn,mob);
    // console.log("customerCall =  " ,customerCall);
  };

  const getLeadPageData = async () => {
    const id = leadID;
    try {
      const leadDetailsPageData = await leadDetailFormAPI(id);
      const memberID = await getValueFromStorage(storageKeys.MEMBER_ID);
      setName(leadDetailsPageData?.name);
      setDescription(leadDetailsPageData?.description);
      setRevivalComment(leadDetailsPageData?.revival_comment);
      setDataFromAPI(leadDetailsPageData);
      //console.log("countryCode", leadDetailsPageData?.countryCode);
      const m_id = memberID.toString();
      setmemberId(Base64.encode(m_id));
    } catch (error) {
      console.log("response error", error);
    }
  };

  useEffect(() => {
    getLeadPageData();
  }, []);

  //check shopse eligibility-1
  const checkEligibilityHandler = async () => {
    setLoading(true);
    if (amount == "" || amount == 0) {
      Alert.alert("Error", "Amount is Required !");
      return;
    }
    const email = dataFromAPI?.email;
    const mobile = dataFromAPI?.mobile;

    try {
      const data = await checkShopseAPI(name, email, mobile, amount);
      // console.log("Check shopsy response = ", data);
      if (data.status == "400") {
        Alert.alert(
          "SORRY, UNEXPECTED ERROR",
          `We are working on fixing the problem. Please try again later.`
        );
        setAmount("");
        setIsModalVisible(!isModalVisible);
        setLoading(false);
        return;
      }
      setAmount("");
      setIsModalVisible(!isModalVisible);

      let instantEmiEligibility = "";
      let ccEmiAvailability = "";

      if (data.status.instantEmiEligibility === "Y") {
        instantEmiEligibility = "YES";
      } else if (data.status.instantEmiEligibility === "N") {
        instantEmiEligibility = "NO";
      }

      if (data.status.ccEmiAvailability === "Y") {
        ccEmiAvailability = "YES";
      } else if (data.status.ccEmiAvailability === "N") {
        ccEmiAvailability = "NO";
      }

      if (instantEmiEligibility === "" && ccEmiAvailability === "") {
        setLoading(false);
        Alert.alert(
          "SORRY, UNEXPECTED ERROR",
          "We are working on fixing the problem. Please try again later."
        );
      } else {
        Alert.alert(
          "CONGRATULATIONS",
          `${instantEmiEligibility} INSTANT EMI ELIGIBILITY\n${ccEmiAvailability} CREDIT CARD EMI AVAILABILITY`
        );
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      Alert.alert(
        "SORRY, UNEXPECTED ERROR",
        "We are working on fixing the problem. Please try again later."
      );
    }
  };

  //check shopse eligibility-2
  const checkAlternateEligibilityHandler = async () => {
    setLoading(true);
    if (altShopseEligibility == "" || altShopseEligibility == 0) {
      Alert.alert("Error", "Amount is Required !");
      return;
    }
    const email = dataFromAPI?.email;
    const alt_mobile = dataFromAPI?.alt_mobile;

    try {
      const data = await checkShopseAPI(
        name,
        email,
        alt_mobile,
        altShopseEligibility
      );
      // console.log("Check shopsy response = ", data);
      if (data.status == "400") {
        Alert.alert(
          "SORRY, UNEXPECTED ERROR",
          `We are working on fixing the problem. Please try again later.`
        );
        setAltShopseeEligibility("");
        setIsAltModalVisible(!isAltModalVisible);
        setLoading(false);
        return;
      }
      setAltShopseeEligibility("");
      setIsAltModalVisible(!isAltModalVisible);

      let instantEmiEligibility = "";
      let ccEmiAvailability = "";

      if (data.status.instantEmiEligibility === "Y") {
        instantEmiEligibility = "YES";
      } else if (data.status.instantEmiEligibility === "N") {
        instantEmiEligibility = "NO";
      }

      if (data.status.ccEmiAvailability === "Y") {
        ccEmiAvailability = "YES";
      } else if (data.status.ccEmiAvailability === "N") {
        ccEmiAvailability = "NO";
      }

      if (instantEmiEligibility === "" && ccEmiAvailability === "") {
        setLoading(false);
        Alert.alert(
          "SORRY, UNEXPECTED ERROR",
          "We are working on fixing the problem. Please try again later."
        );
        setAltShopseeEligibility("");
        setIsAltModalVisible(!isAltModalVisible);
      } else {
        setLoading(false);
        Alert.alert(
          "CONGRATULATIONS",
          `${instantEmiEligibility} INSTANT EMI ELIGIBILITY\n${ccEmiAvailability} CREDIT CARD EMI AVAILABILITY`
        );

        setAltShopseeEligibility("");
        setIsAltModalVisible(!isAltModalVisible);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      Alert.alert(
        "SORRY, UNEXPECTED ERROR",
        "We are working on fixing the problem. Please try again later."
      );
      setAltShopseeEligibility("");
      setIsAltModalVisible(!isAltModalVisible);
    }
  };

  const mobile_number = hideLastFourDigits(
    dataFromAPI?.mobile,
    dataFromAPI?.countryCode
  );
  const alt_mobile_number = hideLastFourDigits(
    dataFromAPI?.alt_mobile,
    dataFromAPI?.countryCode
  );

  // Remove HTML tags from the response data
  const desc = dataFromAPI?.desc?.replace(/<[^>]+>/g, " ");
  const datePickedhandler = (date) => setfollowUpDate(date);
  // this is screen's title which is dynamic getting from API
  const title = `Lead Detail (${leadID}) `;

  const validateForm = () => {
    if (
      !name ||
      !language ||
      !followUpDate ||
      !course ||
      !lead_quality ||
      !painArea ||
      !add_description ||
      !lead_revival_commnt ||
      !email_Id ||
      !countryCode ||
      !mobileNo
    ) {
      Alert.alert("Error", "Please fill in all required fields.");
      return false;
    }
    return true;
  };
  //submit Form Handler
  const submitForm = async () => {
    // Validate the form
    if (!validateForm()) {
      return;
    }
    try {
      const followUpDateNew = formatDate(followUpDate);

      const responseSubmitData = await submitleadDetailFormAPI(
        leadID,
        name,
        language,
        followUpDateNew,
        course,
        lead_quality,
        painArea,
        add_description,
        lead_revival_commnt
      );
      const status = responseSubmitData?.success;
      // console.log("status = " ,status);
      if (status) {
        console.log("Lead updated successfully");
        setSuccessMsg("Successfully! Lead updated");
        setTimeout(() => {
          setSuccessMsg(false);
        }, 3000);

        // Alert.alert(
        //   "Success",
        //   "Lead updated successfully",
        //   [
        //     {
        //       text: "OK",
        //       onPress: () => console.log("OK Pressed"),
        //     },
        //   ],
        //   { cancelable: false }
        // );
      } else {
        console.log("Error in submitting! ");
      }
      // console.log(responseSubmitData);
    } catch (error) {
      console.error("Error occurred while submitting form:", error);
      // Handle error as needed, e.g., show an error message to the user
    }
  };

  const copyText = (text) => {
    Clipboad.setStringAsync(text);
    setSuccessMsg("Item Copied successfully!");
    setTimeout(() => {
      setSuccessMsg(null);
    }, 3000);
  };

  const whatsapp_url = `https://chat.henryharvin.com/message?lead_id=${leadID}&member_id=${memberId}`;
  // console.log("whatsapp_url" ,whatsapp_url);

  return (
    <View className={`flex flex-1 bg-white ${Platform.OS === "ios" && "pb-4"}`}>
      <View>
        <AppHeader
          barTittle={title}
          icon={"arrow-left"}
          onPress={() => navigation.goBack()}
        />
      </View>
      {dataFromAPI && (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          alwaysBounceVertical={true}
        >
          <View className=" flex p-4">
            <View className="flex p-1">
              <Card className="bg-white">
                <View className="flex-1 mx-5 mt-3">
                  <Text style={{ color: primaryColor }} variant="titleMedium">
                    EMAIL -
                  </Text>
                  {/* <Divider/> */}
                </View>
                <View className="flex-1 mt-2 flex-row mx-4">
                  <View>
                    <IconButton
                      onPress={() => {
                        setSuccessMsg("sorry no data found!");
                      }}
                      mode="contained"
                      icon="email"
                      iconColor={primaryColor}
                      size={20}
                    />
                  </View>
                  <View className="mt-3 mx-2">
                    <Text variant="titleMedium">
                      {dataFromAPI?.email ? dataFromAPI?.email : "null"}
                    </Text>
                  </View>
                  <View className="mx-4">
                    <IconButton
                      icon="content-copy"
                      iconColor={primaryColor}
                      size={20}
                      onPress={() => copyText(dataFromAPI?.email || "")}
                    />
                  </View>
                </View>
                <View className="mx-6 mb-6">
                  <TextInputComponent
                    style={{ backgroundColor: "white", height: 50 }}
                    label="Add Email"
                    rightIcon={"email"}
                    mode="contained"
                    value={email_Id}
                    onBlur={emailUpdater}
                    onInputChange={emailChangeHandler}
                  />
                </View>
              </Card>
              <View className="mt-3">
                <Card className="bg-white">
                  <View className="flex-1 mx-5 mt-3">
                    <Text style={{ color: primaryColor }} variant="titleMedium">
                      MOBILE -
                    </Text>
                  </View>
                  <View className="flex-1 flex-row mx-4">
                    <View>
                      <Tooltip enterTouchDelay={200} title="Call via Ozonetel">
                        <IconButton
                          onPress={ozoentelCallHandler}
                          mode="contained"
                          icon="phone"
                          iconColor={primaryColor}
                          size={25}
                        />
                      </Tooltip>
                    </View>
                    <View className="mt-3 mx-2">
                      <Text variant="titleMedium">{mobile_number}</Text>
                    </View>
                    <View>
                      <IconButton
                        icon="content-copy"
                        iconColor={primaryColor}
                        size={20}
                        onPress={() => copyText(mobile_number || "")}
                      />
                    </View>
                    <View>
                      <IconButton
                        className="pb-3 mx-10"
                        icon="whatsapp"
                        iconColor={primaryColor}
                        size={35}
                        onPress={() => {
                          Linking.openURL(
                            whatsapp_url
                            //https://chat.henryharvin.com/message?lead_id=8488464&member_id=1539
                          );
                        }}
                      />
                    </View>
                  </View>
                  <View className="mx-4">
                    <View className="flex-row justify-evenly">
                      <View>
                        <TextInputComponent
                          style={{ backgroundColor: "white", height: 50 }}
                          label="Country code"
                          mode="contained"
                          onBlur={countryCodeData}
                          value={countryCode}
                          onInputChange={countryCodeChangeHandler}
                        />
                      </View>
                      <View className="ml-3">
                        <TextInputComponent
                          style={{
                            width: 200,
                            backgroundColor: "white",
                            height: 50,
                          }}
                          label="Add Mobile"
                          rightIcon={"cellphone"}
                          mode="contained"
                          value={mobileNo}
                          // onBlur={mobileNumberUpdate}
                          onBlur={mobileNoUpdater}
                          keyboardType="numeric"
                          onInputChange={mobileNumberChangeHandler}
                        />
                      </View>
                    </View>
                    <View className="mt-3 mb-4">
                      <Button
                        onPress={() => setIsModalVisible(!isModalVisible)}
                        mode="contained"
                      >
                        Check Shopse Eligibility
                      </Button>
                      {/* modal appear here */}
                      <View>
                        <ScrollView>
                          <Portal className="rounded-lg">
                            <Modal
                              className="mx-8"
                              visible={isModalVisible}
                              onDismiss={setIsModalVisible}
                              contentContainerStyle={styles.containerStyle}
                            >
                              <View>
                                <View>
                                  <Text
                                    style={{
                                      color: primaryColor,
                                      fontSize: 15,
                                    }}
                                    className="text-xl   text-center"
                                  >
                                    Check Shopse Eligibility
                                  </Text>
                                </View>
                                <Divider className="" />
                              </View>
                              <View className="mt-1">
                                <TextInputComponent
                                  style={{ height: 50 }}
                                  keyboardType="numeric"
                                  label={"Enter Amount"}
                                  value={amount}
                                  onInputChange={shopseeAmountHandler}
                                />
                              </View>
                              <View className="flex-row justify-end mt-4">
                                <View className="mx-4">
                                  <Button
                                    style={{ borderColor: primaryColor }}
                                    onPress={() =>
                                      setIsModalVisible(!isModalVisible)
                                    }
                                    mode="outlined"
                                  >
                                    close
                                  </Button>
                                </View>
                                <View>
                                  <Button
                                    className=""
                                    onPress={checkEligibilityHandler}
                                    loading={loading}
                                    mode="contained"
                                  >
                                    Submit
                                  </Button>
                                </View>
                              </View>
                            </Modal>
                          </Portal>
                        </ScrollView>
                      </View>
                      {/* model ends here */}
                    </View>
                  </View>
                </Card>
              </View>
              {/* 3rd card start here */}
              <View className="mt-3">
                <Card className="bg-white">
                  <View className="flex-1 mx-5 mt-3">
                    <Text style={{ color: primaryColor }} variant="titleMedium">
                      ALTERNATE EMAIL -
                    </Text>
                    {/* <Divider/> */}
                  </View>
                  <View className="flex-1 mt-2 flex-row mx-4">
                    <View>
                      <IconButton
                        mode="contained"
                        icon="email"
                        iconColor={primaryColor}
                        size={20}
                      />
                    </View>
                    <View className="mt-3 mx-2">
                      <Text variant="titleMedium">
                        {dataFromAPI?.alt_email
                          ? dataFromAPI?.alt_email
                          : "null"}
                      </Text>
                    </View>
                    <View className="mx-4">
                      <IconButton
                        icon="content-copy"
                        iconColor={primaryColor}
                        size={20}
                        onPress={() => copyText(dataFromAPI?.alt_email || "")}
                      />
                    </View>
                  </View>
                  <View className="mx-6 mb-6">
                    <TextInputComponent
                      style={{ backgroundColor: "white", height: 50 }}
                      label="Add Email"
                      rightIcon={"email"}
                      mode="contained"
                      value={altEmail_Id}
                      onBlur={alternateEmailUpdate}
                      onInputChange={altEmailChangeHandler}
                    />
                    {/* <View className="mt-3 mb-4">
                  <Button mode="contained">Add Email</Button>
                </View> */}
                  </View>
                </Card>
              </View>
              {/* 4th card starts here */}
              <View className="mt-3">
                <Card className="bg-white">
                  <View className="flex-1 mx-5 mt-3">
                    <Text style={{ color: primaryColor }} variant="titleMedium">
                      ALTERNATE MOBILE -
                    </Text>
                  </View>
                  <View className="flex-1 flex-row mx-4">
                    <View>
                      <Tooltip enterTouchDelay={200} title="Call via Ozonetel">
                        <IconButton
                          onPress={ozoentelAltNoCallHandler}
                          mode="contained"
                          icon="phone"
                          iconColor={primaryColor}
                          size={25}
                        />
                      </Tooltip>
                    </View>
                    <View className="mt-3 mx-2">
                      <Text variant="titleMedium">
                        {alt_mobile_number ? alt_mobile_number : "null"}
                      </Text>
                    </View>
                    <View>
                      <IconButton
                        icon="content-copy"
                        iconColor={primaryColor}
                        size={20}
                        onPress={() => copyText(alt_mobile_number || "")}
                      />
                    </View>
                    <View>
                      <IconButton
                        className="pb-3 mx-10"
                        icon="whatsapp"
                        iconColor={primaryColor}
                        size={35}
                        onPress={() => {
                          Linking.openURL(
                            `https://chat.henryharvin.com/message?lead_id=${leadID}&member_id=${memberId}`
                          );
                        }}
                      />
                    </View>
                  </View>
                  <View className="mx-4">
                    <View className="flex-1">
                      {/* <View>
                        <TextInputComponent
                          style={{ backgroundColor: "white", height: 50 }}
                          label="Country code"
                          mode="contained"
                          onBlur={countryCodeData}
                          value={countryCode}
                          onInputChange={altCountryCodeChangeHandler}
                        />
                      </View> */}
                      <View className="ml-3">
                        <TextInputComponent
                          style={{
                            width: "auto",
                            backgroundColor: "white",
                            height: 50,
                          }}
                          label="Add Alt Mobile"
                          rightIcon={"cellphone"}
                          mode="contained"
                          value={altMobileNo}
                          onBlur={alternatemobileNoUpdater}
                          keyboardType="numeric"
                          onInputChange={altMobileNumberChangeHandler}
                        />
                      </View>
                    </View>
                    <View className="mt-3 mb-4">
                      <Button
                        mode="contained"
                        onPress={() => setIsAltModalVisible(!isAltModalVisible)}
                      >
                        Check Shopse Eligibility
                      </Button>
                      {/* modal appear here */}
                      <View>
                        <ScrollView>
                          <Portal className="rounded-lg">
                            <Modal
                              className="mx-8"
                              visible={isAltModalVisible}
                              onDismiss={setIsAltModalVisible}
                              contentContainerStyle={styles.containerStyle}
                            >
                              <View>
                                <View>
                                  <Text
                                    style={{
                                      color: primaryColor,
                                      fontSize: 15,
                                    }}
                                    className="text-xl   text-center"
                                  >
                                    Check Shopse Eligibility
                                  </Text>
                                </View>
                                <Divider className="" />
                              </View>
                              <View className="mt-1">
                                <TextInputComponent
                                  style={{ height: 50 }}
                                  keyboardType="numeric"
                                  label={"Enter Amount"}
                                  value={altShopseEligibility}
                                  onInputChange={altshopseeAmountHandler}
                                />
                              </View>
                              <View className="flex-row justify-end mt-4">
                                <View className="mx-4">
                                  <Button
                                    style={{ borderColor: primaryColor }}
                                    onPress={() =>
                                      setIsAltModalVisible(!isAltModalVisible)
                                    }
                                    mode="outlined"
                                  >
                                    close
                                  </Button>
                                </View>
                                <View>
                                  <Button
                                    className=""
                                    onPress={checkAlternateEligibilityHandler}
                                    loading={loading}
                                    mode="contained"
                                  >
                                    Submit
                                  </Button>
                                </View>
                              </View>
                            </Modal>
                          </Portal>
                        </ScrollView>
                      </View>
                      {/* model ends here */}
                    </View>
                  </View>
                </Card>
              </View>
              {/* form starts here */}
              <View>
                <View className="mt-3 mx-2">
                  <Text className="mx-1" variant="titleMedium">
                    Name
                  </Text>
                  <TextInputComponent
                    style={{ backgroundColor: "white" }}
                    // placeholder={"Name" || ""}
                    value={name}
                    placeholder={"Enter Name"}
                    onInputChange={nameChangeHandler}
                  />
                </View>
                <View className="mt-3 mx-2">
                  <Text className="mx-1" variant="titleMedium">
                    Language
                  </Text>
                  <DropDownComponent
                    search={true}
                    placeholder={dataFromAPI?.language}
                    data={languageData}
                    value={language}
                    setValue={setLanguage}
                  />
                </View>
                <View className="mt-3 mx-2">
                  <Text className="mx-1" variant="titleMedium">
                    Follow Up Date
                  </Text>
                  <DateAndTimePicker
                    placeholder={dataFromAPI?.followuptime || "dd-mm-yyyy"}
                    initialDate={followUpDate}
                    onDateChange={datePickedhandler}
                  />
                </View>
                <View className="mt-3 mx-2">
                  <Text className="mx-1" variant="titleMedium">
                    Course
                  </Text>
                  <DropDownComponent
                    search={true}
                    placeholder={dataFromAPI?.course}
                    data={course_filt}
                    value={course}
                    setValue={setCourse}
                  />
                </View>
                <View className="mt-3 mx-2">
                  <Text className="mx-1" variant="titleMedium">
                    Lead Quality
                  </Text>
                  <DropDownComponent
                    search={true}
                    placeholder={dataFromAPI?.lead_quality}
                    value={lead_quality}
                    setValue={setLead_quality}
                    data={leadQty_filt}
                  />
                </View>
                <View className="mt-3 mx-2">
                  <Text className="mx-1" variant="titleMedium">
                    Pain Area
                  </Text>
                  <DropDownComponent
                    search={true}
                    placeholder={dataFromAPI?.painarea}
                    value={painArea}
                    setValue={setPainArea}
                    data={pain_area_filt}
                  />
                </View>
                <View className="mt-3 mx-2">
                  <Text className="mx-1" variant="titleMedium">
                    Description
                  </Text>
                  <TextInput
                    multiline={true}
                    mode="outlined"
                    onInputChange={descriptionChangeHandler}
                    style={{
                      padding: 5,
                      backgroundColor: "white",
                      lineHeight: 23,
                    }}
                    value={add_description}
                    placeholder={"Add Description"}
                  />
                </View>
                <View className="mt-3 mx-2">
                  <Text className="mx-1" variant="titleMedium">
                    Revival Comment
                  </Text>
                  <TextInput
                    multiline={true}
                    mode="outlined"
                    value={lead_revival_commnt}
                    onInputChange={revivalCommentHandler}
                    placeholder={"Add Revival comment"}
                    style={{
                      padding: 5,
                      backgroundColor: "white",
                      lineHeight: 23,
                    }}
                  />
                </View>
                <View className="mt-3 mx-2">
                  <Text className="mx-1" variant="titleMedium">
                    Old Comments
                  </Text>
                  <TextInput
                    multiline={true}
                    editable={false}
                    mode="outlined"
                    style={{
                      backgroundColor: "white",
                      padding: 5,
                      lineHeight: 23,
                    }}
                    value={oldComment}
                    onInputChange={oldCommentHandler}
                    placeholder={desc}
                  />
                </View>
                <View className="mt-4">
                  <ButtonComponent mode={"contained"} onPress={submitForm}>
                    Submit
                  </ButtonComponent>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
      {successMsg && <SnackBar snackLabel="Ok" snackText={successMsg} />}
    </View>
  );
};

export default ActionLeadDetailForm;
const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 0,
    overflow: "hidden",
  },
  containerStyle: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 18,
  },
});
