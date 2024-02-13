import { View, StyleSheet } from "react-native";
import React,{ useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { cardBgcolor, primaryColor } from "../../../constants/constants";
import { Button, Card, Text, Modal, Portal, Divider } from "react-native-paper";
import SnackBar from "../../../components/SnackBar/SnackBar";
import {sendEduvanzFormAPI } from '../../../api/LeadDetailFormAPI/sendEduvanzFormAPI';
import { sendlmsAPI } from '../../../api/LeadDetailFormAPI/sendlmsAPI';
import { sendCourseMailerAPI } from '../../../api/LeadDetailFormAPI/sendCourseMailerAPI';
// import { getValueFromStorage } from "../../../utility/utility";
// import { storageKeys } from "../../../constants/constants";



const Tab_SendMail = ({leadEmail,leadID}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  // const [member_Id, setMember_Id] = useState(null);

//   const getMemberID = async () => {
//     const memberId = await getValueFromStorage(storageKeys.MEMBER_ID);
//     if (memberId) {
//       setMember_Id(memberId);
//     }
//   };
//   useEffect(() => {
//     getMemberID();
//   }, []);

//  console.log(member_Id);


  const handleMsg = () => {
    setSuccessMsg("This feature will be available soon");
    setTimeout(() => {
      setSuccessMsg(false);
    }, 3000);
  } 

  const sendCourseMailer = async() => {
    try{
      const mailerResponse = await sendCourseMailerAPI(leadID);
      if (mailerResponse[0] > 0) {
        //console.log(mailerResponse);
        setSuccessMsg("Mailer sent Successfully!");
        setTimeout(() => {
        setSuccessMsg(false);
      }, 3000);
      } else {
       //  console.log(mailerResponse);
        setSuccessMsg("Error! Mailer is not Available");
        setTimeout(() => {
        setSuccessMsg(false);
      }, 3000);
       
      }
    }catch(error){
      console.log("error",error);
    }
  };


  const sendlms = async() => {  
    try{
      const lmsResponse = await sendlmsAPI(leadID);
      setSuccessMsg(lmsResponse || "LMS sent Successfully!");
      setTimeout(() => {
      setSuccessMsg(false);
    }, 3000);
    }catch(error){
      console.log("error",error);
    }
  };

  const sendEduvanzForm = async() => {
    try{
      const eduvanzFormResponse = await sendEduvanzFormAPI(leadEmail ,leadID);
      if(eduvanzFormResponse == 1) {
        setSuccessMsg("Eduvanz login form send successful");
        setTimeout(() => {
        setSuccessMsg(false);
      }, 3000);
      }
      console.log("eduvanzFormResponse == " ,eduvanzFormResponse);
    }catch(error){
      console.log("error",error);
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
                  <Button mode="contained" className="px-1"
                  onPress={handleMsg}>
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
                  <Button  onPress={handleMsg}
                  mode="contained" className="px-1">
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
                  <Button  onPress={sendlms}
                  mode="contained" className="px-1">
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
                  <Button  onPress={handleMsg}
                   mode="contained" className="px-1">
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
                  <Button  onPress={handleMsg}
                   mode="contained" className="px-1">
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
                  <Button  onPress={sendEduvanzForm}
                   mode="contained" className="px-1">
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
                  <Button  onPress={sendCourseMailer}
                  mode="contained">Mailer</Button>
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
                  <Button  onPress={handleMsg}
                  mode="contained" className="px-1">
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
                  <Button    onPress={handleMsg}
                    mode="contained" className="px-1">
                    Send
                  </Button>
                  {/* modal appear here */}
                  <View>
                    <ScrollView>
                      <Portal className="rounded-lg">
                        <Modal
                          className="mx-8"
                          visible={isModalVisible}
                          onDismiss={setIsModalVisible}
                          contentContainerStyle={styles.containerStyle}
                        >
                          <View>
                            <View>
                              <Text
                                style={{ color: primaryColor, fontSize: 15 }}
                                className="text-xl   text-center"
                              >
                                Check Shopse Eligibility
                              </Text>
                            </View>
                            <Divider className="" />
                          </View>
                          <View className="mt-1">
                           
                         
                          </View>
                        </Modal>
                      </Portal>
                    </ScrollView>
                  </View>
                  {/* model ends here */}
                </View>
              </View>
            </Card>
          </View>
          {/* 10th card starts here */}
          {/* <View className="flex mt-2">
            <Card
              style={{
                backgroundColor: "white",
                height: 80,
                justifyContent: "center",
              }}
            >
             <View className='flex-row justify-between mx-4'>
               <View>
                  <Text variant='titleMedium' className='mt-1'>Send Automated Payment Link</Text>
               </View>
               <View>
                  <Button mode="contained">Send</Button>
               </View>
             </View>
            </Card>
            </View> */}
        </View>
      </ScrollView>
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
