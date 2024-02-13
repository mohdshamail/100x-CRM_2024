import { View } from "react-native";
import React from "react";
import { DataTable, Text, Headline } from "react-native-paper";
import { primaryColor } from "../../constants/constants";
import { ScrollView } from "react-native-gesture-handler";

const DataTableComponent = ({data , tableTitle}) => {
  const headers = ["#", "Value", "Date"];
 
  return (
    <ScrollView>
      <View className="flex-1 mt-2">
        <View className="flex flex-1 items-center justify-center">
          <Headline className="font-bold"style={{color:primaryColor}}
          >{tableTitle}</Headline>
        </View>
        <DataTable style={{ borderWidth: 1, borderColor: "#ddd",marginTop:10 }}>
          <DataTable.Header>
            {headers.map((header) => (
              <DataTable.Title key={header}>
                <Text variant="titleMedium" style={{ color: primaryColor }}>
                  {header}
                </Text>
              </DataTable.Title>
            ))}
          </DataTable.Header>

          { data.length > 0 ?  (data.map((row) => (
            <DataTable.Row key={row.sno}>
              <DataTable.Cell>{row.sno}</DataTable.Cell>
              <DataTable.Cell>{row.name}</DataTable.Cell>
              <DataTable.Cell>{row.date}</DataTable.Cell>
            </DataTable.Row>
          ))) :
          <View style={{ alignItems: "center", marginTop: 20,marginBottom:20 }}>
          <Text style={{ color: primaryColor }}>No results found!</Text>
        </View>
        }
        </DataTable>
      </View>
    </ScrollView>
  );
};

export default DataTableComponent;
