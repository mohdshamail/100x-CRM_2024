import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { primaryColor } from "../../constants/constants";

// pass the array of objects in data prop and value ,isFocus prop to DropDownPicker component
const DropDownComponent = ({ data, value, setValue, search,placeholder,}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && { borderColor: primaryColor, borderWidth: 2 },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        optionStyle={isFocus ? styles.focusedOptionStyle : null} // Apply focused styles when the modal is open
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data} //[{obj},{obj}...]
        search={search} //true/false type
        mode="auto"
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder= {placeholder || "--select--"}
        searchPlaceholder="Search"
        value={value} //current value
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        //setIsFocus(false)
        onChange={(item) => {
          setValue(item.value); //setState function
            setIsFocus(false);
          // console.log("hello beta ")
        }}
      />
    </View>
  );
};

export default DropDownComponent;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  dropdown: {
    height: 50,
    borderColor: "rgba(28,27,31,1)",
    borderWidth: 0.8,
    borderRadius: 5,
    paddingHorizontal: 20,
    backgroundColor:"white",
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: "sans-serif",
    color: "rgba(28,27,31,1)",
    lineHeight: 19.2,
    letterSpacing: 0.15,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontSize: 16,
    color: "rgba(28,27,31,1)",
    fontFamily: "sans-serif",
    lineHeight: 19.2,
    letterSpacing: 0.15,
  },
  focusedOptionStyle: {
   color:primaryColor
  } ,
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
