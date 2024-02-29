import { View } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import moment from "moment";
import { primaryColor } from "../../constants/constants";
import PropTypes from "prop-types";
import DateTimePicker from "react-native-modal-datetime-picker";

//currently it is only working for date picker not the time
const DatePickerComponent = ({ initialDate,onDateChange}) => {
  const [showDate, setShowDate] = useState(false);

  const onPickedDateHandler = (selectedDate) => {
     if (selectedDate) {
      const currentDate = moment(selectedDate);
      if (currentDate.isValid()) {
        const pickedDate = currentDate.format("YYYY-MM-DD");
        onDateChange(pickedDate);
        // setSaveDate({ ...saveDate, [showDate]: currentDate});
      } else {
        console.log("Invalid date selected");
      }
      setShowDate(false);
    }
  };

  return (
    <View>
       <View>
        <TextInput
          style={{height:50,backgroundColor:"white"}}
          mode="outlined"
          // editable={false} // Prevent manual input
          value={initialDate || "yyyy-mm-dd"}
          right={
            <TextInput.Icon
              icon= 'calendar'
              style={{marginRight:20}}
              size={25}
              color={primaryColor}
              onPress={() => setShowDate(true)}
              
            />
          }
        />
      </View>
      <DateTimePicker
        isVisible={Boolean(showDate)}
        mode='date'
        is24Hour={false}
        onConfirm={onPickedDateHandler}
        onCancel={() => setShowDate(false)}
      />
    </View>
  );
};

DatePickerComponent.propTypes = {
    initialDate: PropTypes.string,
    onDateChange: PropTypes.func.isRequired,
}
   
export default DatePickerComponent;
