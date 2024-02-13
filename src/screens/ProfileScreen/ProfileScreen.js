import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar, Button, Card, Text, IconButton } from "react-native-paper";
import { primaryColor } from "../../constants/constants";
import picture from "../../../assets/avtar.png";
import TextInputComponent from "../../components/TextInput/TextInput";
import SnackBar from "../../components/SnackBar/SnackBar";
import { getValueFromStorage, doLogout } from "../../utility/utility";
import { storageKeys } from "../../constants/constants";
import { profileDataAPI } from "../../api/ProfileDataAPI/profileDataAPI";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";

const ProfileScreen = ({ navigation }) => {
  const userData = useSelector((state) => state.userData.userData);

  // const [token, setToken] = useState(null);
  const [wcc, setWcc] = useState("");
  const [did, setDid] = useState("");
  const [cc, setCc] = useState("");
  const [v_name, setV_name] = useState("");
  const [ozonetel_campaign_name, setOzonetel_campaign_name] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [successMsg, setSuccessMsg] = useState(null);


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
    <View className="flex-1">
      {userData ? (
        <ScrollView>
          <View
            className="flex flex-col relative rounded-b-3xl"
            style={{ backgroundColor: primaryColor, height: "40%" }}
          >
            <View className="flex items-start mt-8 mx-3">
              <IconButton
                icon="arrow-left"
                iconColor={"white"}
                size={35}
                onPress={() => navigation.goBack()}
              />
            </View>
            <View className="justify-center items-center">
              <Avatar.Image className="bg-white" size={100} source={picture} />
              <View className="mt-2">
                <Text
                  className="text-white font-extrabold"
                  variant="titleLarge"
                >
                  {userData ? userData?.v_name : "no-data"}
                </Text>
              </View>
            </View>
            <View className="mx-8 mt-6">
              <Card className="bg-white rounded-3xl">
                <Card.Content>
                  <View>
                    <Text variant="titleLarge" className="text-center">
                      Today's Lead Count = {userData?.lswsheets_count}
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
                              placeholder={userData?.country_code || "+91"}
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
                              placeholder={userData?.ozonetel_did}
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
                              placeholder={userData?.wcc || "+91"}
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
                              placeholder={userData?.whatsapp_number}
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
                        placeholder={userData?.v_name}
                        value={v_name}
                        onInputChange={(text) => setV_name(text)}
                      />
                    </View>
                    <View className="mt-4">
                      <Text
                        variant="titleMedium"
                        style={{ color: primaryColor }}
                      >
                        Ozonetel Campaign Name
                      </Text>
                      <View>
                        <TextInputComponent
                          style={{
                            backgroundColor: "white",
                            height: 50,
                          }}
                          // label="Name"
                          placeholder={userData?.ozonetel_campaign_name}
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
            <View className="mx-6 mt-6">
              <Button onPress={() => doLogout()} icon="logout" mode="contained">
                Logout
              </Button>
            </View>
          </View>
        </ScrollView>
      ) : (
        <Loader />
      )}
      {successMsg && <SnackBar snackLabel="Ok" snackText={successMsg} />}
    </View>
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
