import { View, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { formatDate } from "../../utility/utility";
import {
  Text,
  RadioButton,
  Button,
  Checkbox,
  Headline,
  Card,
} from "react-native-paper";
import AppHeader from "../../components/AppHeader/AppHeader";
import { ScrollView } from "react-native-gesture-handler";
import TextInputComponent from "../../components/TextInput/TextInput";
import DropDownComponent from "../../components/DropDown/DropDown";
import DateAndTimePicker from "../../components/DateAndTimePicker/DateAndTimePicker";
import DatePickerComponent from "../../components/DatePicker/DatePicker";
import ButtonComponent from "../../components/Button/Button";
import { primaryColor } from "../../constants/constants";
import { AntDesign } from "@expo/vector-icons";
import AddCourseModal from "./Modals/AddCourseModal";
import AddServiceModal from "./Modals/AddServiceModal";
import AddInstallmentModal from "./Modals/AddInstallmentModal";
import { reg_type, paymentOption, fresh_pending } from "./PaymentLinkData";
import SnackBar from "../../components/SnackBar/SnackBar";
import { getPaymentLinkDataAPI } from "../../api/SendPaymentLinkAPI/getPaymentLinkDataAPI";
import { sendPaymentLinkAPI } from "../../api/SendPaymentLinkAPI/sendPaymentLinkAPI";
import { getValueFromStorage } from "../../utility/utility";
import { storageKeys } from "../../constants/constants";

const PaymentLinkScreen = ({ navigation, route }) => {
  const lead_id = route.params?.leadID;
  const [member_id, setMemberID] = useState(null);
  const [mailChecked, setMailChecked] = useState(false);
  const [smsChecked, setSmsChecked] = useState(false);
  const [mobileNo, setMobileNo] = useState("");
  const [emailID, setEmailID] = useState("");
  const [amountToPay, setAmountToPay] = useState("");
  const [type, setType] = useState("");
  const [totalFees, setTotalFees] = useState("");
  const [fresh_pendingAmount, setFresh_pendingAmount] = useState("");
  const [pending_payment_date, setPendingMonth] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const [categoryData, setCategoryData] = useState(null);
  const [courseFilter, setCourseFilter] = useState(null);
  const [addCourseModal, setAddCourseModal] = useState([]);
  const [courses, setCourses] = useState([]);
  const [apiSendCourses, setapiSendCourses] = useState(null);
  const [totalfeesAmount, setTotalFeesAmount] = useState("0");
  const [addServiceModal, setAddServiceModal] = useState([]);
  const [addInstallmentModal, setAddInstallmentModal] = useState([]);
  const [installmentAmounts, setInstallmentAmounts] = useState([]);
  const [totalInstallmentsAmount, setTotalInstallmentsAmount] = useState("0");
  console.log("totalInstallmentsAmountc =", totalInstallmentsAmount);

  // console.log("installments ==" ,installmentAmounts);
  const [snackbarMsg, setSnackbarMsg] = useState(null);
  const [offerdate, setOfferdate] = useState("");
  const [offerDeadline, setOfferDeadline] = useState("");
  //const [installmentDate, setInstallmentDate] = useState("");
  const [payment_option, setpayment_option] = useState("");

  const [noteText, setNoteText] = useState("");

  const offerDeadlineDateHandler = (date) => {
    const modifyDate = formatDate(date);
    setOfferdate(date);
    setOfferDeadline(modifyDate);
  };

  const pendingMonthDatePickHandler = (date) => setPendingMonth(date);

  useEffect(() => {
    fetchapiData();
  }, []);

  const fetchapiData = async () => {
    try {
      const memberId = await getValueFromStorage(storageKeys.MEMBER_ID);
      const member_id = memberId.toString();
      setMemberID(member_id);
      const apiResponse = await getPaymentLinkDataAPI();
      const categories = apiResponse?.categories.map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
      setCategoryData(categories);
      setCourseFilter(apiResponse?.course_filter_p);
    } catch (error) {
      console.log("error in fetching getPaymentLinkDataAPI ", error);
    }
  };

  // adding new Course Modal
  const addCourseModalHandler = () => {
    const key = addCourseModal.length + 1;
    const newTextInput = { key };
    setAddCourseModal([...addCourseModal, newTextInput]);
    setSnackbarMsg("course added successfully");
    setTimeout(() => {
      setSnackbarMsg(null);
    }, 500);
  };

  const removeTextInput = (keyToRemove) => {
    const updatedCourseModal = addCourseModal.filter(
      (addCourseModal) => addCourseModal.key !== keyToRemove
    );
    setAddCourseModal(updatedCourseModal);
    const updatedCourses = courses.filter((item) => item.key !== keyToRemove);
    setCourses(updatedCourses);
    setSnackbarMsg("Course removed successfully");
    setTimeout(() => {
      setSnackbarMsg(null);
    }, 500);
    // Update totalFeesAmount when removing a course
    const totalCoursePrice = updatedCourses.reduce((acc, item) => {
      return acc + parseFloat(item.selling_price);
    }, 0);
    setTotalFeesAmount(totalCoursePrice.toString());
  };

  // adding new service Modal
  const addServiceModalHandler = () => {
    const key = addServiceModal.length + 1;
    const newServiceModal = { key };
    setAddServiceModal([...addServiceModal, newServiceModal]);
    setSnackbarMsg("Service added successfully");
    setTimeout(() => {
      setSnackbarMsg(null);
    }, 500);
  };

  const removeServiceModal = (keyToRemove) => {
    const updatedServiceModal = addServiceModal.filter(
      (addServiceModal) => addServiceModal.key !== keyToRemove
    );
    setAddServiceModal(updatedServiceModal);
    setSnackbarMsg("Service removed successfully");
    setTimeout(() => {
      setSnackbarMsg(null);
    }, 1000);
  };

  // add installment Modal
  const addInstallmentModalHandler = () => {
    const key = addInstallmentModal.length + 1;
    const newInstallmentModal = { key };
    setAddInstallmentModal([...addInstallmentModal, newInstallmentModal]);
    setSnackbarMsg("Installment added successfully");
    setTimeout(() => {
      setSnackbarMsg(null);
    }, 500);
  };
  const removeInstallmentModal = (keyToRemove) => {
    console.log("keyToRemove = ", keyToRemove);
    const updatedInstallmentModal = addInstallmentModal.filter(
      (addInstallmentModal) => addInstallmentModal.key !== keyToRemove
    );
    setAddInstallmentModal(updatedInstallmentModal);
    const updatedInstallmentAmounts = installmentAmounts.filter(
      (item) => item.key !== keyToRemove
    );
    setInstallmentAmounts(updatedInstallmentAmounts);
    const removedInstallmentmount = updatedInstallmentAmounts.reduce(
      (acc, item) => {
        return acc + parseFloat(item.p_amount);
      },
      0
    );
    setTotalInstallmentsAmount(removedInstallmentmount.toString());
    setSnackbarMsg("Installment removed successfully");
    setTimeout(() => {
      setSnackbarMsg(null);
    }, 500);
  };

  const handleCurrencySelection = (currency) => {
    setSelectedCurrency(currency);
  };

  const getCourseModalFormValue = (newCourses) => {
    setCourses([...courses, newCourses]);
    const dataArray = [...courses, newCourses];
    const courses_data = dataArray.map((item) => ({
      id: item.id.toString(),
      type: item.type,
      trainer_requirement: item.trainer_requirement,
      time_requirement: item.time_requirement,
      content_requirement: item.content_requirement,
      selling_price: item.selling_price.toString(),
      coupon_id: item.coupon_id,
    }));
    setapiSendCourses(courses_data);
    const totalCoursePrice = dataArray.reduce((acc, item) => {
      // Convert selling_price to a number and add it to the accumulator
      return acc + parseFloat(item.selling_price);
    }, 0); // Initialize accumulator with 0
    setTotalFeesAmount(totalCoursePrice.toString());
  };

  //getting data from the Add Installment Modals
  const getInstallmentsValue = (amount) => {
    // Update state
    setInstallmentAmounts((prevAmounts) => [...prevAmounts, amount]);

    // Retrieve current installment amounts including the new one
    const installmentdataArray = [...installmentAmounts, amount];

    // Check if installmentdataArray is empty
    if (installmentdataArray.length === 0) {
      Alert.alert("Error", "No installment data available");
    } else {
      // Calculate total amount
      const totalAmountOfInstallment = installmentdataArray.reduce(
        (acc, item) => {
          // Assuming each item has a property "p_amount"
          return acc + parseFloat(item.p_amount);
        },
        0
      );

      // Update state with the total amount
      setTotalInstallmentsAmount(totalAmountOfInstallment.toString());
      console.log("totalAmountOfInstallment", totalAmountOfInstallment);
    }
  };

  // console.log("installmentAmounts = ", installmentAmounts);
  // console.log("total installment amounts = ", totalInstallmentsAmount);

  var payment = {
    lead_id: lead_id,
    member_id: member_id,
    send_through_mail: mailChecked,
    send_through_sms: smsChecked,
    amount: amountToPay,
    coupon_ids: [], //couponIds,
    pending_amount: 14000,
    due_date: "2024-02-27",
    offer_amount: totalfeesAmount,
    note: noteText,
    courses: apiSendCourses,
    payment_option: payment_option,
    is_pending_payment: "", //is_pending_payment,
    mobile: mobileNo,
    email: emailID,
    currencypa: selectedCurrency,
    products: "", //products, //[],
    addons: "", //addons, //[],
    fresh_pending: fresh_pendingAmount,
    is_sap_partner: 0,
    reg_type: type,
    pending_payment_date: pending_payment_date,
    country_selector: "",
    offerDeadline: offerDeadline,
  };

  const handleSendPayment = async () => {
    if (!offerdate || offerdate.trim() === "") {
      Alert.alert("Error!", "Please select offer deadline Date");
      return;
    } else if (!fresh_pendingAmount || offerdate.trim() === "") {
      Alert.alert("Error!", "Select Fresh/Pending Payment!!!");
    } else if (
      !mobileNo ||
      mobileNo.trim() === "" ||
      !emailID ||
      emailID.trim() === ""
    ) {
      Alert.alert("Error!", "Fill Mobile and Email first.");
    } else if (
      (fresh_pendingAmount === "Pending Payment" && !pending_payment_date) ||
      pending_payment_date.trim() === ""
    ) {
      Alert.alert("Error!", "Select Month of this pending payment!!!");
    } else if (!totalFees || totalFees.trim() === "") {
      Alert.alert("Error!", "Total Fees is required");
    } else {
      // Proceed with sending payment link
      try {
        const submitPaymentResponse = await sendPaymentLinkAPI(payment);
        console.log("submitPaymentResponse = ", submitPaymentResponse);
      } catch (error) {
        console.log("error in sending payment link!", error);
      }
      console.log("Payment link sent successfully");
    }
  };

  return (
    <View className={`flex flex-1 bg-white ${Platform.OS === "ios" && "pb-2"}`}>
      <View>
        <AppHeader
          icon={"arrow-left"}
          onPress={() => navigation.goBack()}
          barTittle={"Send Payment Link"}
          // showMenuButton={true}
          handleopenMenu={() => console.log("first")}
        />
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        alwaysBounceVertical={true}
      >
        <View className=" flex p-4">
          <View className="flex-row">
            <Checkbox.Item
              status={mailChecked ? "checked" : "unchecked"}
              onPress={() => {
                setMailChecked(!mailChecked);
              }}
            />
            <Text variant="titleMedium" className="mt-3">
              Send through Mail
            </Text>
          </View>
          <View className="flex-row">
            <Checkbox.Item
              status={smsChecked ? "checked" : "unchecked"}
              onPress={() => {
                setSmsChecked(!smsChecked);
              }}
            />
            <Text variant="titleMedium" className="mt-3">
              Send through SMS
            </Text>
          </View>

          <View className="flex p-1">
            <TextInputComponent
              className="bg-white"
              label="Mobile"
              placeholder={
                "If you want to send on default number then leave it blank"
              }
              value={mobileNo}
              onChangeText={(text) => setMobileNo(text)}
              //keyboardType="numeric"
            />
            <View className="mt-4">
              {/* <AddCourseModal/> */}
              <TextInputComponent
                className="bg-white"
                label="Email *"
                placeholder={"Enter Email"}
                value={emailID}
                onInputChange={(text) => setEmailID(text)}
              />
              {/* <DropDownComponent data={data} /> */}
            </View>
            <View className="mt-1">
              <View className="flex-row">
                <Headline>Add to cart</Headline>

                {/* <Ionicons name="cart" style={{marginTop:7}} color={primaryColor} size={24} /> */}
              </View>
              <View className="flex-row mt-2 justify-around">
                <Button
                  mode="outlined"
                  style={{
                    borderColor: primaryColor,
                    borderWidth: 1.3,
                    borderRadius: 8,
                  }}
                  onPress={addCourseModalHandler}
                >
                  + Add Course
                </Button>
                <Button
                  mode="outlined"
                  style={{
                    borderColor: primaryColor,
                    borderWidth: 1.3,
                    borderRadius: 8,
                  }}
                  onPress={addServiceModalHandler}
                >
                  + Add Service
                </Button>
              </View>
            </View>
            <View className="flex-1 mt-4">
              {addCourseModal.map((addCourseModal) => (
                <Card key={addCourseModal.key} className="mb-5 bg-slate-100">
                  <ScrollView>
                    <View className="flex mx-2 mt-2 mb-3">
                      <AntDesign
                        name="delete"
                        size={25}
                        color={primaryColor}
                        onPress={() => removeTextInput(addCourseModal.key)}
                      />
                    </View>
                    <AddCourseModal
                      courseFilter={courseFilter}
                      selectedCurrency={selectedCurrency}
                      id={addCourseModal.key}
                      getCourseForm={getCourseModalFormValue}
                    />
                  </ScrollView>
                </Card>
              ))}
            </View>
            <View className="flex-1 mt-4">
              {addServiceModal.map((addServiceModal) => (
                <Card key={addServiceModal.key} className="mb-5 bg-emerald-50">
                  <ScrollView>
                    <View className="flex mx-2 mt-2 mb-3">
                      <AntDesign
                        name="delete"
                        size={25}
                        color={primaryColor}
                        onPress={() => removeServiceModal(addServiceModal.key)}
                      />
                    </View>
                    <AddServiceModal
                      categoryData={categoryData}
                      id={addServiceModal.key}
                    />
                  </ScrollView>
                </Card>
              ))}
            </View>

            <View className="">
              <DropDownComponent
                placeholder={"Type"}
                data={reg_type}
                value={type}
                setValue={setType}
              />
            </View>
            <View className="mt-3">
              <Text variant="titleMedium">Currency *</Text>
              <View className="flex-row space-x-8">
                <View className="flex-row">
                  <RadioButton
                    value="INR"
                    status={
                      selectedCurrency === "INR" ? "checked" : "unchecked"
                    }
                    onPress={() => handleCurrencySelection("INR")}
                  />
                  <Text variant="titleMedium" className="mt-2">
                    INR
                  </Text>
                </View>
                <View>
                  <View className="flex-row">
                    <RadioButton
                      value="USD"
                      status={
                        selectedCurrency === "USD" ? "checked" : "unchecked"
                      }
                      onPress={() => handleCurrencySelection("USD")}
                    />
                    <Text variant="titleMedium" className="mt-2">
                      USD
                    </Text>
                  </View>
                </View>
              </View>
              {selectedCurrency && selectedCurrency === "USD" && (
                <View className="mt-4">
                  <DropDownComponent
                    placeholder={"--Country--"}
                    data={paymentOption}
                  />
                </View>
              )}
              <View className="mt-3">
                <Text variant="titleMedium">Total Fees *</Text>
                <TextInputComponent
                  className="bg-white"
                  // label="Total Fees *"
                  placeholder={totalfeesAmount ? totalfeesAmount : "0"}
                  value={totalFees}
                  onInputChange={(text) => setTotalFees(text)}
                  keyboardType="numeric"
                  disabled={true}
                />
              </View>
              <View className="mt-4">
                <TextInputComponent
                  className="bg-white"
                  label="Amount to Pay *"
                  placeholder={"Type Amount"}
                  value={amountToPay}
                  onInputChange={(text) => setAmountToPay(text)}
                  keyboardType="numeric"
                />
              </View>
              <View className="mt-4">
                <DropDownComponent
                  placeholder={"Fresh/Pending Payment *"}
                  data={fresh_pending}
                  value={fresh_pendingAmount}
                  setValue={setFresh_pendingAmount}
                />
              </View>
              {fresh_pendingAmount &&
                fresh_pendingAmount === "Pending Payment" && (
                  <View className="mt-3">
                    <Text variant="titleMedium">
                      Month of this pending payment
                    </Text>
                    <View className="mt-1">
                      <DatePickerComponent
                        initialDate={pending_payment_date}
                        onDateChange={pendingMonthDatePickHandler}
                      />
                    </View>
                  </View>
                )}

              <View className="mt-3">
                <Text variant="titleMedium">Offer Deadline:</Text>
                <View className="mt-1">
                  <DateAndTimePicker
                    initialDate={offerdate}
                    onDateChange={offerDeadlineDateHandler}
                  />
                </View>
              </View>
              <View className="mt-4">
                <DropDownComponent
                  placeholder={"--Select Payment Option--"}
                  data={paymentOption}
                  value={payment_option}
                  setValue={setpayment_option}
                />
              </View>
              <View className=" flex-row mt-4">
                <Text variant="titleLarge">Installments (If Any):</Text>
                <Button
                  className="mx-4"
                  mode="contained"
                  onPress={addInstallmentModalHandler}
                >
                  + installment
                </Button>
              </View>
              <View className="flex-1 mt-4">
                {addInstallmentModal.map((addInstallmentModal) => (
                  <Card
                    key={addInstallmentModal.key}
                    className="mb-5 bg-indigo-100"
                  >
                    <ScrollView>
                      <View className="flex mx-2 mt-2 mb-2">
                        <AntDesign
                          name="delete"
                          size={25}
                          color={primaryColor}
                          onPress={() =>
                            removeInstallmentModal(addInstallmentModal.key)
                          }
                        />
                      </View>
                      <View className="flex-1 mx-6">
                        <AddInstallmentModal
                          id={addInstallmentModal.key}
                          getAmount={getInstallmentsValue}
                        />
                      </View>
                    </ScrollView>
                  </Card>
                ))}
              </View>

              <View className="mt-4">
                <Text variant="titleMedium">Note :</Text>
                <TextInputComponent
                  className="bg-white"
                  multiline={true}
                  value={noteText}
                  onInputChange={(text) => setNoteText(text)}
                  style={{ height: 100, backgroundColor: "white" }}
                />
              </View>

              <View className="mt-4">
                <ButtonComponent onPress={handleSendPayment} mode="contained">
                  Send
                </ButtonComponent>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {snackbarMsg && <SnackBar snackLabel="Ok" snackText={snackbarMsg} />}
    </View>
  );
};

export default PaymentLinkScreen;
