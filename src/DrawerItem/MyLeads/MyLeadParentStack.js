import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyLeadsScreen from "../../screens/MyLeadsScreen/MyLeadsScreen";
import LeadDetailScreen from "../../screens/LeadDetailScreen/LeadDetailScreen";
import LeadsScreen from "../../screens/LeadsScreen/LeadsScreen";
import FilterLead from "../../screens/FilterLead/FilterLead";
import ScholarshipFormScreen from "../../screens/ScholarshipFormScreen/ScholarshipFormScreen";
import ActionLeadDetailForm from "../../screens/ActionLeadDetailForm/ActionLeadDetailForm";
import DataTableComponent from '../../components/DataTable/DataTableComponent';
import PaymentLinkScreen from '../../screens/PaymentLinkScreen/PaymentLinkScreen';


const Stack = createStackNavigator();
const MyLeadParentStack = () => {
  return (
    <Stack.Navigator initialRouteName={"myLeadScreen"}>
      <Stack.Group
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={"myLeadScreen"} component={MyLeadsScreen} />
        <Stack.Screen name={"LeadsScreen"} component={LeadsScreen} />
        <Stack.Screen name={"LeadDetails"} component={LeadDetailScreen} />
        <Stack.Screen name={"FilterLead"} component={FilterLead} />
        <Stack.Screen name={"DataTableComponent"} component={DataTableComponent} />
        <Stack.Screen
          name={"ScholarshipFormScreen"}
          component={ScholarshipFormScreen}
        />
        <Stack.Screen
          name={"ActionLeadDetailForm"}
          component={ActionLeadDetailForm}
        />
        <Stack.Screen
          name={"PaymentLinkScreen"}
          component={PaymentLinkScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MyLeadParentStack;
