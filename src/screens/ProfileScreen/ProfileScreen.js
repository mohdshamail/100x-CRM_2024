import { View, StyleSheet, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar, Button, Card, Text, IconButton } from "react-native-paper";
import { primaryColor } from "../../constants/constants";
import picture from "../../../assets/avtar.png";
import TextInputComponent from "../../components/TextInput/TextInput";
import SnackBar from "../../components/SnackBar/SnackBar";
import { getValueFromStorage, doLogout } from "../../utility/utility";
import { storageKeys } from "../../constants/constants";
import { profileDataAPI } from "../../api/ProfileDataAPI/profileDataAPI";
// import { useSelector } from "react-redux";
//import Loader from "../../components/Loader/Loader";
import { getprofileDataAPI } from "../../api/ProfileDataAPI/getProfileAPI";
import { StatusBar } from "expo-status-bar";

const ProfileScreen = ({ navigation }) => {
  // const userData = useSelector((state) => state.userData.userData);
  const [refreshing, setRefreshing] = useState(false);
  // const [token, setToken] = useState(null);
  const [wcc, setWcc] = useState("");
  const [did, setDid] = useState("");
  const [cc, setCc] = useState("");
  const [v_name, setV_name] = useState("");
  const [ozonetel_campaign_name, setOzonetel_campaign_name] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [successMsg, setSuccessMsg] = useState(null);
  const [lswsheets_count, selswsheets_count] = useState(null);

  const onRefresh = () => {
    setRefreshing(true);
    getTodaysLeadCountData();
    setTimeout(() => {
      setRefreshing(false);
    }, 5000); // Set a timeout to simulate a delay
  };

  const getTodaysLeadCountData = async () => {
    try {
      const token = await getValueFromStorage(storageKeys.APP_SECURE);
      const response = await getprofileDataAPI(token);
      selswsheets_count(response?.lswsheets_count);
      setWcc(response?.wcc);
      setDid(response?.ozonetel_did);
      setCc(response?.country_code);
      setV_name(response?.v_name);
      setOzonetel_campaign_name(response?.ozonetel_campaign_name);
      setWhatsapp(response?.whatsapp_number);
    } catch (error) {
      console.log("error in todays lead count = ", error);
    }
  };
  useEffect(() => {
    getTodaysLeadCountData();
  }, []);

  const submitHandler = async () => {
    try {
      const token = await getValueFromStorage(storageKeys.APP_SECURE);
      const submitResponse = await profileDataAPI(
        token,
        wcc,
        did,
        cc,
        v_name,
        ozonetel_campaign_name,
        whatsapp
      );
      console.log("submitResponse = ", submitResponse);
      if (submitResponse === 200) {
        setSuccessMsg("Profile Updated Successfully!");
        setTimeout(() => {
          setSuccessMsg(null);
        }, 3000);
      }
    } catch (error) {
      console.log("error in submitting profile data = ", error);
    }
  };

  return (
    // <View style={{flex:1}}>
    <>
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[primaryColor]}
          />
        }
      >
        <StatusBar />
        <View
          className="flex flex-col relative  rounded-b-3xl"
          style={{ backgroundColor: primaryColor, height: "40%" }}
        >
          {/* <View className="flex items-start mt-8 mx-3">
              <IconButton
                icon="arrow-left"
                iconColor={"white"}
                size={35}
                onPress={() => navigation.goBack()}
              />
            </View> */}
          <View className="justify-center mt-20 items-center">
            <Avatar.Image className="bg-white" size={100} source={picture} />
            <View className=" flex-row mt-2">
              <Text className="text-white font-extrabold" variant="titleLarge">
                {v_name || "no-data"}
              </Text>
              <IconButton
                style={{ marginBottom: 1, marginTop: -1 }}
                icon="circle"
                iconColor={lswsheets_count == 0 ? "red" : "green"}
                size={18}
              />
            </View>
          </View>
          <View className="mx-8 mt-4">
            <Card className="bg-white rounded-3xl">
              <Card.Content>
                <View>
                  <Text variant="titleLarge" className="text-center">
                    Today's Lead Count = {lswsheets_count || "0"}
                  </Text>
                </View>
                <View>
                  <View className="mt-4">
                    <View className="flex-row justify-around">
                      <Text
                        variant="titleMedium"
                        style={{ color: primaryColor }}
                      >
                        CC
                      </Text>
                      <Text
                        variant="titleMedium"
                        style={{ color: primaryColor }}
                      >
                        Ozonetel DID / Zoom No.
                      </Text>
                    </View>
                    <View className="flex-row justify-between mt-2">
                      <View className="flex-row justify-evenly">
                        <View>
                          <TextInputComponent
                            style={{ backgroundColor: "white", height: 50 }}
                            // label="Country code"
                            mode="contained"
                            value={cc}
                            placeholder={"cc"}
                            onInputChange={(text) => setCc(text)}
                          />
                        </View>
                        <View className="ml-3">
                          <TextInputComponent
                            style={{
                              width: 200,
                              backgroundColor: "white",
                              height: 50,
                            }}
                            // label="Add Mobile"
                            rightIcon={"cellphone"}
                            mode="contained"
                            keyboardType="numeric"
                            value={did}
                            placeholder={"DID/Zoom No."}
                            onInputChange={(text) => setDid(text)}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View>
                  <View className="mt-4">
                    <View className="flex-row justify-around">
                      <Text
                        variant="titleMedium"
                        style={{ color: primaryColor }}
                      >
                        WCC
                      </Text>
                      <Text
                        variant="titleMedium"
                        style={{ color: primaryColor }}
                      >
                        Official Whatsapp Number
                      </Text>
                    </View>
                    <View className="flex-row justify-between mt-2">
                      <View className="flex-row justify-evenly">
                        <View>
                          <TextInputComponent
                            style={{ backgroundColor: "white", height: 50 }}
                            // label="Country code"
                            placeholder={"wcc"}
                            mode="contained"
                            value={wcc}
                            onInputChange={(text) => setWcc(text)}
                          />
                        </View>
                        <View className="ml-3">
                          <TextInputComponent
                            style={{
                              width: 200,
                              backgroundColor: "white",
                              height: 50,
                            }}
                            // label="Add Mobile"
                            placeholder={"whatsapp No."}
                            rightIcon={"cellphone"}
                            mode="contained"
                            keyboardType="numeric"
                            value={whatsapp}
                            onInputChange={(text) => setWhatsapp(text)}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View className="mt-4">
                  <Text variant="titleMedium" style={{ color: primaryColor }}>
                    Display Name
                  </Text>
                  <View>
                    <TextInputComponent
                      style={{
                        backgroundColor: "white",
                        height: 50,
                      }}
                      // label="Name"
                      rightIcon={"pencil"}
                      mode="contained"
                      placeholder={"Enter Name"}
                      value={v_name}
                      onInputChange={(text) => setV_name(text)}
                    />
                  </View>
                  <View className="mt-4">
                    <Text variant="titleMedium" style={{ color: primaryColor }}>
                      Ozonetel Campaign Name
                    </Text>
                    <View>
                      <TextInputComponent
                        style={{
                          backgroundColor: "white",
                          height: 50,
                        }}
                        // label="Name"
                        placeholder={"Enter Name"}
                        value={ozonetel_campaign_name}
                        rightIcon={"pencil"}
                        mode="contained"
                        onInputChange={(text) =>
                          setOzonetel_campaign_name(text)
                        }
                      />
                    </View>
                  </View>
                </View>
                <View className="mx-1 mt-4">
                  <Button onPress={submitHandler} mode="contained">
                    Submit
                  </Button>
                </View>
              </Card.Content>
            </Card>
          </View>
          {/* logout Button appears here */}
          <View className="mx-6 mt-4 mb-8">
            <Button
              onPress={() => doLogout()}
              icon="logout"
              mode="outlined"
              style={{
                borderColor: primaryColor,
                borderRadius: 12,
                marginHorizontal: 15,
              }}
            >
              Logout
            </Button>
          </View>
        </View>
      </ScrollView>
      {successMsg && <SnackBar snackLabel="Ok" snackText={successMsg} />}
    </>
    // </View>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 0,
    overflow: "hidden",
  },
  containerStyle: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 18,
  },
});
