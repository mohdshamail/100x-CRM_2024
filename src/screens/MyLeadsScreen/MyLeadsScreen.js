import {
  View,
  StyleSheet,
  Text,
  FlatList,
  RefreshControl,
  Alert,
} from "react-native";
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
import DropDown from "react-native-paper-dropdown";
import { Linking } from "react-native";
import TextInputComponent from "../../components/TextInput/TextInput";
import MultiSelectComponent from "../../components/DropDown/MultiSelectComponent";
import {
  doLogout,
  getValueFromStorage,
  getCourseListData,
} from "../../utility/utility";
import { leadDetailsAPI } from "../../api/LeadDetailsAPI/LeadDetailsAPI";
import DropDownComponent from "../../components/DropDown/DropDown";
// import { getprofileDataAPI } from '../../api/ProfileDataAPI/getProfileAPI';
import { addNewLeadAPI } from "../../api/AddNewLeadAPI/addNewLeadAPI";


const MyLeadsScreen = ({ navigation, route }) => {
  const filteredRecords = route.params ? route.params.filteredRecords : [];
  //console.log(filteredRecords);
 const numberOfRecord = route.params ? route.params.numberOfRecord : "0" ;
  const [leadRecord, setLeadRecord] = useState();
  const [visible, setVisible] = useState(false);
  // const [showDropDown, setShowDropDown] = useState(false);
  const [add_name, setAdd_name] = useState("");
  const [add_email, setAdd_email] = useState("");
  const [course, setCourse] = useState("");
  const [country_code, setcountry_code] = useState("+91");
  const [add_mobile, setAdd_mobile] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [visibleCoupon, setVisibleCoupon] = useState(false);
  const [showDiscountCoupon, setshowDiscountCoupon] = useState(false);
  const [inputData, setInputData] = useState();
  const [discountCouponType, setDiscountCouponType] = useState("");
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [leadCount, setLeadCount] = useState("0");
  const [courseData, setCourseData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [leadID, setLeadID] = useState(null);
  const [mid, setmid] = useState(null);
 
 
//function for handle drawer opening/closing
  const handleOpenDrawer = () => navigation.openDrawer();
  const getAPIData = async () => {
    //const token = await getValueFromStorage(storageKeys.APP_SECURE);
    //const email = await getValueFromStorage(storageKeys.EMAIL_ID);
    const memberId = await getValueFromStorage(storageKeys.MEMBER_ID);
    setmid(memberId);
    //console.log("token = " ,token)
    console.log("memberID = ", memberId);
    if (memberId) {
      try {
        const response = await leadDetailsAPI(memberId);
        console.log("response message of app login =", response?.message);
        if (response?.message == "Login again (wrong token)") {
          doLogout();
        } else {
          setLeadCount(response?.records?.length);
          setLeadID(response?.records?.id);
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

  const countryCodeData = [
    { label: "+91", value: "+91" },
    { label: "+1", value: "+1" },
    { label: "+97", value: "+97" },
  ];

  const courseList = getCourseListData(courseData);
  const addnewLeadhandler = async () => {
    try {
      // Check if name and email are empty
      if (!add_name || !add_email || !course || !country_code || !add_mobile ) {
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
        add_mobile
      );
  
      if (addnewLeadResponse?.status === 200) {
        setLoading(false);
        hideModal();
        setAdd_name('');
        setAdd_email('');
        setCourse('');
        setAdd_mobile('');
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
        setAdd_name('');
        setAdd_email('');
        setCourse('');
        setAdd_mobile('');
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
    {
      label: "Go to Events",
      onPress: () => console.log("Go to Events clicked"),
    },
    {
      label: "New Course Enquiry",
      onPress: () => console.log("New Course Enquiry clicked"),
    },
    {
      label: "Start Auto Dial",
      onPress: () => console.log("Start Auto Dial clicked"),
    },
  ];
  //function for opening/closing the side menu bar from three-dot-icon
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  
 
  const handleopenMenu = () => console.log("open menu by three dots");
  //dropdown coupon data
  const discountCoupon = [
    { label: "Flat", value: "flat" },
    { label: "Percentage", value: "percentage" },
  ];

  //function for visible/hide the discountCoupon
  // const showRequestCoupon = () => setVisibleCoupon(true);
  // const hideRequestCoupon = () => setVisibleCoupon(false);
  const courses = [
    { key: "1", value: "Mobiles", disabled: true },
    { key: "2", value: "Appliances" },
    { key: "3", value: "Cameras" },
    { key: "4", value: "Computers", disabled: true },
    { key: "5", value: "Vegetables" },
    { key: "6", value: "Diary Products" },
    { key: "7", value: "Drinks" },
  ];

  const Products = [
    { key: "1", value: "Mobiles", disabled: true },
    { key: "2", value: "Appliances" },
    { key: "3", value: "Cameras" },
    { key: "4", value: "Computers", disabled: true },
    { key: "5", value: "Vegetables" },
    { key: "6", value: "Diary Products" },
    { key: "7", value: "Drinks" },
  ];

  const handleMsg = () => {
    Alert.alert(
      "HENRY HARVIN EDUCATION",
      "This Feature will be Available Soon!",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: true }
    );
  };

  //leads counts show here in title varaiable
  const title = `My Leads (${numberOfRecord == 0 ? leadCount : numberOfRecord})`;
  //total price after discount coupon applied
  const totalPrice = "0";
  //function for opening/closing the Form By modal
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 18,
  };
  //dummy Data for DropDowns.
  const data = [
    { key: 1, value: "option 1" },
    { key: 2, value: "option 2" },
  ];
  const genderList = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
  ];
  //component for lead details page
  const renderItem = ({ item }) => (
    <LeadsScreen data={item} recordFilterData={leadRecord} />
  );

  return (
    //App Header starts here
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: primaryColor }} elevated="true">
        <Appbar.Action
          size={30}
          iconColor="white"
          icon="format-align-left"
          onPress={handleOpenDrawer}
        />
        <Appbar.Content titleStyle={{ color: "white" }} title={title} />
        <Appbar.Action
          icon="whatsapp"
          size={30}
          mode="outlined"
          iconColor="white"
          onPress={() => {
            Linking.openURL(
              `https://chat.henryharvin.com/message?lead_id=${leadID}&member_id=${mid}`
            );
          }}
        />
        <Appbar.Action
          icon="filter-menu"
          size={30}
          mode="outlined"
          iconColor="white"
          onPress={() => navigation.navigate("FilterLead")}
        />
        {/* <Menu
            style={{ marginTop: 50 }}
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <Surface style={{ backgroundColor: primaryColor }}>
                <Appbar.Action
                  icon="dots-vertical"
                  mode="outlined"
                  size={30}
                  iconColor="white"
                  onPress={openMenu}
                />
              </Surface>
            }
          >
            <View className="rounded-xl">
              {menuItems.map((item) => (
                <Menu.Item
                  key={item.label}
                  onPress={item.onPress}
                  leadingIcon={item.leadingIcon}
                  title={item.label}
                />
              ))}
            </View>
          </Menu> */}
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
          <View>
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
          </View>
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
              // onPress={showRequestCoupon}
              onPress={() => {
                Alert.alert(
                  "HENRY HARVIN EDUCATION",
                  "This Feature will be Available Soon!",
                  [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                  { cancelable: true }
                );
              }}
            >
              Request For Coupon
            </ButtonComponent>
          </View>
          {/* Request for coupon form-modal */}
          <View>
            <ScrollView>
              <Portal className="rounded-lg">
                <Modal
                  className="mx-8"
                  visible={visibleCoupon}
                  onDismiss={() => console.log("first")}
                  contentContainerStyle={containerStyle}
                >
                  <View className="">
                    <View>
                      <Text
                        style={{ color: primaryColor, fontSize: 25 }}
                        className="text-xl text-center"
                      >
                        Request Coupon
                      </Text>
                    </View>
                    <Divider />
                    <View>
                      <View className="mt-1">
                        <DropDown
                          showArrowIcon={true}
                          label={"Type"}
                          mode={"outlined"}
                          visible={showDiscountCoupon}
                          showDropDown={() => setshowDiscountCoupon(true)}
                          onDismiss={() => setshowDiscountCoupon(false)}
                          value={discountCouponType}
                          setValue={setDiscountCouponType}
                          list={discountCoupon}
                        />
                      </View>
                    </View>
                    {/* conditionally rendering field based on their Type */}
                    {"percentage" == discountCouponType ? (
                      <View className="mt-4">
                        <TextInputComponent
                          placeholder={"Enter Discount in Percentage"}
                          label={"Discount (%)"}
                          value={""}
                          keyboardType="numeric"
                          type="number"
                          onInputChange={(text) => console.log(text)}
                        />
                      </View>
                    ) : (
                      <View>
                        <View className="mt-4">
                          <TextInputComponent
                            placeholder={"Enter Discount Amount in Rs"}
                            label={"Flat Discount (INR)"}
                            value={inputData}
                            keyboardType="numeric"
                            onInputChange={(text) => setInputData(text)}
                          />
                          <View className="mt-4">
                            <TextInputComponent
                              placeholder={"Enter Discount Amount in USD"}
                              label={"Flat Discount (USD)"}
                              value={""}
                              keyboardType="numeric"
                              type="number"
                              onInputChange={(text) => console.log(text)}
                            />
                          </View>
                        </View>
                      </View>
                    )}
                    {/* paper drop-down PaperSelect for multiple course */}
                    <View className="mt-4">
                      <MultiSelectComponent
                        placeholder="--Course--"
                        setSelected={setSelectedCourse}
                        data={courses}
                      />
                    </View>
                    <View className="mt-4">
                      <MultiSelectComponent
                        placeholder="--Product--"
                        setSelected={setSelectedProduct}
                        data={Products}
                      />
                    </View>
                    <View className="mt-4">
                      <TextInputComponent
                        placeholder={""}
                        label={"Total Price"}
                        value={totalPrice}
                        disabled={true}
                        onInputChange={(text) => console.log(text)}
                      />
                    </View>
                    <View className="mt-4">
                      <TextInputComponent
                        placeholder={"No of Coupons ?"}
                        label={"Create Coupons"}
                        value={""}
                        onInputChange={(text) => console.log(text)}
                      />
                    </View>
                    <View className="mt-4">
                      <ButtonComponent
                        onPress={() => console.log("first")}
                        mode={"contained"}
                      >
                        Submit
                      </ButtonComponent>
                    </View>
                  </View>
                </Modal>
              </Portal>
            </ScrollView>
          </View>
          {/* coupon-modal form ends here */}
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

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 0,
    overflow: "visible",
  },
});
