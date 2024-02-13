import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import { primaryColor } from "../../constants/constants";



const MultiSelectComponent = ({data,selected,setSelected,placeholder}) => {
  
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <MultiSelect
        style={[
          styles.dropdown,
          isFocus && { borderColor: primaryColor, borderWidth: 2 },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        search
        data={data}      //by passing through prop
        labelField="label"
        valueField="value"
        placeholder= {placeholder || "--select--"}
        searchPlaceholder="Search"
        value={selected}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setSelected(item); // by passing through prop
          setIsFocus(false);
        }}
        selectedStyle={styles.selectedTextStyle}
      />
    </View>
  );
};

export default MultiSelectComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "rgba(28,27,31,1)",
    borderWidth: 0.8,
    borderRadius: 5,
    paddingHorizontal: 20,
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: "sans-serif",
    color: "rgba(28,27,31,1)",
    lineHeight: 19.2,
    letterSpacing: 0.15,
    borderRadius: 15,
    borderColor: primaryColor,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: primaryColor,
    fontFamily: "sans-serif",
    lineHeight: 19.2,
    letterSpacing: 0.15,
  },
  iconStyle: {
    width: 25,
    height: 25,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: primaryColor,
    borderColor: primaryColor,
  },
});
