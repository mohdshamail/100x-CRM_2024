import { View,useWindowDimensions  } from "react-native";
import React, { useState, useEffect } from "react";
import { Button, Text, Divider } from "react-native-paper";
import AppHeader from "../../components/AppHeader/AppHeader";
import SnackBar from "../../components/SnackBar/SnackBar";
import { ScrollView } from "react-native-gesture-handler";
import { primaryColor } from "../../constants/constants";
import { courseMailerAPI } from "../../api/CourseMailerAPI/courseMailerAPI";
import RenderHtml from 'react-native-render-html';
import MailData from "./MailData";

const source = {
  html: `
  <p>I am normal</p>
  <p style="color:red;">I am red</p>
  <p style="color:blue;">I am blue</p>
  <p style="font-size:50px;">I am big</p>
  `


};


const CourseMailer = ({ navigation, route }) => {
  const { width } = useWindowDimensions();
  const { leadID, mid } = route?.params;
  const [snackBarData, setSnackBarData] = useState(null);

  // const getMailerFromAPI = async () => {
  //   try {
  //     const response = courseMailerAPI(leadID, mid);
  //     console.log("response =" , response);
  //   } catch (error) {
  //     console.log("Error in Mailer API Fetching = ", error);
  //   }
  // };

  // useEffect(() => {
  //   getMailerFromAPI();
  // }, []);
 

  return (
    <View className={`flex flex-1 bg-white ${Platform.OS === "ios" && "pb-4"}`}>
      <AppHeader
        barTittle={"Course Mailer"}
        icon={"arrow-left"}
        onPress={() => navigation.goBack()}
      />
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
              Send Course Mailer
            </Text>
            <Divider style={{ marginTop: 8 }} />
 
          </View>
          <RenderHtml
            contentWidth={width}
            source={source}
          />
        </View>
      </ScrollView>
      {snackBarData && <SnackBar snackLabel="Ok" snackText={snackBarData} />}
    </View>
  );
};

export default CourseMailer;
