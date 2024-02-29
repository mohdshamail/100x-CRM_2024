import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { cardBgcolor, primaryColor } from "../../../constants/constants";
import { Button, Card, Divider, Text } from "react-native-paper";
import SnackBar from "../../../components/SnackBar/SnackBar";
import { sendEduvanzFormAPI } from "../../../api/LeadDetailFormAPI/sendEduvanzFormAPI";
import { sendlmsAPI } from "../../../api/LeadDetailFormAPI/sendlmsAPI";
import { sendCourseMailerAPI } from "../../../api/LeadDetailFormAPI/sendCourseMailerAPI";
import { useNavigation } from "@react-navigation/native";
import BottomSheet from "../../../components/BottomSheet/BottomSheet";
import { AntDesign } from "@expo/vector-icons";


const Tab_SendMail = ({ leadEmail, leadID }) => {
  const navigation = useNavigation();
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);


  const handleMsg = () => {
    setSuccessMsg("This feature will be available soon");
    setTimeout(() => {
      setSuccessMsg(false);
    }, 3000);
  };

  const sendCourseMailer = async () => {
    try {
      const mailerResponse = await sendCourseMailerAPI(leadID);
      if (mailerResponse[0] > 0) {
        setSuccessMsg("Mailer sent Successfully!");
        setTimeout(() => {
          setSuccessMsg(false);
        }, 3000);
      } else {
        setSuccessMsg("Error! Mailer is not Available");
        setTimeout(() => {
          setSuccessMsg(false);
        }, 3000);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const sendlms = async () => {
    try {
      const lmsResponse = await sendlmsAPI(leadID);
      setSuccessMsg(lmsResponse || "LMS sent Successfully!");
      setTimeout(() => {
        setSuccessMsg(false);
      }, 3000);
    } catch (error) {
      console.log("error", error);
    }
  };

  const sendEduvanzForm = async () => {
    try {
      const eduvanzFormResponse = await sendEduvanzFormAPI(leadEmail, leadID);
      if (eduvanzFormResponse == 1) {
        setSuccessMsg("Eduvanz login form send successful");
        setTimeout(() => {
          setSuccessMsg(false);
        }, 3000);
      }
      console.log("eduvanzFormResponse == ", eduvanzFormResponse);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <View className="flex-1 mt-2">
      <ScrollView>
        <View className="mx-3">
          <View className="flex">
            <Card
              style={{
                backgroundColor: "white",
                height: 70,
                justifyContent: "center",
              }}
            >
              <View className="flex-row justify-between mx-4">
                <View>
                  <Text variant="titleMedium" className="mt-1">
                    Send Auto Payment Link
                  </Text>
                </View>
                <View>
                  <Button
                    mode="contained"
                    className="px-1"
                    onPress={() => {
                      navigation.navigate("PaymentLinkScreen", {
                        leadID: leadID,
                      });
                    }}
                  >
                    Send
                  </Button>
                </View>
              </View>
            </Card>
          </View>
          {/* second card starts here */}
          <View className="flex mt-2">
            <Card
              style={{
                backgroundColor: "white",
                height: 70,
                justifyContent: "center",
              }}
            >
              <View className="flex-row justify-between mx-4">
                <View>
                  <Text variant="titleMedium" className="mt-1">
                    Payment Request
                  </Text>
                </View>
                <View>
                  <Button onPress={handleMsg} mode="contained" className="px-1">
                    Send
                  </Button>
                </View>
              </View>
            </Card>
          </View>
          {/* third card starts here */}
          <View className="flex mt-2">
            <Card
              style={{
                backgroundColor: "white",
                height: 70,
                justifyContent: "center",
              }}
            >
              <View className="flex-row justify-between mx-4">
                <View>
                  <Text variant="titleMedium" className="mt-1">
                    Send Free LMS
                  </Text>
                </View>
                <View>
                  <Button onPress={sendlms} mode="contained" className="px-1">
                    Send
                  </Button>
                </View>
              </View>
            </Card>
          </View>
          {/* 4th card starts here */}
          <View className="flex mt-2">
            <Card
              style={{
                backgroundColor: "white",
                height: 70,
                justifyContent: "center",
              }}
            >
              <View className="flex-row justify-between mx-4">
                <View>
                  <Text variant="titleMedium" className="mt-1">
                    Scholarship Form
                  </Text>
                </View>
                <View>
                  <Button onPress={handleMsg} mode="contained" className="px-1">
                    Send
                  </Button>
                </View>
              </View>
            </Card>
          </View>
          {/* 5th card starts here */}
          <View className="flex mt-2">
            <Card
              style={{
                backgroundColor: "white",
                height: 70,
                justifyContent: "center",
              }}
            >
              <View className="flex-row justify-between mx-4">
                <View>
                  <Text variant="titleMedium" className="mt-1">
                    Easy EMI Form
                  </Text>
                </View>
                <View>
                  <Button onPress={handleMsg} mode="contained" className="px-1">
                    Send
                  </Button>
                </View>
              </View>
            </Card>
          </View>
          {/* 6th card starts here */}
          <View className="flex mt-2">
            <Card
              style={{
                backgroundColor: "white",
                height: 70,
                justifyContent: "center",
              }}
            >
              <View className="flex-row justify-between mx-4">
                <View>
                  <Text variant="titleMedium" className="mt-1">
                    Eduvanz Login Form
                  </Text>
                </View>
                <View>
                  <Button
                    onPress={sendEduvanzForm}
                    mode="contained"
                    className="px-1"
                  >
                    Send
                  </Button>
                </View>
              </View>
            </Card>
          </View>
          {/* 7th card starts here */}
          <View className="flex mt-2">
            <Card
              style={{
                backgroundColor: "white",
                height: 70,
                justifyContent: "center",
              }}
            >
              <View className="flex-row justify-between mx-4">
                <View>
                  <Text variant="titleMedium" className="mt-1">
                    Send Mailer
                  </Text>
                </View>
                <View>
                  <Button onPress={sendCourseMailer} mode="contained">
                    Mailer
                  </Button>
                </View>
              </View>
            </Card>
          </View>
          {/* 8th card starts here */}
          <View className="flex mt-2">
            <Card
              style={{
                backgroundColor: "white",
                height: 70,
                justifyContent: "center",
              }}
            >
              <View className="flex-row justify-between mx-4">
                <View>
                  <Text variant="titleMedium" className="mt-1">
                    Send Free Courses
                  </Text>
                </View>
                <View>
                  <Button onPress={handleMsg} mode="contained" className="px-1">
                    Send
                  </Button>
                </View>
              </View>
            </Card>
          </View>
          {/* 9th card starts here */}
          <View className="flex mt-2 mb-2">
            <Card
              style={{
                backgroundColor: "white",
                height: 70,
                justifyContent: "center",
              }}
            >
              <View className="flex-row justify-between mx-4">
                <View>
                  <Text variant="titleMedium" className="mt-1">
                    Course Mailer
                  </Text>
                </View>
                <View>
                  <Button
                    className='text-white bg-rose-700'
                    onPress={() => {
                      setIsSheetVisible(!isSheetVisible);
                    }}
                    mode="contained"
                  >
                   Mailer
                  </Button>
                </View>
              </View>
            </Card>
          </View>
        </View>
      </ScrollView>
      <View>
        {isSheetVisible && (
          <BottomSheet>
            <View>
              <View className="flex flex-1 items-end">
                <AntDesign
                  name="closecircleo"
                  size={26}
                  color={primaryColor}
                  onPress={() => {
                    setIsSheetVisible(false);
                  }}
                />
              </View>
              <View className="mt-3 mx-3">
                <View className='flex-row justify-between'>
                  <Text>ID</Text>
                  <Text>Subject</Text>
                  <Text>Action</Text>
                </View>
               <Divider style={{borderWidth:0.2}}/>
              </View>
            </View>
          </BottomSheet>
        )}
      </View>
      {successMsg && <SnackBar snackLabel="Ok" snackText={successMsg} />}
    </View>
  );
};

export default Tab_SendMail;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: cardBgcolor,
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
  },
  text: {
    color: primaryColor,
    fontWeight: "bold",
    fontSize: 15,
    paddingHorizontal: 10,
    marginTop: 8,
  },
  containerStyle: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 18,
  },
});
