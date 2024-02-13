import { View } from "react-native";
import React from "react";
import AppHeader from "../../components/AppHeader/AppHeader";
import { Tabs, TabScreen, TabsProvider } from "react-native-paper-tabs";
import Tab_SendMail from "./TabScreen/Tab_SendMail";
import ActionTabScreen from "./TabScreen/ActionTabScreen";
import LeadDescriptionTab from "./TabScreen/LeadDescriptionTab";
import { useNavigation, useRoute } from "@react-navigation/native";

const LeadDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { leadData , filterRecordData } = route.params;
  const leadID = leadData?.id;
  const leadEmail = leadData?.email;
  console.log("leadID" , leadID);


  return (
    <View className="flex-1">
      <AppHeader
        barTittle={"Leads"}
        icon={"arrow-left"}
        onPress={() => {
          navigation.goBack()}}/>
      <TabsProvider
        defaultIndex={0}
        // onChangeIndex={handleChangeIndex} optional
      >
        <Tabs
          mode="scrollable"
          style={{ backgroundColor: "#fff" }}
          uppercase={false}
          showLeadingSpace={true}
        >
          <TabScreen label="Actions">
            <ActionTabScreen 
            filterRecordData = {filterRecordData}
            lead_data={leadData}/>
          </TabScreen>
          <TabScreen label="Description">
            <LeadDescriptionTab lead_data={leadData} />
          </TabScreen>
          <TabScreen
            //  icon="mail"
            label="Send Mail"
          >
            <Tab_SendMail leadEmail ={leadEmail} leadID={leadID}/>
          </TabScreen>
        </Tabs>
      </TabsProvider>
    </View>
  );
};

export default LeadDetailScreen;
