import { View, Alert } from "react-native";
import React, { useState } from "react";
import { Button, Headline } from "react-native-paper";
import { primaryColor } from "../../../constants/constants";
import ButtonComponent from "../../../components/Button/Button";
import DropDownComponent from "../../../components/DropDown/DropDown";
import TextInputComponent from "../../../components/TextInput/TextInput";
import { getProductCategoryAPI } from "../../../api/SendPaymentLinkAPI/getCategoryAPI";

const AddServiceModal = ({
  categoryData,
  id,
  selectedCurrency,
  getServiceForm,
}) => {
  const [categories, setCategories] = useState([]);
  const [productPrice, setProductPrice] = useState(null);
  const [mrp_Price, setMrpPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [couponID, setCouponID] = useState("");
  const [addons, setAddons] = useState([]);         
  const [status, setStatus] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [formData, setFormData] = useState({
    key: id,
    ServiceAddonPrice: "",
    product_id: "",
    coupon_id: "",
  });

  //onsole.log("formData =", formData);


  const addServiceHandler = () => {
    if (!categories || !productPrice) {
      Alert.alert("⚠️ Error", "All Fields are required");
    } else {
      getServiceForm(formData);
      setStatus("Service Added Successfully");
      setDisabled(true);
      Alert.alert("✅️ Success", "Service Added successfully!");
    }
  };

  async function serviceAddonsAPI(value) {
    if (!value) {
      Alert.alert("⚠️ Error", "Something went wrong!");
      return;
    }
    try {
      const response = await getProductCategoryAPI(value);
      if (response.length > 0) {
        if (selectedCurrency === "INR") {
          const transformedData = response.map((item) => ({
            label: item.name,
            value: {productname:item.name, productID:item.id ,price:parseFloat(item.offer_price).toFixed(0)},
          }));
          setAddons(transformedData);
        } else if (selectedCurrency === "USD") {
          const transformedData = response.map((item) => ({
            label: item.name,
            value: {productname:item.name, productID:item.id ,price:parseFloat(item.offer_price_usd).toFixed(0)},
          }));
          setAddons(transformedData);
        }
        // Alert.alert("Success!", "Addons found");
      } else {
        setAddons([]);
        Alert.alert("⚠️ Error", "No Addons found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  const setProductPriceHandler = (item) => {
    setProductPrice(item);
    setFormData((prev) => ({
      ...prev,
      ServiceAddonPrice: item.price,
      product_id:item.productID,

    }));
  };

  const sellingPriceHandler = (text) => {
    const enterpriceNumber = parseFloat(text);
    const addonPrice = parseFloat(productPrice?.price);
    if (addonPrice <= enterpriceNumber) {
      setSellingPrice(text);
      setFormData((prevData) => ({
        ...prevData,
        ServiceAddonPrice: enterpriceNumber,
      }));
    } else {
      setSellingPrice(productPrice?.price);
      setFormData((prevData) => ({
        ...prevData,
        ServiceAddonPrice: productPrice.price,
      }));
    }
  };

  const couponHandler = (text) => {
    setCouponID(text);
    setFormData((prevData) => ({
      ...prevData,
      coupon_id: text,
    }));
  };

  return (
    <View className="flex-1 mx-6">
      <Headline
        style={{ color: primaryColor, fontWeight: "bold" }}
        variant="titleMedium"
      >
        Service: {id ? id : ""}
      </Headline>
      <View className="mt-2">
        <DropDownComponent
          style={{ height: 50, backgroundColor: "white" }}
          placeholder={"Select Category"}
          data={categoryData}
          value={categories}
          setValue={setCategories}
          setValueinAPI={serviceAddonsAPI}
        />
      </View>
      <View className="mt-4">
        <DropDownComponent
          style={{ height: 50, backgroundColor: "white" }}
          search={true}
          placeholder={productPrice?.productname ? productPrice?.productname :"Select add on"}
          data={addons}
          value={productPrice}
          setValue={setProductPriceHandler}
        />
      </View>
      <View className="mt-4">
        <TextInputComponent
          style={{ backgroundColor: "white", height: 50 }}
          label={"MRP Price"}
          value={mrp_Price || productPrice?.price}
          setValue={setMrpPrice}
          disabled={true}
          keyboardType="numeric"
        />
      </View>
      <View className="mt-4">
        <TextInputComponent
          label={"Selling Price"}
          style={{ backgroundColor: "white", height: 50 }}
          keyboardType="numeric"
          value={sellingPrice || productPrice?.price}
          onInputChange={sellingPriceHandler}
          // onInputChange={(text) => {
          //   setSellingPrice(text);
          // }}
        />
      </View>
      <View className="mt-4 mb-6">
        <View className="flex-row ">
          <TextInputComponent
            style={{ width: 200, backgroundColor: "white" }}
            label={"Enter Coupon Code"}
            placeholder={"Enter Coupon"}
            value={couponID}
            onInputChange={couponHandler}
            // onInputChange={(text) => {
            //   setCouponID(text);
            // }}
          />
          <View className="mt-2 mx-4">
            <ButtonComponent mode="contained">Apply</ButtonComponent>
          </View>
        </View>
        <Button
          className="mt-4"
          mode="contained"
          onPress={addServiceHandler}
          disabled={disabled}
        >
          {status ? status : "Save"}
        </Button>
      </View>
    </View>
  );
};

export default AddServiceModal;
