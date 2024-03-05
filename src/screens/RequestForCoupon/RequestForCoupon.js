import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import AppHeader from "../../components/AppHeader/AppHeader";
import { primaryColor } from "../../constants/constants";
import SnackBar from "../../components/SnackBar/SnackBar";
import { Button, TextInput, Divider } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import MultiSelectComponent from "../../components/DropDown/MultiSelectComponent";
import DropDownComponent from "../../components/DropDown/DropDown";
import { requestForCouponAPI } from "../../api/RequestForCouponAPI/requestForCouponAPI";
import { submitCouponRequestAPI } from "../../api/RequestForCouponAPI/submitCouponRequestAPI";

const RequestForCoupon = ({ navigation, route }) => {
  const { mid, email } = route.params;
  const [apiData, setAPIDATA] = useState(null);
  const [type, setDiscountCouponType] = useState("0");
  const [discount_percentage, setdiscount_percentage] = useState("");
  const [flat_discount, setflat_discount] = useState(null);
  const [flat_discount_usd, setFlat_discount_usd] = useState(null);
  const [filter_course, setFilter_course] = useState([]);
  const [filter_product, setFilter_product] = useState([]);
  const [noOfCoupons, setNoOfCoupons] = useState("1");
  const [snackBarData, setSnackBarData] = useState(null);

  const fetcCourseData = async () => {
    try {
      const response = await requestForCouponAPI();
      setAPIDATA(response);
    } catch (error) {
      console.log("Error in fetching Data", error);
    }
  };
  useEffect(() => {
    fetcCourseData();
  }, []);

  // Render course data only when apiData is not null
  let courseData = [];
  let productData = [];
  if (apiData) {
    courseData = apiData[0].map((item) => ({
      label: item.course_name,
      value: item.crm_course_id,
    }));
    productData = apiData[1].map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }

  const course_prices = filter_course.map((courseId) => {
    const course = apiData[0].find(
      (course) => course.crm_course_id === courseId
    );
    return course ? parseFloat(course.price_inr) : 0;
  });
  const sumOfPricesOfCourse = course_prices.reduce(
    (total, course_prices) => total + course_prices,
    0
  );

  const product_prices = filter_product.map((productId) => {
    const product = apiData[1].find((product) => product.id === productId);
    return product ? parseFloat(product.price) : 0;
  });

  const sumOfPriceOfProduct = product_prices.reduce(
    (total, product_prices) => total + product_prices,
    0
  );
  const sumOFAllPrice = sumOfPricesOfCourse + sumOfPriceOfProduct;
  const total_price = sumOFAllPrice.toString();

  //filter_course data for an array
  let filteredCourseData = [];
  if (apiData) {
    filteredCourseData = apiData[0]
      .filter((course) => filter_course.includes(course.crm_course_id))
      .map((course) => [course.id, parseFloat(course.price_inr)]);
  }

  //filter_product data for an array
  let filteredProductData = [];
  if (apiData) {
    filteredProductData = apiData[1]
      .filter((product) => filter_product.includes(product.id))
      .map((product) => [product.id, parseFloat(product.price)]);
  }

  //console.log("filteredProductData = ", filteredProductData);

  // dropdown coupon data
  const discountCoupon = [
    { label: "Percentage", value: "0" },
    { label: "Flat", value: "1" },
  ];

  const handlePercentageChange = (text) => {
    if (text >= 0 && text <= 80) {
      setdiscount_percentage(text);
    }
  };
  const handleCouponChange = (text) => {
    if (text >= 0 && text <= 5) {
      setNoOfCoupons(text);
    }
  };

  const submitHandler = async () => {
    try {
      const response = await submitCouponRequestAPI(
        mid,
        email,
        type,
        discount_percentage,
        flat_discount,
        flat_discount_usd,
        filteredCourseData,
        filteredProductData,
        total_price,
        noOfCoupons
      );
      if (response?.status == "200") {
        const couponCode  = response?.couponCode.replace(/<br>/g, '');
        setSnackBarData(`Your Coupon Code is: ${couponCode}`);
        setTimeout(() => {
          setSnackBarData(false);
        }, 6000);
        setdiscount_percentage("");
        setflat_discount(null);
        setFlat_discount_usd(null);
        setFilter_course([]);
        setFilter_product([]);
        setNoOfCoupons("1");
      }
      console.log("response of submit Coupon API", response);
    } catch (error) {
      console.log("Error in fetching data", error);
    }
  };

  return (
    <View className={`flex flex-1 bg-white ${Platform.OS === "ios" && "pb-4"}`}>
      <AppHeader
        barTittle={"Request For Coupon"}
        icon={"arrow-left"}
        onPress={() => navigation.goBack()}
      />
      {apiData && (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          alwaysBounceVertical={true}
        >
          <View className=" flex p-4">
            <View className="flex p-1">
              <Text
                style={{ color: primaryColor, fontSize: 25 }}
                className="text-xl text-center"
              >
                Request Coupon
              </Text>
              <Divider style={{ marginTop: 8 }} />
              {/* <View className='mt-2'>
         <Text className='mx-1 text-lg'>Type</Text>
         </View> */}
              <View className="mt-4">
                <DropDownComponent
                  data={discountCoupon}
                  //search={true}
                  placeholder={"--Select Type--"}
                  value={type}
                  setValue={setDiscountCouponType}
                />
              </View>
              {"0" == type ? (
                <View className="mt-4">
                  <TextInput
                    style={{ backgroundColor: "white" }}
                    placeholder={"Enter Discount in Percentage"}
                    label={"Discount (%)"}
                    value={discount_percentage}
                    keyboardType="numeric"
                    mode="outlined"
                    onChangeText={handlePercentageChange}
                  />
                </View>
              ) : (
                <View>
                  <View className="mt-4">
                    <TextInput
                      style={{ backgroundColor: "white" }}
                      placeholder={"Enter Discount Amount in Rs"}
                      label={"Flat Discount (INR)"}
                      value={flat_discount}
                      mode="outlined"
                      keyboardType="numeric"
                      onChangeText={(text) => setflat_discount(text)}
                    />
                    <View className="mt-4">
                      <TextInput
                        style={{ backgroundColor: "white" }}
                        placeholder={"Enter Discount Amount in USD"}
                        label={"Flat Discount (USD)"}
                        value={flat_discount_usd}
                        keyboardType="numeric"
                        mode="outlined"
                        onChangeText={(text) => setFlat_discount_usd(text)}
                      />
                    </View>
                  </View>
                </View>
              )}
              <View className="mt-4">
                <MultiSelectComponent
                  placeholder={"--Select Course--"}
                  search={true}
                  selected={filter_course}
                  setSelected={setFilter_course}
                  data={courseData}
                />
              </View>
              <View className="mt-4">
                <MultiSelectComponent
                  placeholder="--Select Product--"
                  selected={filter_product}
                  setSelected={setFilter_product}
                  data={productData}
                />
              </View>
              <View className="mt-4">
                <TextInput
                  style={{ backgroundColor: "white" }}
                  placeholder={""}
                  mode="outlined"
                  label={"Total Price"}
                  value={total_price || "0"}
                  disabled={true}
                  //onChangeText={(text) => console.log(text)}
                />
              </View>
              <View className="mt-4">
                <TextInput
                  style={{ backgroundColor: "white" }}
                  placeholder={"No of Coupons"}
                  label={"How Many Coupons You Want To Create ?"}
                  mode="outlined"
                  value={noOfCoupons}
                  keyboardType="numeric"
                  onChangeText={handleCouponChange}
                />
              </View>
              <View className="mt-4">
                <Button onPress={submitHandler} mode={"contained"}>
                  Submit
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
      {snackBarData && <SnackBar snackLabel="Ok" snackText={snackBarData} />}
    </View>
  );
};

export default RequestForCoupon;
