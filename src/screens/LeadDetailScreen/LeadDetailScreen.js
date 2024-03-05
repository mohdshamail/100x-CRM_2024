import { View } from "react-native";
import React, { useState, useEffect } from "react";
import AppHeader from "../../components/AppHeader/AppHeader";
import { Tabs, TabScreen, TabsProvider } from "react-native-paper-tabs";
import Tab_SendMail from "./TabScreen/Tab_SendMail";
import ActionTabScreen from "./TabScreen/ActionTabScreen";
import LeadDescriptionTab from "./TabScreen/LeadDescriptionTab";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getValueFromStorage } from "../../utility/utility";
import { storageKeys } from "../../constants/constants";

const LeadDetailScreen = () => {
  const [mid, setMID] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { leadData, filterRecordData } = route.params;
  const leadID = leadData?.id;
  const leadEmail = leadData?.email;

  const getMemberID = async () => {
    const memberId = await getValueFromStorage(storageKeys.MEMBER_ID);
    if (memberId) {
      setMID(memberId);
    }
  };
  useEffect(() => {
    getMemberID();
  }, []);

  //  console.log("member id == " ,mid);

  return (
    <View className="flex-1">
      <AppHeader
        barTittle={"Leads"}
        icon={"arrow-left"}
        onPress={() => {
          navigation.goBack();
        }}
      />
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
              filterRecordData={filterRecordData}
              lead_data={leadData}
              mid={mid}
            />
          </TabScreen>
          <TabScreen label="Description">
            <LeadDescriptionTab
              filterRecordData={filterRecordData}
              lead_data={leadData}
              mid={mid}
            />
          </TabScreen>
          <TabScreen
            //  icon="mail"
            label="Send Mail"
          >
            <Tab_SendMail leadEmail={leadEmail} leadID={leadID} />
          </TabScreen>
        </Tabs>
      </TabsProvider>
    </View>
  );
};

export default LeadDetailScreen;
