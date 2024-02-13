import { View } from "react-native";
import React from "react";

const BottomSheet = ({ children }) => {
  return (
  
    <View   
    className="absolute w-full h-full">
      <View className="bg-black opacity-80 w-full h-full z-10" />
      <View className="bg-white p-5 z-50 rounded-t-3xl absolute bottom-0 w-full">
        {children}
      </View>
    
    </View>
  
  );
};

export default BottomSheet;
