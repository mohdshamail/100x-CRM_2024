import { View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import {
  Avatar,
  Divider,
  Button,
  Headline,
  Subheading,
} from "react-native-paper";
import { doLogout } from "../../utility/utility";
import { primaryColor } from "../../constants/constants";

const Profile = ({ navigation }) => {
  const userData = useSelector((state) => state.userData.userData);
  return (
    <View className="flex flex-1">
      <View className="flex flex-1 items-center my-5 rounded-full overflow-hidden">
        {typeof userData.empImage !== "object" && (
          <Avatar.Image
            size={100}
            source={{ uri: userData.empImage }}
            className="rounded-full"
          />
        )}
      </View>
      <View className="items-center">
        <Headline className="font-bold">{userData.empName}</Headline>
      </View>
      <View className="items-center">
        <Subheading>{userData.empDesignation}</Subheading>
      </View>
      <Divider className="my-8 border-2 border-gray-300" />
      <View>
      <View className="px-3">
       
       <Button
         icon="key-change"
         onPress={() =>
             navigation.navigate(screenNames.CHANGE_PASSWORD, {
             screenName: "Change Password",
         })}
         mode="contained"
         className=" border-1 rounded mt-5"
         style={{ borderColor: primaryColor }}
       >
         Change Password
       </Button>
    
 
       <Button
         icon="logout"
         onPress={() => doLogout()}
         mode="contained"
         className=" border-1 rounded mt-5"
         style={{ borderColor: primaryColor }}
       >
         Log Out
       </Button>
     </View>
      </View>
    </View>
  );
};

export default Profile;
