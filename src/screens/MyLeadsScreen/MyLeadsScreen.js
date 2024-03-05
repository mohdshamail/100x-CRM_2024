import {
  View,
  StyleSheet,
  Text,
  FlatList,
  RefreshControl,
  Alert,
} from "react-native";
import { Base64 } from "js-base64";
import React, { useState, useEffect } from "react";
import { primaryColor, storageKeys } from "../../constants/constants";
import {
  Appbar,
  Surface,
  Menu,
  Modal,
  Portal,
  Divider,
} from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import ButtonComponent from "../../components/Button/Button";
import LeadsScreen from "../LeadsScreen/LeadsScreen";
import { Linking } from "react-native";
import TextInputComponent from "../../components/TextInput/TextInput";
import {
  doLogout,
  getValueFromStorage,
  getCourseListData,
} from "../../utility/utility";
import { leadDetailsAPI } from "../../api/LeadDetailsAPI/LeadDetailsAPI";
import DropDownComponent from "../../components/DropDown/DropDown";
import { addNewLeadAPI } from "../../api/AddNewLeadAPI/addNewLeadAPI";
import { countryCodeData } from "./myLeadsFormData";

const MyLeadsScreen = ({ navigation, route }) => {
  const filteredRecords = route.params ? route.params.filteredRecords : [];
  const numberOfRecord = route.params ? route.params.numberOfRecord : "0";
  const [leadRecord, setLeadRecord] = useState();
  const [visible, setVisible] = useState(false);
  const [add_name, setAdd_name] = useState("");
  const [add_email, setAdd_email] = useState("");
  const [course, setCourse] = useState("");
  const [country_code, setcountry_code] = useState("+91");
  const [add_mobile, setAdd_mobile] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [leadCount, setLeadCount] = useState("0");
  const [courseData, setCourseData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [base64_mid, setBase64_mid] = useState(null);
  const [mid, setmid] = useState(null);
  const [email, setEmail] = useState(null);

  const url = `https://chat.henryharvin.com/login?member_id=${base64_mid}`;

  // const handleOpenDrawer = () => navigation.openDrawer();
  const getAPIData = async () => {
    const email = await getValueFromStorage(storageKeys.EMAIL_ID);
    const memberId = await getValueFromStorage(storageKeys.MEMBER_ID);
    setEmail(email);
    setmid(memberId);
    const base64_id = memberId.toString();
    setBase64_mid(Base64.encode(base64_id));
    if (memberId) {
      try {
        const response = await leadDetailsAPI(memberId);
        // console.log("response message of app login =", response?.message);
        if (response?.message == "Login again (wrong token)") {
          doLogout();
        } else {
          setLeadCount(response?.records?.length);
          setLeadRecord(response);
          setCourseData(response?.course_filter_p);
        }
      } catch (error) {
        console.error("Error fetching lead details:", error);
      } finally {
        setIsRefreshing(false);
      }
    }
  };
  useEffect(() => {
    getAPIData();
  }, []);

  const courseList = getCourseListData(courseData);
  const addnewLeadhandler = async () => {
    try {
      // Check if name and email are empty
      if (!add_name || !add_email || !course || !country_code || !add_mobile) {
        Alert.alert(
          "Error",
          "All Fields are required.",
          [
            {
              text: "OK",
              onPress: () => console.log("OK Pressed"),
            },
          ],
          { cancelable: false }
        );
        return; // Exit the function if name or email is empty
      }

      setLoading(true);
      const addnewLeadResponse = await addNewLeadAPI(
        add_name,
        add_email,
        course,
        country_code,
        add_mobile,
        mid
      );

      if (addnewLeadResponse?.status === 200) {
        setLoading(false);
        hideModal();
        setAdd_name("");
        setAdd_email("");
        setCourse("");
        setAdd_mobile("");
        console.log("success!!");
        Alert.alert(
          "Success",
          "Lead added successfully",
          [
            {
              text: "OK",
              onPress: () => console.log("OK Pressed"),
            },
          ],
          { cancelable: false }
        );
      } else if (addnewLeadResponse?.status === 400) {
        setLoading(false);
        setAdd_name("");
        setAdd_email("");
        setCourse("");
        setAdd_mobile("");
        hideModal();
        Alert.alert(
          "HENRY HARVIN EDUCATION",
          "This lead already exists",
          [
            {
              text: "OK",
              // onPress: () => console.log("OK Pressed"),
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      setLoading(false);
      console.error("Error occurred while adding new lead:", error);
      Alert.alert(
        "Error",
        "An error occurred while adding the lead. Please try again later.",
        [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
          },
        ],
        { cancelable: false }
      );
    }
  };

  // menu items appear here
  const menuItems = [
    // {
    //   label: "Go to Events",
    //   onPress: () => navigation.navigate('PaymentLinkScreen'),
    // },
    {
      label: "New Course Enquiry",
      onPress: () => navigation.navigate("NewCourseEnquiry",{
        mid: mid,
        email: email, 
      }),
    },
    // {
    //   label: "Start Auto Dial",
    //   onPress: () => console.log("Start Auto Dial clicked"),
    // },
  ];
  //function for opening/closing the side menu bar from three-dot-icon
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  //leads counts show here in title varaiable
  const title = `My Leads (${
    numberOfRecord == 0 ? leadCount : numberOfRecord
  })`;
  //function for opening/closing the Form By modal
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 18,
  };
  //component for lead details page
  const renderItem = ({ item }) => (
    <LeadsScreen data={item} recordFilterData={leadRecord} />
  );

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: primaryColor }} elevated="true">
        {/* <Appbar.Action
          size={30}
          iconColor="white"
          icon="format-align-left"
          onPress={handleOpenDrawer}
        /> */}
        <Appbar.Content titleStyle={{ color: "white" }} title={title} />
        <Appbar.Action
          icon="whatsapp"
          size={30}
          iconColor="white"
          onPress={() => {
            Linking.openURL(url);
          }}
        />
        <Appbar.Action
          icon="filter-menu"
          size={30}
          iconColor="white"
          onPress={() => navigation.navigate("FilterLead")}
        />
        <Menu
          style={{ marginTop: 50 }}
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <Surface 
              style={{ backgroundColor: primaryColor, }}>
              <Appbar.Action
                icon="dots-vertical"
                size={30}
                iconColor="white"
                onPress={openMenu}
              />
            </Surface>
          }
        >
          <View className="">
            {menuItems.map((item) => (
              <Menu.Item
              
                key={item.label}
                onPress={item.onPress}
                leadingIcon={item.leadingIcon}
                title={item.label}
              />
            ))}
          </View>
        </Menu>
      </Appbar.Header>
      {/*Scrollable Button form starts here */}
      <View className="flex-row mt-4">
        <ScrollView
          style={{ flex: 1 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {/* modal form starts here for add lead */}
          <View>
            <ButtonComponent
              cssClassName={"mx-2"}
              style={{ borderColor: primaryColor }}
              icon={"filter-menu"}
              mode={"outlined"}
              onPress={showModal}
            >
              Add Leads
            </ButtonComponent>
            <View>
              <ScrollView style={{ flex: 1 }}>
                <View>
                  <View>
                    <Portal className="rounded-lg">
                      <Modal
                        className="mx-10"
                        visible={visible}
                        onDismiss={hideModal}
                        contentContainerStyle={containerStyle}
                      >
                        <View>
                          <View>
                            <Text
                              style={{ color: primaryColor, fontSize: 25 }}
                              className="text-xl   text-center"
                            >
                              Add New Lead
                            </Text>
                          </View>
                          <Divider className="" />
                          <View className="mt-1">
                            <TextInputComponent
                              style={{ backgroundColor: "white" }}
                              placeholder={"Enter Your Name"}
                              label={" Full Name"}
                              value={add_name}
                              onInputChange={(text) => setAdd_name(text)}
                            />
                          </View>
                          <View className="mt-4">
                            <TextInputComponent
                              style={{ backgroundColor: "white" }}
                              placeholder={"Enter Email"}
                              label={"Email"}
                              value={add_email}
                              onInputChange={(text) => setAdd_email(text)}
                            />
                          </View>
                          <View className="mt-4">
                            <DropDownComponent
                              search={true}
                              data={courseList}
                              value={course}
                              setValue={setCourse}
                            />
                          </View>
                          <View className="flex-row justify-between">
                            <View className="mt-5 w-28">
                              <DropDownComponent
                                //  style={{height:50,width:100}}
                                placeholder={country_code}
                                data={countryCodeData}
                                value={country_code}
                                setValue={setcountry_code}
                              />
                            </View>
                            <View className="mt-4">
                              <TextInputComponent
                                placeholder={"Mobile No"}
                                label={"Mobile"}
                                keyboardType="numeric"
                                onBlur={addnewLeadhandler}
                                value={add_mobile}
                                style={{
                                  backgroundColor: "white",
                                  width: 150,
                                  height: 48,
                                }}
                                onInputChange={(text) => setAdd_mobile(text)}
                              />
                            </View>
                          </View>
                          <View className="mt-6 mb-3">
                            <ButtonComponent
                              onPress={addnewLeadhandler}
                              mode={"contained"}
                              loading={loading}
                              disabled={loading ? true : false}
                              style={{ marginVertical: 10 }}
                            >
                              Save
                            </ButtonComponent>
                          </View>
                        </View>
                      </Modal>
                    </Portal>
                  </View>
                </View>
              </ScrollView>
              {/* modal for Add Leads Ends here */}
            </View>
          </View>
          {/* <View>
            <ButtonComponent
              cssClassName={"mx-1"}
              style={{ borderColor: primaryColor }}
              icon={"filter-menu"}
              mode={"outlined"}
              onPress={() => {
                Alert.alert(
                  "HENRY HARVIN EDUCATION",
                  "This Feature will be Available Soon!",
                  [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                  { cancelable: true }
                );
              }}
            >
              My Followup Leads
            </ButtonComponent>
          </View> */}
          <View>
            <ButtonComponent
              cssClassName={"mx-1"}
              style={{ borderColor: primaryColor }}
              icon={"filter-menu"}
              mode={"outlined"}
              onPress={() => {
                Linking.openURL(
                  "https://www.henryharvin.com/Employee-Support-Form"
                );
              }}
            >
              Employee Suport Form
            </ButtonComponent>
          </View>
          <View>
            <ButtonComponent
              cssClassName={"mx-1"}
              style={{ borderColor: primaryColor }}
              icon={"filter-menu"}
              mode={"outlined"}
              onPress={() => {
                Linking.openURL(
                  "https://www.henryharvin.com/Employee-Support-Form?demo=1"
                );
              }}
            >
              Demo Requirement
            </ButtonComponent>
          </View>
          {/* <View>
              <ButtonComponent
                cssClassName={"mx-1"}
                style={{ borderColor: primaryColor }}
                icon={"filter-menu"}
                mode={"outlined"}
                onPress={() => {
                  Linking.openURL(
                    "https://docs.google.com/forms/d/e/1FAIpQLSdYVaBhK3tFacrLQEsMK6uZiS6AKqzWqKASZfRHiXckaf0U-g/viewform"
                  );
                }}
              >
                1 To I/CP bathh requirement
              </ButtonComponent>
            </View> */}
          <View>
            <ButtonComponent
              cssClassName={"mx-1"}
              style={{ borderColor: primaryColor }}
              icon={"filter-menu"}
              mode={"outlined"}
              onPress={() => {navigation.navigate("RequestForCoupon" , {
                email:email,
                mid:mid,
              })}}
            >
              Request For Coupon
            </ButtonComponent>
          </View>
        </ScrollView>
      </View>
      {/* flatList appears here */}
      <View style={{ flex: 1, marginTop: 10 }}>
        {/* {leadRecord && (
          <FlatList
            data={leadRecord?.records}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={getAPIData}
                colors={[primaryColor]}
                tintColor={primaryColor}
              />
            }
          />
        )} */}
        {filteredRecords.length > 0 ? (
          <FlatList
            data={filteredRecords}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={getAPIData}
                colors={[primaryColor]}
                tintColor={primaryColor}
              />
            }
          />
        ) : (
          <FlatList
            data={leadRecord?.records}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={getAPIData}
                colors={[primaryColor]}
                tintColor={primaryColor}
              />
            }
          />
        )}
      </View>
      {/* {successMsg && <SnackBar snackLabel="Ok" snackText={successMsg} />} */}
    </View>
  );
};
export default MyLeadsScreen;

