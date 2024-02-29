import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  Icon,
  Avatar,
  Tooltip,
  TextInput,
  Card,
  Button,
  Text,
  Portal,
  Modal,
  Headline,
  Divider,
} from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { primaryColor } from "../../../constants/constants";
import SnackBar from "../../../components/SnackBar/SnackBar";
import { useNavigation } from "@react-navigation/native";
// import DataTableComponent from "../../../components/DataTable/DataTableComponent";

const LeadDescriptionTab = ({ lead_data,filterRecordData }) => {
  const leadID = lead_data?.id;
  const navigation = useNavigation();
  const [visible_3, setVisible_3] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [campaignValue, setCampaignValue] = useState(lead_data?.lead_campaign);
  const [description2Value, setDescription2Value] = useState(
    lead_data?.description2
  );
  const [digValue, setDigValue] = useState(lead_data?.dig);
  // const [showtableLeadSource, setShowtableLeadSource] = React.useState(false);

  // const showModal_1 = () => setVisible_1(true);
  // const hideModal_1 = () => setVisible_1(false);
  // const showModal_2 = () => setVisible_2(true);
  // const hideModal_2 = () => setVisible_2(false);
  const showModal_3 = () => setVisible_3(true);
  const hideModal_3 = () => setVisible_3(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
  };
  //console.log("lead_data?.description2 =", lead_data?.description2);
  const data = [
    { key: "1", value: "Mobiles" },
    { key: "2", value: "Appliances" },
    { key: "3", value: "Cameras" },
    { key: "4", value: "Computers", disabled: true },
    { key: "5", value: "Vegetables" },
    { key: "6", value: "Diary Products" },
    { key: "7", value: "Drinks" },
  ];
  const datafortable = [
    { sno: 1, name: "Alice", date: "2023-11-21" },
    { sno: 2, name: "Bob", date: "2023-12-05" },
    { sno: 11, name: "Alice", date: "2023-11-21" },
  ];

  const handleMsg = () => {
    setSuccessMsg("This feature will be available soon");
    setTimeout(() => {
      setSuccessMsg(false);
    }, 3000);
  };

  //for Description
  let description_text = "";
  lead_data?.descriptions2.forEach((item) => {
    if (item["cdate"] && item["comment"]) {
      description_text += item["cdate"] + "\n" + item["comment"] + "\n";
    }
  });

  //for Revival Comment
  let revivalComment_text = "";
  lead_data?.descriptions2.forEach((item) => {
    if (item["cdate"] && item["revival_comment"]) {
      revivalComment_text +=
        item["cdate"] + "\n" + item["revival_comment"] + "\n";
    }
  });

  //for Product Comment
  let productComment_text = "";
  lead_data?.descriptions2.forEach((item) => {
    if (item["cdate"] && item["product_comment"]) {
      productComment_text +=
        item["cdate"] + "\n" + item["product_comment"] + "\n";
    }
  });

  return (
    <View className="flex-1 mt-3">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mx-1">
          <View className="flex flex-row justify-around">
            <Card
              style={{
                backgroundColor: "white",
                height: 70,
                width: "45%",
                justifyContent: "center",
              }}
            >
              <Text className="text-center text-lg">No. of Calls</Text>
              <View className="flex-row justify-center">
                <Icon
                  source="phone-incoming"
                  mode="contained"
                  color={primaryColor}
                  size={30}
                />
                <Text className="text-xl">
                  {lead_data ? lead_data?.call_details_count : "0"}
                </Text>
              </View>
            </Card>
            <Card
              style={{
                backgroundColor: "white",
                height: 70,
                width: "45%",
                justifyContent: "center",
              }}
            >
              <Text className="text-center text-lg">Pending Amount</Text>
              <View className="flex-row justify-center">
                <Icon source="currency-inr" color={primaryColor} size={30} />
                <Text className="text-xl">
                  {lead_data.pending_amount ? lead_data?.pending_amount : "0"}
                </Text>
              </View>
            </Card>
          </View>
          {/* upper Cards ends up here */}

          <View className="mt-2 mx-2">
            <Card style={{ backgroundColor: "white", height: 90 }}>
              <View className="mx-5 mt-2">
                <Text
                  variant="titleMedium"
                  style={{ color: primaryColor, fontWeight: "bold" }}
                >
                  Lead Source
                </Text>
                <View className="flex flex-row justify-between">
                  <Text variant="titleMedium" className="mx-2 mt-2">
                    FORM
                  </Text>
                  <View>
                    <Button mode="contained" onPress={handleMsg}>
                      View All
                    </Button>
                  </View>
                </View>
              </View>
              {/* {showtableLeadSource && (<View className='mb-4'>
                  <DataTableComponent data={datafortable} tableTitle={"LEADSOURCE List"}/>
                  </View>)} */}
            </Card>
            <View className="mt-2">
              <Card style={{ backgroundColor: "white", height: 70 }}>
                <View className="mx-5 mt-2">
                  <Text
                    variant="titleMedium"
                    style={{ color: primaryColor, fontWeight: "bold" }}
                  >
                    PP Lead Owner
                  </Text>
                  <Text variant="titleMedium" className="mx-2">
                    {lead_data ? lead_data?.m_name : "null"}
                  </Text>
                </View>
              </Card>
            </View>
            <View className="mt-2">
              <Card style={{ backgroundColor: "white", height: 70 }}>
                <View className="mx-5 mt-2">
                  <Text
                    variant="titleMedium"
                    style={{ color: primaryColor, fontWeight: "bold" }}
                  >
                    Profession
                  </Text>
                  <Text variant="titleMedium" className="mx-2">
                    {lead_data?.profession
                      ? lead_data?.profession
                      : "no record found!"}
                  </Text>
                </View>
              </Card>
            </View>

            <View className="mt-2">
              <Card style={{ backgroundColor: "white", height: 70 }}>
                <View className="mx-5 mt-2">
                  <Text
                    variant="titleMedium"
                    style={{ color: primaryColor, fontWeight: "bold" }}
                  >
                    Enquiry no
                  </Text>
                  <Text variant="titleMedium" className="mx-2">
                    {lead_data?.id ? lead_data?.id : "no record found!"}
                  </Text>
                </View>
              </Card>
            </View>
            <View className="mt-2">
              <Card style={{ backgroundColor: "white", height: 70 }}>
                <View className="mx-5 mt-2">
                  <Text
                    variant="titleMedium"
                    style={{ color: primaryColor, fontWeight: "bold" }}
                  >
                    Enquiry Date/Time
                  </Text>
                  <Text variant="titleMedium" className="mx-2">
                    {lead_data?.last_update_date_time
                      ? lead_data?.last_update_date_time
                      : "no record found!"}
                  </Text>
                </View>
              </Card>
            </View>
            <View className="mt-2">
              <Card style={{ backgroundColor: "white", height: 70 }}>
                <View className="mx-5 mt-2">
                  <Text
                    variant="titleMedium"
                    style={{ color: primaryColor, fontWeight: "bold" }}
                  >
                    Walkin Recordings
                  </Text>
                  <Text variant="titleMedium" className="mx-2">
                    No record found !
                  </Text>
                </View>
              </Card>
            </View>
            <View className="mt-2">
              <Card style={{ backgroundColor: "white", height: 70 }}>
                <View className="mx-5 mt-2">
                  <Text
                    variant="titleMedium"
                    style={{ color: primaryColor, fontWeight: "bold" }}
                  >
                    Pending Payment
                  </Text>
                 <View>
                   <Text variant="titleMedium" className="mx-2">
                    {lead_data?.pending_amount
                      ? lead_data?.pending_amount
                      : "No record Found"}
                  </Text>
                 </View>
                </View>
              </Card>
            </View>
            <View className="mt-2">
              <Card style={{ backgroundColor: "white", height: 'auto' }}>
                <View className="mx-5 mt-2">
                  <Text
                    variant="titleMedium"
                    style={{ color: primaryColor, fontWeight: "bold" }}
                  >
                    Customer Support History
                  </Text>
                 <View className='flex-1 mb-10'>
                 <Text variant="titleMedium" className="mx-2">
                    No History.
                  </Text>
                 </View>
                </View>
              </Card>
            </View>
            <View className="mt-2">
              <Card style={{ backgroundColor: "white", height: "auto" }}>
                <View className="flex-row justify-between">
                  <Text
                    variant="titleMedium"
                    style={{
                      color: primaryColor,
                      fontWeight: "bold",
                      marginTop: 20,
                      marginLeft: 20,
                    }}
                  >
                    Description
                  </Text>
                  <View className="mt-3 mx-4">
                    <Tooltip title="Add New" enterTouchDelay={100}>
                      <TouchableOpacity   
                        onPress={() =>
                          navigation.navigate("ActionLeadDetailForm", {
                            leadID: leadID,
                            filterRecordData: filterRecordData,
                          })
                        }
                      >
                        <Avatar.Icon size={40} icon="pencil" />
                      </TouchableOpacity>
                    </Tooltip>
                  </View>
                </View>
                <TextInput
                  multiline={true}
                  disabled={true}
                  style={{
                    // padding: 5,
                    backgroundColor: "white",
                    lineHeight: 23,
                    marginBottom: 20,
                    marginHorizontal: 20,
                  }}
                  value={description_text || "no-result-found"}
                  placeholder={"Add Description"}
                />
              </Card>
            </View>

            <View className="mt-2">
              <Card style={{ backgroundColor: "white", height: "auto" }}>
                <View className="flex-row justify-between">
                  <Text
                    variant="titleMedium"
                    style={{
                      color: primaryColor,
                      fontWeight: "bold",
                      marginTop: 20,
                      marginLeft: 20,
                    }}
                  >
                    Lead Revival Comment
                  </Text>
                  <View className="mt-3 mx-4">
                    <Tooltip title="Add New" enterTouchDelay={100}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("ActionLeadDetailForm", {
                            leadID: leadID,
                            filterRecordData: filterRecordData,
                          })
                        }

                      >
                        <Avatar.Icon size={40} icon="pencil" />
                      </TouchableOpacity>
                    </Tooltip>
                  </View>
                </View>
                <TextInput
                  multiline={true}
                  style={{
                    backgroundColor: "white",
                    lineHeight: 23,
                    marginBottom: 20,
                    marginHorizontal: 20,
                  }}
                  disabled={true}
                  value={revivalComment_text || "no-result-found!"}
                  placeholder={"Add Comment"}
                />
              </Card>
            </View>
            <View className="flex-1">
              <Portal className="rounded-lg">
                <Modal
                  className="mx-8"
                  visible={visible_3}
                  onDismiss={hideModal_3}
                  contentContainerStyle={containerStyle}
                >
                  <View>
                    <Headline className="text-center font-bold">
                      Add Product Comment
                    </Headline>
                    <Divider />
                    <View className="mt-4">
                      <TextInput
                        multiline
                        numberOfLines={10}
                        mode="outlined"
                        style={{ backgroundColor: "white", padding: 5 }}
                      />
                    </View>
                    <View className="flex-row justify-end mt-3">
                      <Button mode="outlined" onPress={hideModal_3}>
                        Close
                      </Button>
                      <Button mode="contained" className="mx-2 px-1">
                        Add
                      </Button>
                    </View>
                  </View>
                </Modal>
              </Portal>
            </View>
            <View className="mt-2">
              <Card style={{ backgroundColor: "white", height: "auto" }}>
                <View className="flex-row justify-between mx-5 mt-2">
                  <View>
                    <Text
                      variant="titleMedium"
                      style={{
                        color: primaryColor,
                        fontWeight: "bold",
                        marginTop: 20,
                      }}
                    >
                      Product Comment
                    </Text>
                  </View>
                  <View>
                    <Tooltip title="Add New" enterTouchDelay={100}>
                      <TouchableOpacity onPress={showModal_3}>
                        <Avatar.Icon size={40} icon="pencil" />
                      </TouchableOpacity>
                    </Tooltip>
                  </View>
                </View>
                <View className="">
                  <TextInput
                    multiline={true}
                    disabled={true}
                    style={{
                      // padding: 5,
                      backgroundColor: "white",
                      lineHeight: 23,
                      marginBottom: 20,
                      marginHorizontal: 20,
                    }}
                    value={productComment_text || "no-result-found"}
                    placeholder={"Add Comment"}
                  />
                </View>
              </Card>
            </View>
            <View className="mt-2">
              <Card style={{ backgroundColor: "white", height: "auto" }}>
                <View className="mx-5 mt-2">
                  <Text
                    variant="titleMedium"
                    style={{ color: primaryColor, fontWeight: "bold" }}
                  >
                    Campaign
                  </Text>
                  <View>
                    <Card.Content>
                      <TextInput
                        multiline={true}
                        placeholder={"Enter  campaign name"}
                        className="mb-10 bg-white leading-6"
                        value={campaignValue}
                        onChangeText={(text) => setCampaignValue(text)}
                        onBlur={() => {
                          console.log(
                            "On Blur function is called in  Campaign field"
                          );
                        }}
                      />
                    </Card.Content>
                  </View>
                </View>
              </Card>
            </View>
            <View className="mt-2">
              <Card style={{ backgroundColor: "white", height: "auto" }}>
                <View className="mx-5 mt-2">
                  <Text
                    variant="titleMedium"
                    style={{ color: primaryColor, fontWeight: "bold" }}
                  >
                    Description 2
                  </Text>
                </View>
                <View className="mx-4 mt-1">
                  <Card.Content>
                    <TextInput
                      className="mb-10 bg-white leading-6"
                      placeholder={"Enter Description"}
                      value={description2Value}
                      onChangeText={(text) => setDescription2Value(text)}
                      onBlur={() => {
                        console.log(
                          "On Blur function is called in  Description 2 field"
                        );
                      }}
                      multiline={true}
                    />
                  </Card.Content>
                </View>
              </Card>
            </View>
            <View className="mt-2 mb-2">
              <Card style={{ backgroundColor: "white", height: "auto" }}>
                <View className="mx-5 mt-2">
                  <Text
                    variant="titleMedium"
                    style={{ color: primaryColor, fontWeight: "bold" }}
                  >
                    DIG
                  </Text>
                </View>
                <View className="mx-4 mt-1">
                  <Card.Content>
                    <TextInput
                      multiline={true}
                      className="mb-10 bg-white leading-6"
                      placeholder={"Enter DIG here"}
                      value={digValue}
                      onChangeText={(text) => setDigValue(text)}
                      onBlur={() => {
                        console.log("On Blur function is called in  dig field");
                      }}
                    />
                  </Card.Content>
                </View>
              </Card>
            </View>
          </View>
        </View>
      </ScrollView>
      {successMsg && <SnackBar snackLabel="Ok" snackText={successMsg} />}
    </View>
  );
};

export default LeadDescriptionTab;
