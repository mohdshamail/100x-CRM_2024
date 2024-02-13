import "react-native-gesture-handler";
import React, { useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { primaryColor } from "../../constants/constants";
import {
  Text,
  Avatar,
  IconButton,
  Title,
  Caption,
  Drawer,
} from "react-native-paper";
import SnackBar from "../SnackBar/SnackBar";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { doLogout } from "../../utility/utility";
import { useSelector } from "react-redux";
import Loader  from '../Loader/Loader';
import { useNavigation } from "@react-navigation/native";

const CustomNavigationBar = (props) => {
  const userdata = useSelector((state) => state.userData.userData);
  const [successMsg, setSuccessMsg] = useState(null);
  const navigation = useNavigation();

  const helpAndFeedBackHandler = () => {
    setSuccessMsg("Please contact Tech Department");
    setTimeout(() => {
      setSuccessMsg(false); // Reset successMsg to false after three seconds
    }, 3000);
  };

  return (
    <View style={{ flex:1 }}> 
    <DrawerContentScrollView
      {...props}
      // contentContainerStyle={{ backgroundColor: primaryColor }}
    >
      {!userdata && <Loader />} 
      <View style={styles.drawerContent}>
        <ImageBackground
          source={require("../../../assets/drawer-bg.jpg")}
          style={{ padding: 20 }}
        >
          <View style={styles.userInfoSection}>
            <Avatar.Image
              size={70}
              source={require("../../../assets/avtar.png")}
            />
            <Title style={styles.title}>
            {userdata ? userdata?.v_name : "Name" }
            </Title>
            <View style={styles.row}>
              <View style={styles.section}>
                <Caption style={styles.caption}>
                {userdata ? userdata?.whatsapp_number : "contact No."}
                  </Caption>
              </View>
              <View style={styles.section}>
                <IconButton
                  style={{ marginBottom: 1, marginTop: -1 }}
                  icon="circle"
                  iconColor={userdata?.lswsheets_count === 0 ? "red" : "green"}
                  size={18}
                />
                <IconButton
                  style={{ marginBottom: 1, marginTop: -8 }}
                  icon="chevron-down"
                  iconColor={"white"}
                  size={30}
                  onPress={() => {navigation.navigate("Profile")} }
                />
              </View>
            </View>
          </View>
        </ImageBackground>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color,focused, size }) => (
              <MaterialCommunityIcons name="tune" 
               color={focused ? primaryColor : color}
               size={size} />
            )}
            label="My-Leads"
            onPress={() => {navigation.navigate('My Leads')}}
          />
           <DrawerItem
            icon={({ color,focused, size }) => (
              <MaterialCommunityIcons
                name="account-outline"
                size={size}
                color={focused ? primaryColor : color}
              />
            )}
            label="Profile"
            onPress={() => {navigation.navigate("Profile")}}
          />
          <DrawerItem
            icon={({ color, size,focused }) => (
              <MaterialCommunityIcons
                name="filter-outline"
                color={focused ? primaryColor : color}
                size={size}
              />
            )}
            label="Lead-Filter"
            onPress={() => {navigation.navigate("Filter")}}
          />
        </Drawer.Section>
       
        <View
        style={{ padding: 20,}}
      >
        <View className="flex-row justify-between">
            <TouchableOpacity
              onPress={() => {
                doLogout();
              }}
              style={{ paddingVertical: 10 }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="power" color={primaryColor} size={22} />
                <Text style={{ fontSize: 15, marginLeft: 3,color:'black',fontWeight:600 }}
                >Logout</Text>
              </View>
            </TouchableOpacity>
          <View className="mt-3">
            <Text style={{ fontStyle: "italic" }}>Ver: 1.0.0</Text>
          </View>
        </View>
          <TouchableOpacity  style={{ paddingVertical: 15 }}
           onPress={helpAndFeedBackHandler}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="information-circle-outline"
                color={primaryColor}
                size={22}
              />
              <Text
                style={{ fontSize: 15, marginLeft: 5, fontStyle: "italic" }}
              >
                Help and feedback
              </Text>
            </View>
          </TouchableOpacity>
      </View> 
      </View>
    </DrawerContentScrollView>
    {successMsg && <SnackBar snackLabel="Ok" snackText={successMsg} />}
    </View>
  );
};

export default CustomNavigationBar;
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 10,
    // marginTop:1,
  },
  title: {
    marginTop: 10,
    fontWeight: "bold",
    color: "white",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: "white",
  },
  row: {
    marginTop: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 10,
    backgroundColor: "white",
    
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
});
