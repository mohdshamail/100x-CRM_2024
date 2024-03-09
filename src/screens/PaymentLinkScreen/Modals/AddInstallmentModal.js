import { View,Alert } from "react-native";
import React, { useState } from "react";
import { Button,Text } from "react-native-paper";
import TextInputComponent from "../../../components/TextInput/TextInput";
import DatePickerComponent from "../../../components/DatePicker/DatePicker";
import { primaryColor } from "../../../constants/constants";

const AddInstallmentModal = ({id,getAmount}) => {
  const [installment_amounts, setInstallment_amounts] = useState(null);
  const [installmentDate, setInstallmentDate] = useState("");
  const [status,setStatus] = useState(null);
  const [installmentData, setInstallmentData] = useState({
    key:id,
    p_amount:"",
    due_date:"",
  });
  
  // console.log("installmentAmounts = " , installment_amounts);
  // const onBlurHandler = () => {
  //   getAmount({key:id , amount:installment_amounts,});
  //  };

  const installmentDatePickHandler = (date) => {
    setInstallmentDate(date);
  }

  const onChangePaymentHandler = (text) => {
    setInstallment_amounts(text);
    // getAmount(text);
  }
 
const saveInstallmentHandler = () => {
  if (!installment_amounts || !installmentDate || installmentDate === "") {
    Alert.alert("⚠️ Error", `All Fields are required`);
    }  else {
      const updatedInstallmentData = {
        ...installmentData,
        p_amount: installment_amounts,
        due_date: installmentDate,
      };
      setInstallmentData(updatedInstallmentData);
      getAmount(updatedInstallmentData); // Pass the updated state directly
      Alert.alert("✅️ Success", `Installment Added Successfully`);
      setStatus("Added Successfully");
    }
};


  return (
    <View>
      <Text style={{color:primaryColor ,fontWeight:'bold'}} variant="titleMedium">Installment: { id ? id : "" }</Text>
      <TextInputComponent
        style={{ backgroundColor: "white", height: 50 }}
        label={"Installment Amount"}
        placeholder={"Enter Amount"}
        keyboardType="numeric"
        value={installment_amounts}
        onInputChange={onChangePaymentHandler}
        // onBlur={onBlurHandler}
      />
      <View className="mt-4">
        <DatePickerComponent
          initialDate={installmentDate}
          onDateChange={installmentDatePickHandler}
        />
      </View>
      <Button className='mt-4 mb-6' 
       mode="contained" 
       onPress={saveInstallmentHandler}
      >
      {status ? status: "Save"}
      </Button>
    </View>
  );
};

export default AddInstallmentModal;
