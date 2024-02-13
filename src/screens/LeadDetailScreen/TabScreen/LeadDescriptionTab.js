import React from "react";
import { View, TouchableOpacity,TextInput,StyleSheet } from "react-native";
import { Icon, Avatar, Tooltip, Card, Button, Text,Portal,Modal, Headline, Divider, } from "react-native-paper";
import { ScrollView,  } from "react-native-gesture-handler";
import { primaryColor } from "../../../constants/constants";
import SnackBar from "../../../components/SnackBar/SnackBar";
// import DataTableComponent from "../../../components/DataTable/DataTableComponent";

const LeadDescriptionTab = ({lead_data}) => {
  const [selected, setSelected] = React.useState("");
  const [visible_1, setVisible_1] = React.useState(false);
  const [visible_2, setVisible_2] = React.useState(false);
  const [visible_3, setVisible_3] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState(null);
  // const [showtableLeadSource, setShowtableLeadSource] = React.useState(false);

  const showModal_1 = () => setVisible_1(true);
  const hideModal_1 = () => setVisible_1(false);
  const showModal_2 = () => setVisible_2(true);
  const hideModal_2 = () => setVisible_2(false);
  const showModal_3 = () => setVisible_3(true);
  const hideModal_3 = () => setVisible_3(false);
  const containerStyle = {backgroundColor: 'white', padding: 20,borderRadius:12};

 
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
  ]

  const handleMsg = () => {
    setSuccessMsg("This feature will be available soon");
    setTimeout(() => {
      setSuccessMsg(false);
    }, 3000);
  } 


  return (
    <View className="flex-1 mt-3">
      <ScrollView  showsVerticalScrollIndicator={false} >
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
                    <Button
                      mode="contained"
                      onPress={ handleMsg }
                    >
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
                  {lead_data?.profession ? lead_data?.profession:"no record found!"}
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
                  {lead_data?.id ? lead_data?.id:"no record found!"}
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
                  {lead_data?.last_update_date_time ? lead_data?.last_update_date_time:"no record found!"}
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
                  <Text variant="titleMedium" className="mx-2">
                   {lead_data?.pending_amount ? lead_data?.pending_amount: "No record Found"}
                  </Text>
                </View>
              </Card>
            </View>
            <View className="mt-2">
              <Card style={{ backgroundColor: "white", height: 100 }}>
                <View className="mx-5 mt-2">
                  <Text
                    variant="titleMedium"
                    style={{ color: primaryColor, fontWeight: "bold" }}
                  >
                    Customer Support History
                  </Text>
                  <Text variant="titleMedium" className="mx-2">
                    No History.
                  </Text>
                </View>
              </Card>
            </View>

            {/* textinput model opening in Description card */}
            <View className='flex-1'>
             <Portal className="rounded-lg">
             <Modal className='mx-8'
              visible={visible_1} onDismiss={hideModal_1} contentContainerStyle={containerStyle}>
                <View>
               <Headline className='text-center font-bold'>Add Description</Headline>
               <Divider/>
               <View className='mt-4'>
               <TextInput 
                multiline
                numberOfLines={4}
                style={styles.textInput}
               />
               </View>
               <View className="flex-row justify-end mt-2">
               <Button mode="outlined" onPress={hideModal_1}
               >Close</Button>
               <Button mode="contained" className='mx-2 px-1'
               >Add</Button>
                </View>
               </View>   
            </Modal>
           </Portal>
            </View>
            <View className="mt-2">
              <Card style={{ backgroundColor: "white", height: 100 }}>
                <View className="flex-row justify-between mx-5 mt-2">
                  <View>
                    <Text
                      variant="titleMedium"
                      style={{ color: primaryColor, fontWeight: "bold" }}
                    >
                      Description
                    </Text>
                  </View>
                  <View>
                    <Tooltip title="Add New" enterTouchDelay={100}>
                      <TouchableOpacity
                        onPress={showModal_1}
                      >
                        <Avatar.Icon size={40} icon="pencil" />
                      </TouchableOpacity>
                    </Tooltip>
                  </View>
                </View>
                <View className="mx-8">
                  <Text className="">Date , Time, Busy Now</Text>
                </View>
              </Card>
            </View>
            {/* modal for lead Revival comments */}
            <View className='flex-1'>
             <Portal>
             <Modal className='mx-8'
              visible={visible_2} onDismiss={hideModal_2} contentContainerStyle={containerStyle}>
               <View>
               <Headline className='text-center font-bold'>Add Lead Revival Comment</Headline>
               <Divider/>
               <View className='mt-4'>
               <TextInput 
                multiline
                numberOfLines={4}
                style={styles.textInput}
               />
               </View>
               <View className="flex-row justify-end mt-2">
               <Button mode="outlined" onPress={hideModal_2}
               >Close</Button>
               <Button mode="contained" className='mx-2 px-1'
               >Add</Button>
                </View>
               </View>   
            </Modal>
           </Portal>
            </View>


            {/* lead revival_comment */}
            <View className="mt-2">
              <Card style={{ backgroundColor: "white", height: 100 }}>
                <View className="flex-row justify-between mx-5 mt-2">
                  <View>
                    <Text
                      variant="titleMedium"
                      style={{ color: primaryColor, fontWeight: "bold" }}
                    >
                      Lead Revival Comment
                    </Text>
                  </View>
                  <View>
                    <Tooltip title="Add New" enterTouchDelay={100}>
                      <TouchableOpacity
                        onPress={showModal_2}>
                        <Avatar.Icon size={40} icon="pencil" />
                      </TouchableOpacity>
                    </Tooltip>
                  </View>
                </View>
                <View className="mx-6">
                  <Text className="">
                  {lead_data?.revival_comment ? lead_data?.revival_comment: "no comment"}</Text>
                </View>
              </Card>
            </View>

            {/* modal for Product Comment */}
            <View className='flex-1'>
             <Portal className="rounded-lg">
             <Modal className='mx-8'
              visible={visible_3} onDismiss={hideModal_3} contentContainerStyle={containerStyle}>
               <View>
               <Headline className='text-center font-bold'>Add Product Comment</Headline>
               <Divider/>
               <View className='mt-4'>
               <TextInput 
                multiline
                numberOfLines={4}
                style={styles.textInput}
               />
               </View>
               <View className="flex-row justify-end mt-3">
               <Button mode="outlined" onPress={hideModal_3}
               >Close</Button>
               <Button mode="contained" className='mx-2 px-1'
               >Add</Button>
                </View>
               </View>   
            </Modal>
           </Portal>
            </View>
            <View className="mt-2">
              <Card style={{ backgroundColor: "white", height: 100 }}>
                <View className="flex-row justify-between mx-5 mt-2">
                  <View>
                    <Text
                      variant="titleMedium"
                      style={{ color: primaryColor, fontWeight: "bold" }}
                    >
                      Product Comment
                    </Text>
                  </View>
                  <View>
                    <Tooltip title="Add New" enterTouchDelay={100}>
                      <TouchableOpacity onPress={showModal_3}>
                        <Avatar.Icon size={40} icon="pencil"/>
                      </TouchableOpacity>
                    </Tooltip>
                  </View>
                </View>
                <View className="mx-6">
                  <Text className="">
                  {lead_data?.product_comment ? lead_data?.product_comment: "null"}
                    </Text>
                </View>
              </Card>
            </View>
            {/* text area cards  for comments or edit purpose only*/}

            <View className="mt-2">
              <Card style={{ backgroundColor: "white", height: 100 }}>
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
                        placeholder={lead_data?.campaign_updated_at}
                        className="h-12 bg-slate-100"
                      />
                    </Card.Content>
                  </View>
                </View>
              </Card>
            </View>
            <View className="mt-2">
              <Card style={{ backgroundColor: "white", height: 100 }}>
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
                    <TextInput className="h-12 bg-slate-100" 
                    placeholder={lead_data?.description2 ? lead_data?.description2: ""}
                    multiline={true} />
                  </Card.Content>
                </View>
              </Card>
            </View>
            <View className="mt-2 mb-2">
              <Card style={{ backgroundColor: "white", height: 100 }}>
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
                    <TextInput multiline={true} className="h-12 bg-slate-100"
                     placeholder={lead_data?.dig ? lead_data?.dig: ""}
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

  styles = StyleSheet.create({
    textInput: {
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 8,
      padding:25
    },
  })
