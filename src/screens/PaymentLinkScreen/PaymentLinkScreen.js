import { View } from "react-native";
import React, { useState } from "react";
import {
  Text,
  RadioButton,
  Button,
  Checkbox,
  Headline,
  Divider,
} from "react-native-paper";
import AppHeader from "../../components/AppHeader/AppHeader";
import { ScrollView } from "react-native-gesture-handler";
import TextInputComponent from "../../components/TextInput/TextInput";
import DropDownComponent from "../../components/DropDown/DropDown";
import DateAndTimePicker from "../../components/DateAndTimePicker/DateAndTimePicker";
import ButtonComponent from "../../components/Button/Button";
import { primaryColor } from "../../constants/constants";
import { Ionicons } from "@expo/vector-icons";
import AddCourseModal from "./Modals/AddCourseModal";

const PaymentLinkScreen = () => {
  const [checked, setChecked] = useState("");
  const [type, setType] = useState("");
  const [addCourseModal, seAddCourseModal] = useState([]);

  const data = [
    { label: "PP", value: "PP" },
    { label: "IP", value: "IP" },
    { label: "CP", value: "CP" },
    { label: "ILX", value: "ILX" },
    { label: "PS", value: "PS" },
    { label: "YV", value: "YV" },
  ];
  const [newdate, setNewdate] = useState("dd-mm-yyyy hh:mm");
  const datePickedhandler = (date) => setNewdate(date);

  const addCourseModalHandler = () => {
    const key = addCourseModal.length + 1;
    const newTextInput = { key };
    seAddCourseModal([...addCourseModal, newTextInput]);
  };

  const removeTextInput = (keyToRemove) => {
    const updatedTextInputs = addCourseModal.filter((addCourseModal) => addCourseModal.key !== keyToRemove);
    seAddCourseModal(updatedTextInputs);
  };




  return (
    <View className={`flex flex-1 bg-white ${Platform.OS === "ios" && "pb-2"}`}>
      <View>
        <AppHeader
          icon={"arrow-left"}
          onPress={() => console.log("first")}
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
            <Checkbox.Item status="checked" />
            <Text variant="titleMedium" className="mt-3">
              Send through Mail
            </Text>
          </View>
          <View className="flex-row">
            <Checkbox.Item status="checked" />
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
              keyboardType="numeric"
            />
            <View className="mt-4">
            <AddCourseModal/>
              <TextInputComponent
                className="bg-white"
                label="Email *"
                placeholder={"Enter Email"}
                keyboardType="numeric"
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
                  onPress={() => {
                    console.log("first");
                  }}
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
                   onPress={addCourseModalHandler} 
                >
                  + Add Service
                </Button>
              </View>
            </View>
            <View className="flex-1 mt-4">
            {addCourseModal.map((addCourseModal) => (
            <View key={addCourseModal.key}>
             <Button onPress={() => removeTextInput(addCourseModal.key)}>close</Button>
             <AddCourseModal/>
            </View>
              ))}
            </View>
            <View className="mt-4">
              <TextInputComponent
                className="bg-white"
                label="Amount to Pay *"
                placeholder={"Type Amount"}
                keyboardType="numeric"
              />
            </View>
            <View className="mt-4">
              <DropDownComponent
                placeholder={"Type"}
                data={data}
                value={type}
                setValue={setType}
              />
            </View>
            <View className="mt-4">
              <DropDownComponent data={data} />
            </View>
            <View className="mt-3">
              <Text variant="titleMedium">Currency *</Text>
              <View className="flex-row space-x-8">
                <View className="flex-row">
                  <RadioButton
                    value="first"
                    status={checked === "first" ? "checked" : "unchecked"}
                    onPress={() => setChecked("first")}
                  />
                  <Text variant="titleMedium" className="mt-2">
                    INR
                  </Text>
                </View>
                <View>
                  <View className="flex-row">
                    <RadioButton
                      value="first"
                      status={checked === "!first" ? "checked" : "unchecked"}
                      onPress={() => setChecked("first")}
                    />
                    <Text variant="titleMedium" className="mt-2">
                      USD
                    </Text>
                  </View>
                </View>
              </View>
              <View className="mt-3">
                <Text variant="titleMedium">Total Fees *</Text>
                <TextInputComponent
                  className="bg-white"
                  // label="Total Fees *"
                  placeholder={"0"}
                  keyboardType="numeric"
                  disabled={true}
                />
              </View>
              <View className="mt-4">
                <DropDownComponent
                  placeholder={"Fresh/Pending Payment *"}
                  data={data}
                />
              </View>
              <View className="mt-3">
                <Text variant="titleMedium">Offer Deadline:</Text>
                <DateAndTimePicker
                  initialDate={newdate}
                  onDateChange={datePickedhandler}
                />
              </View>
              <View className="mt-4">
                <DropDownComponent data={data} />
              </View>
              <View className=" flex-row mt-4">
                <Text variant="titleLarge">Installments (If Any):</Text>
                <Button className="mx-4" mode="contained">
                  + installment
                </Button>
              </View>
              <View className="mt-4">
                <Text variant="titleMedium">Note :</Text>
                <TextInputComponent
                  className="bg-white"
                  multiline={true}
                  style={{ height: 100, backgroundColor: "white" }}
                />
              </View>
              <View className="mt-4">
                <ButtonComponent
                  onPress={() => {
                    console.log("Press!!!");
                  }}
                  mode="contained"
                >
                  Send
                </ButtonComponent>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PaymentLinkScreen;
