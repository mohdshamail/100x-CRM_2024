import { View,Alert } from "react-native";
import React, { useState } from "react";
import { Button,Headline } from "react-native-paper";
import { primaryColor } from "../../../constants/constants";
import ButtonComponent from "../../../components/Button/Button";
import DropDownComponent from "../../../components/DropDown/DropDown";
import TextInputComponent from "../../../components/TextInput/TextInput";

const AddServiceModal = ({ categoryData,id }) => {
  const[categories, setCategories] = useState("");
  const[products, setProducts] = useState("");
  const[mrp_Price, setMrpPrice] = useState("");
  const[sellingPrice, setSellingPrice] = useState("");
  const[couponID, setCouponID] = useState("");
  const [formData , setFormData] = useState({});
 
  const data = [
    { label: "test", value: "test" },
    { label: "test1", value: "test1" },
    { label: "test2", value: "test2" },
    { label: "test3", value: "test4" },
  ];
  const addServiceHandler = () => {
    console.log("first")
  }



  return (
    <View className="flex-1 mx-6">
        <Headline style={{color:primaryColor ,fontWeight:'bold',}} variant="titleMedium">Service: { id ? id : "" }</Headline>
      <View className='mt-2'>
        <DropDownComponent 
         style ={{height:50,backgroundColor:"white"}}
         placeholder={"Select Category"} 
         data={categoryData} 
         value={categories}
         setValue={setCategories}
        />
      </View>
      <View className="mt-4">
        <DropDownComponent 
         style ={{height:50,backgroundColor:"white"}}
         search={true}
         placeholder={"Select add on"} 
         data={data} 
         value={products}
         setValue={setProducts}
        />
      </View>
      <View className="mt-4">
        <TextInputComponent
          style={{backgroundColor:"white",height:50}}
          label={"MRP Price"}
          value={mrp_Price}
          setValue={setMrpPrice}
          disabled={true}
          keyboardType="numeric"
        />
      </View>
      <View className="mt-4">
        <TextInputComponent 
         label={"Selling Price"}
         style={{backgroundColor:"white",height:50}} 
         keyboardType="numeric" 
         value={sellingPrice}
         onInputChange={(text) => {setSellingPrice(text)}}
        />
      </View>
      <View className="mt-4 mb-6">
        <View className="flex-row ">
          <TextInputComponent
            style={{ width: 200, backgroundColor: "white" }}
            label={"Enter Coupon Code"}
            placeholder={"Enter Coupon"}
            value={couponID}
            onInputChange={(text) =>{setCouponID(text)}}
          />
          <View className="mt-2 mx-4">
            <ButtonComponent mode="contained">Apply</ButtonComponent>
          </View>
        </View>
        <Button className='mt-4' mode="contained" onPress={addServiceHandler}
        >Save</Button>
      </View>
     
    </View>
  );
};

export default AddServiceModal;
