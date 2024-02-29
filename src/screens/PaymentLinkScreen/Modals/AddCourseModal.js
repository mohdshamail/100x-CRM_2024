import { View, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { Button, Text } from "react-native-paper";
import ButtonComponent from "../../../components/Button/Button";
import DropDownComponent from "../../../components/DropDown/DropDown";
import TextInputComponent from "../../../components/TextInput/TextInput";
import { course_type } from "../PaymentLinkData";
import { primaryColor } from "../../../constants/constants";

const AddCourseModal = ({
  courseFilter,
  selectedCurrency,
  id,
  getCourseForm,
}) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  //console.log("selectedCourse" , selectedCourse);
  const [courseType, setCourseType] = useState(null);
  const [addons, setAddons] = useState(null);
  const [mrpPrice, setMRPPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [discount, setDiscount] = useState(0);
  const [trainer_requirement, setTrainer_requirement] = useState("NA");
  const [availability_time_req, setAvailability_time_req] = useState("NA");
  const [content_requirement, setContent_requirement] = useState("NA");
  const [couponCode, setCouponCode] = useState("");
  const [status, setStatus] = useState(null);
  const [formData, setFormData] = useState({
    key: id,
    id: "",
    type: "",
    selling_price: "",
    trainer_requirement: "NA",
    time_requirement: "NA",
    content_requirement: "NA",
    coupon_id: "",
  });

   //console.log("This child form data = ",formData);
  const course_filter = courseFilter.map((item) => {
    return {
      label: item.course_name,
      value: {
        id: item.id,
        dis: item.max_dis_percentage,
        course_name: item.course_name,
        crm_course_id: item.crm_course_id,
        price_inr: item.price_inr,
        price_usd: item.price_usd,
        max_dis_percentage: item.max_dis_percentage,
      },
    };
  });
  const handleCourseChange = (selectedCourse) => {
    setSelectedCourse(selectedCourse);
    if (selectedCourse && selectedCurrency === "INR") {
      setFormData((prevData) => ({
        ...prevData,
        id: selectedCourse.id,
        selling_price: selectedCourse.price_inr,
      }));
      setMRPPrice(selectedCourse.price_inr);
      setDiscount(selectedCourse.dis);
      setSellingPrice(selectedCourse.price_inr);
    } else if (selectedCourse && selectedCurrency === "USD") {
      setFormData((prevData) => ({
        ...prevData,
        id: selectedCourse.id,
        selling_price: selectedCourse.price_usd,
      }));
      setMRPPrice(selectedCourse.price_usd);
      setDiscount(selectedCourse.dis);
      setSellingPrice(selectedCourse.price_usd);
    }
  };
  const setType = (type) => {
    setCourseType(type);
    setFormData((prevData) => ({
      ...prevData,
      type: type,
    }));
  };
  const sellingPriceHandler = (text) => {
    setSellingPrice(text);
    setFormData((prevData) => ({
      ...prevData,
      selling_price: text ? text : "",
    }));
  };

  const discountPriceHandler = () => {
    var input_price = parseFloat(sellingPrice);
    var max_discount = parseFloat(discount);
    if (selectedCourse && selectedCurrency === "INR") {
      const coursePrice = parseFloat(selectedCourse.price_inr);
      const newSellingPrice = coursePrice - (max_discount * coursePrice) / 100;
      if (input_price < newSellingPrice) {
        setFormData((prevData) => ({
          ...prevData,
          selling_price: coursePrice.toString(),
        }));
        setSellingPrice(coursePrice.toString());
        setFormData((prevData) => ({
          ...prevData,
          id: selectedCourse.id,
        }));
        
        Alert.alert(
          "Error",
          `Maximum discount (${discount}%) Total Fess can't be less than Rs-${newSellingPrice}/-`
        );
       
      }
    } else if (selectedCourse && selectedCurrency === "USD") {
      const coursePrice = parseFloat(selectedCourse.price_usd);
      console.log("coursPerice",coursePrice)
      const newSellingPrice = coursePrice - (max_discount * coursePrice) / 100;
      console.log("newSellingPrice", newSellingPrice);
      if (input_price < newSellingPrice) {
        setFormData((prevData) => ({
          ...prevData,
          selling_price: coursePrice.toString(),
        }));
        setSellingPrice(coursePrice.toString());
        setFormData((prevData) => ({
          ...prevData,
          id: selectedCourse.id,
        }));
        Alert.alert(
          "Error",
          `Maximum discount (${discount}%) Total Fess can't be less than USD-${newSellingPrice}/-`
        );
        
      }
    } else {
      setSellingPrice(sellingPrice);
      setFormData((prevData) => ({
        ...prevData,
        selling_price: sellingPrice ? sellingPrice : "",
      }));
    }
  };

  const handleFieldChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const submitFormHandler = () => {
    if (!selectedCourse || !sellingPrice || !courseType || !formData.id) {
      Alert.alert("Error", "All Fields are required");
    } else {
      getCourseForm(formData);
      setStatus("Added Successfull");
      Alert.alert(
        "Success",
        `${
          selectedCourse?.course_name ? selectedCourse?.course_name : ""
        } Added Successfully!`
      );
    }
  };

  const textInputFields = [
    // {
    //   label: "MRP Price",
    //   disabled: true,
    //   value: mrpPrice,
    // },
    // {
    //   label: "Selling Price",
    //   keyboardType: "numeric",
    //   value: sellingPrice,
    //   onInputChange: (text) => {setSellingPrice(text)},
    // },
    {
      label: "Trainer Requirement",
      value: trainer_requirement,
      onInputChange: (text) => {
        handleFieldChange("trainer_requirement", text);
        setTrainer_requirement(text);
      },
    },
    {
      label: "Availability/Time requirement",
      value: availability_time_req,
      onInputChange: (text) => {
        handleFieldChange("time_requirement", text);
        setAvailability_time_req(text);
      },
    },
    {
      label: "Content Requirement",
      value: content_requirement,
      onInputChange: (text) => {
        handleFieldChange("content_requirement", text);
        setContent_requirement(text);
      },
    },
  ];
  const data = [{ label: "No Results Found", value: "" }];

  return (
    <View className="flex-1 mx-6">
      <Text
        style={{ color: primaryColor, fontWeight: "bold" }}
        variant="titleMedium"
      >
        Course: {id ? id : ""}
      </Text>
      <View className="mt-2">
        <DropDownComponent
          search={true}
          placeholder={
            selectedCourse?.course_name
              ? selectedCourse?.course_name
              : "Select course"
          }
          data={course_filter}
          value={selectedCourse}
          setValue={handleCourseChange}
        />
      </View>
      <View className="mt-4">
        <DropDownComponent
          placeholder={"Course Type"}
          data={course_type}
          value={courseType}
          setValue={setType}
        />
      </View>
      <View className="mt-4">
        <DropDownComponent
          placeholder={"Select addons"}
          data={data}
          value={addons}
          setValue={setAddons}
        />
      </View>
      <View className="mt-4">
        <TextInputComponent
          style={{ height: 50, backgroundColor: "white" }}
          label={"MRP Price"}
          disabled={true}
          value={mrpPrice}
        />
      </View>
      <View className="mt-4">
        <TextInputComponent
          style={{ height: 50, backgroundColor: "white" }}
          label={"Selling Price"}
          keyboardType={"numeric"}
          value={sellingPrice}
          onInputChange={sellingPriceHandler}
          onBlur={discountPriceHandler}
        />
      </View>
      <View className="flex-1">
        {textInputFields.map((field, index) => (
          <View key={index} className="mt-4 flex-1">
            <TextInputComponent
              style={{ height: 50, backgroundColor: "white" }}
              label={field.label}
              value={field.value}
              onInputChange={field.onInputChange}
              disabled={field.disabled}
              keyboardType={field.keyboardType}
            />
          </View>
        ))}
      </View>
      <View className="mt-4 mb-6">
        <View className="flex-row">
          <TextInputComponent
            style={{ width: 200, backgroundColor: "white" }}
            label={"Enter Coupon Code"}
            placeholder={"Enter Coupon"}
            value={couponCode}
            onInputChange={(text) => {
              setCouponCode(text);
            }}
          />
          <View className="mt-2 mx-4">
            <ButtonComponent
              onPress={() => {
                console.log("first");
              }}
              mode="contained"
            >
              Apply
            </ButtonComponent>
          </View>
        </View>
        <Button className="mt-4" onPress={submitFormHandler} mode="contained">
          {status ? status : "Save"}
        </Button>
      </View>
    </View>
  );
};

export default AddCourseModal;

//  value:`{id:${item.id} ,crm_course_id:${item.crm_course_id} price_inr:${item.price_inr} ,
//price_usd:${item.price_usd},max_dis_percentage:${item.max_dis_percentage}}`,
