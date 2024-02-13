import { View } from "react-native";
import React, { useState } from "react";
import { Appbar, Text, RadioButton,Divider } from "react-native-paper";
import { primaryColor } from "../../constants/constants";
import { ScrollView } from "react-native-gesture-handler";
import TextInputComponent from "../../components/TextInput/TextInput";
import DropDownComponent from "../../components/DropDown/DropDown";
import DateAndTimePicker from "../../components/DateAndTimePicker/DateAndTimePicker";
import ButtonComponent from "../../components/Button/Button";

const ScholarshipFormScreen = () => {
  const [checked, setChecked] = useState("");
  const data = [{}, {}, {}];
  const [newdate, setNewdate] = useState("dd-mm-yyyy hh:mm");
  const datePickedhandler = (date) => setNewdate(date);

  return (
    <View className={`flex flex-1 bg-white ${Platform.OS === "ios" && "pb-4"}`}>
      <View>
        <Appbar.Header
          style={{ backgroundColor: primaryColor }}
          elevated="true"
        >
          <Appbar.Action
            size={30}
            iconColor="white"
            icon="arrow-left"
            //onPress={() => navigation.goBack()}
            onPress={() => console.log("first")}
          />
          <Appbar.Content
            titleStyle={{ color: "white" }}
            title="Send Scholership Offer"
          />
        </Appbar.Header>
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        alwaysBounceVertical={true}
      >
       
        <View className=" flex p-5">
        <View className='mx-2'>
          <Text variant="titleMedium">Select Offer For Enrollment :</Text>
        </View>
        <Divider bold={true}
         className='mt-1'/>
          <View className="flex p-1">
            <TextInputComponent
              className="bg-white"
              label="Fill Offered Price*"
              keyboardType="numeric"
            />
            <View className="mt-4">
              <DropDownComponent data={data} />
            </View>
            <View className="mt-4">
              <TextInputComponent
                className="bg-white"
                label="Fill Actual Price*"
                keyboardType="numeric"
              />
            </View>
            <View className="mt-4">
              <TextInputComponent
                className="bg-white"
                label="Fill Offered Price"
                keyboardType="numeric"
              />
            </View>
            <View className="mt-4">
              <DropDownComponent data={data} />
            </View>
            <View className="mt-4">
              <TextInputComponent
                className="bg-white"
                label="Fill Actual Price"
                keyboardType="numeric"
              />
            </View>
            <View className="mt-4">
              <TextInputComponent
                className="bg-white"
                label="Fill Actual Price"
                keyboardType="numeric"
              />
            </View>
            <View className="mt-4">
              <DropDownComponent data={data} />
            </View>
            <View className="mt-4">
              <TextInputComponent
                className="bg-white"
                label="Fill Actual Price"
                keyboardType="numeric"
              />
            </View>
            <View className="mt-3">
              <Text variant="titleMedium">Select Course</Text>
              <DropDownComponent data={data} />
            </View>
            <View className="mt-3">
              <Text variant="titleMedium">Deadline Date time:</Text>
              <DateAndTimePicker
                //it receives 2 prop initialDate,onDateChange
                initialDate={newdate}
                onDateChange={datePickedhandler}
              />
            </View>
            <View className="mt-3">
              <Text variant="titleMedium">Currency</Text>
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
              <View className="mt-4">
                <DropDownComponent data={data} />
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
                <ButtonComponent onPress={()=>{console.log("Press!!!")}}
                mode="contained">
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

export default ScholarshipFormScreen;
