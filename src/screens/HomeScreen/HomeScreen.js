import { View } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Button,Text,Headline,Paragraph } from "react-native-paper";
import DataTableComponent from "../../components/DataTable/DataTableComponent";
import { primaryColor } from "../../constants/constants";
import AppHeader from "../../components/AppHeader/AppHeader";
// import BottomSheet from "../../components/BottomSheet/BottomSheet";
import SnackBar from "../../components/SnackBar/SnackBar";


const HomeScreen = ({ navigation }) => {
  const[snackText , setSnackText] = useState(null);
  const handleOpenDrawer = () => navigation.toggleDrawer();
  const handleopenMenu = () => console.log("open menu by three dots");
  const title = `Home`;
  const showSnackBar = () => {
    setSnackText("this is snacktext");
    setTimeout(() => {
      setSnackText(null); // Reset the snackText after some time
    }, 3000); // Adjust the time as per your requirement
  };


  const data = [
    { sno: 1, name: "Alice", date: "2023-11-21" },
    { sno: 2, name: "Bob", date: "2023-12-05" },
    { sno: 11, name: "Alice", date: "2023-11-21" },
    { sno: 22, name: "Bob", date: "2023-12-05" },
    { sno: 14, name: "Alice", date: "2023-11-21" },
    { sno: 26, name: "Bob", date: "2023-12-05" },
    { sno: 18, name: "Alice", date: "2023-11-21" },
    { sno: 221, name: "Bob", date: "2023-12-05" },
    { sno: 12, name: "Alice", date: "2023-11-21" },
    { sno: 27, name: "Bob", date: "2023-12-05" },
    { sno: 177, name: "Alice", date: "2023-11-21" },
    { sno: 277, name: "Bob", date: "2023-12-05" },
    { sno: 14445, name: "Alice", date: "2023-11-21" },
    { sno: 244, name: "Bob", date: "2023-12-05" },
    { sno: 214, name: "Bob", date: "2023-12-05" },
    { sno: 2404, name: "Bob", date: "2023-12-05" },
    { sno: 2425, name: "Bob", date: "2023-12-05" },
    { sno: 290, name: "Bob", date: "2023-12-05" },
    { sno: 2094, name: "Bob", date: "2023-12-05" },
    { sno: 944, name: "Bob", date: "2023-12-05" },
    { sno: 744, name: "Bob", date: "2023-12-05" },
    // ... more data
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <AppHeader
        icon={"format-align-left"}
        onPress={handleOpenDrawer}
        barTittle={title}
        showMenuButton={true}
        handleopenMenu={handleopenMenu}
      />
      <View style={{ flex: 1, marginTop: 10 }}>
      {/* <DataTableComponent data={data} tableTitle={"My Leads Screen"} /> */}
      <Button onPress={showSnackBar}>Show SnackBar</Button>
      {snackText && <SnackBar snackLabel="Ok" snackText={snackText} />}
        {/* <BottomSheet>
                   <View>
            <View className="flex flex-1 items-end">
              <AntDesign
                name="closecircleo"
                size={26}
                color={primaryColor}
                onPress={() => { }}
              />
            </View>
            <View className="flex flex-1 items-center justify-center">
              <Headline className="font-bold">LEAD QUALITY List</Headline>
            </View>
           <View>
         
           <DataTableComponent />

           </View>
          </View>
         
        </BottomSheet> */}
      </View>
    </View>
  );
};

export default HomeScreen;
