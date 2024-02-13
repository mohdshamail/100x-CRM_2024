import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomNavigationBar from "../CustomNavigationBar/CustomNavigationBar";
import MyLeadParentStack from "../../DrawerItem/MyLeads/MyLeadParentStack";
//import ScholarshipFormScreen from "../../screens/ScholarshipFormScreen/ScholarshipFormScreen";
import ProfileScreen from "../../screens/ProfileScreen/ProfileScreen";
//import HomeScreen from "../../screens/HomeScreen/HomeScreen";
//import LeadDetailScreen from "../../screens/LeadDetailScreen/LeadDetailScreen";
import FilterLead from "../../screens/FilterLead/FilterLead";
// import ActionLeadDetailForm from "../../screens/ActionLeadDetailForm/ActionLeadDetailForm";
import { primaryColor } from "../../constants/constants";

const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
  return (
  <Drawer.Navigator drawerContent={(props) => <CustomNavigationBar {...props} />}
  screenOptions={{ drawerLabelStyle: 
        { marginLeft: -25, 
          fontSize: 15,  
          fontWeight:"500"
        }, 
        drawerActiveTintColor:"white",
        drawerActiveBackgroundColor:primaryColor,
        drawerInactiveTintColor:'#333',
      }}
  >
     <Drawer.Screen  
      name="My Leads" 
      component={MyLeadParentStack}
      options={{
              headerShown: false,
              // drawerIcon: ({ color }) => (
              //   <Ionicons name="book-sharp" color={color} size={22} />
              // ),
            }}
     />
     <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          // drawerIcon: ({ color }) => (
          //   <Ionicons name="person-sharp" color={color} size={22} />
          // ),
        }}
      />
       <Drawer.Screen
        name="Filter"
        component={FilterLead}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Ionicons name="filter-sharp" color={color} size={22} />
          ),
        }}
      />
  </Drawer.Navigator>
    // <Drawer.Navigator
    //   drawerContent={(props) => <CustomNavigationBar {...props} />}
    //   initialRouteName="My Leads"
    //   screenOptions={{ drawerLabelStyle: 
    //     { marginLeft: -25, 
    //       fontSize: 15,  
    //       fontWeight:"500"
    //     }, 
    //     drawerActiveTintColor:"white",
    //     drawerActiveBackgroundColor:primaryColor,
    //     drawerInactiveTintColor:'#333',
    //   }}
    // >
    //   <Drawer.Screen
    //     name="My Leads"
    //     component={MyLeadParentStack}
    //     options={{
    //       headerShown: false,
    //       drawerIcon: ({ color }) => (
    //         <Ionicons name="book-sharp" color={color} size={22} />
    //       ),
    //     }}
    //   />
    //   <Drawer.Screen
    //     name="Profile"
    //     component={ProfileScreen}
    //     options={{
    //       headerShown: false,
    //       drawerIcon: ({ color }) => (
    //         <Ionicons name="person-sharp" color={color} size={22} />
    //       ),
    //     }}
    //   />
    //   {/* <Drawer.Screen
    //     name="Home"
    //     component={HomeScreen}
    //     options={{
    //       headerShown: false,
    //       drawerIcon: ({ color }) => (
    //         <Ionicons name="home" color={color} size={22} />
    //       ),
    //     }}
    //   /> */}
      
    //   {/* <Drawer.Screen
    //     name="Leads-Details"
    //     component={LeadDetailScreen}
    //     options={{
    //       headerShown: false,
    //       drawerIcon: ({ color }) => (
    //         <Ionicons name="settings-sharp" color={color} size={22} />
    //       ),
    //     }}
    //   /> */}
    //   {/* <Drawer.Screen
    //     name="Filter"
    //     component={FilterLead}
    //     options={{
    //       headerShown: false,
    //       drawerIcon: ({ color }) => (
    //         <Ionicons name="filter-sharp" color={color} size={22} />
    //       ),
    //     }}
    //   /> */}
    //   {/* <Drawer.Screen
    //     name="Scholarship Form"
    //     component={ScholarshipFormScreen}
    //     options={{
    //       headerShown: false,
    //       drawerIcon: ({ color }) => (
    //         <Ionicons name="settings-sharp" color={color} size={22} />
    //       ),
    //     }}
    //   /> */}
    //   {/* <Drawer.Screen
    //     name="ActionLeadDetailForm"
    //     component={ActionLeadDetailForm}
    //     options={{
    //       headerShown: false,
    //       drawerIcon: ({ color }) => (
    //         <Ionicons name="build-sharp" color={color} size={22} />
    //       ),
    //     }}
    //   /> */}
    // </Drawer.Navigator>
  );
};

export default DrawerNavigation;
