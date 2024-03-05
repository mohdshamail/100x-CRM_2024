import { View, Alert } from "react-native";
import React, { useState } from "react";
import { TextInput, Text, Button } from "react-native-paper";
import AppHeader from "../../components/AppHeader/AppHeader";
import { ScrollView } from "react-native-gesture-handler";
import { primaryColor } from "../../constants/constants";
import SnackBar from "../../components/SnackBar/SnackBar";
import { newCourseEnquiryAPI } from "../../api/NewCourseEnquiryAPI/newCourseEnquiryAPI";

const NewCourseEnquiry = ({ navigation, route }) => {
  const { mid, email } = route?.params;
  const [snackBarData, setSnackBarData] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handlePress = async () => {
    if (!title || !description || title == "" || description == "") {
      Alert.alert("Warning!", "All fields are required");
      return;
    }
    try {
      const response = await newCourseEnquiryAPI(
        title,
        description,
        mid,
        email
      );
      if (response === 200) {
        setSnackBarData("New Course Enquiry has been created successfully!");
        setTitle("");
        setDescription("");
        setTimeout(() => {
          setSnackBarData(null);
        }, 3000);
      }
    } catch (error) {
      console.log("Error in Submitting New Course Enquiry Form = ", error);
    }
  };

  return (
    <View className={`flex flex-1 bg-white ${Platform.OS === "ios" && "pb-4"}`}>
      <View>
        <AppHeader
          barTittle={"New Course Enquiry"}
          icon={"arrow-left"}
          onPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        alwaysBounceVertical={true}
      >
        <View className=" flex p-4">
          <View className="flex p-1">
            <Text style={{ color: primaryColor }} variant="titleLarge">
              Title
            </Text>
            <View>
              <TextInput
                mode="outlined"
                placeholder="Enter Course Title"
                label={"Enter Title"}
                value={title}
                onChangeText={(text) => setTitle(text)}
                style={{ backgroundColor: "white" }}
              />
            </View>
            <Text
              className="mt-4"
              style={{ color: primaryColor }}
              variant="titleLarge"
            >
              Description
            </Text>
            <View>
              <TextInput
                mode="outlined"
                multiline={true}
                placeholder="Enter Course Description"
                label={"Enter Description"}
                value={description}
                onChangeText={(text) => setDescription(text)}
                style={{ backgroundColor: "white", lineHeight: 23 }}
              />
            </View>
            <Button className="mt-6" mode="contained" onPress={handlePress}>
              Save
            </Button>
          </View>
        </View>
      </ScrollView>
      {snackBarData && <SnackBar snackLabel="Ok" snackText={snackBarData} />}
    </View>
  );
};

export default NewCourseEnquiry;
