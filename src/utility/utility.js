import * as SecureStore from "expo-secure-store";
import {storageKeys} from '../constants/constants'
import {store} from '../redux/store';
import { setToken } from "../redux/slices/tokenSlice";
import {removeUserData} from '../redux/slices/userDataSlice'
import {showSnackBar} from '../redux/slices/showSnackBarSlice'
import axios from "axios";


//this function provides token that store in secure store
export const getValueFromStorage = async (key) => {
    let result = await SecureStore.getItemAsync(key);
    return result;
  };
  //this function store token in secure storage in encripted form
  export const setValueInStorage = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
  };
  //this function remove or destroy token in secure storage
  export const removeValueFromStorage = async (key) => {
    await SecureStore.deleteItemAsync(key);
  };

//function for logout from the app
export const doLogout = async () => {
  const { dispatch } = store;
  await removeValueFromStorage(storageKeys.APP_SECURE);
  await removeValueFromStorage(storageKeys.USER_ROLES);
  dispatch(setToken(null));
  dispatch(removeUserData());
  dispatch(showSnackBar("Logout Successfully!"))
  };

  export const getDataFromKey = (keys, obj, shouldSendObject = false) => {
    const keyArray = keys.split(".");
    const keyArrayLength = keyArray.length;
    let value = null;
  
    keyArray.map((key, index) => {
      if (shouldSendObject && index === keyArrayLength - 1) {
        if (value && value[key] && value[key][0]) {
          value = value[key];
        } else if (obj[key] && obj[key][0]) {
          value = obj[key];
        }
      } else {
        if (value && value[key] && value[key][0]) {
          value = value[key][0];
        } else if (obj[key] && obj[key][0]) {
          value = obj[key][0];
        }
      }
    });
  
    return value;
  };
  

  //checking formValidity in utility function
  export const checkFormValidity = (formData, formState) => {
    let formValid = true;
    let dummyFormState = { ...formState };
  
    formData.map((data) => {
      if (!(formState[data.name] && formState[data.name].value)) {
        formValid = false;
        dummyFormState = {
          ...dummyFormState,
          [data.name]: { value: "", error: true },
        };
      }
    });
  
    return { formValid, state: dummyFormState };
  };

 

//  export const getSelectListValues = (obj) => {
//   let finalResult = [];
//   if (obj.length === 0 || !obj) {
//     return null;
//   }
//   obj.map((data) => {
//     let temp = {};
//     Object.keys(data).map((keyValue) => {
//       temp = { ...temp, [keyValue]: data[keyValue] && data[keyValue][0] };
//     });
//     finalResult.push(temp);
//   });

//   let dorpDownList = [];
//   finalResult.map((item) => {
//     dorpDownList.push({key: item.Text, value: item.Value, });
//   });
// //  Reverse the order of the value and label properties in the dorpDownList array
//      dorpDownList.forEach((item) => {
//     [item.value, item.key] = [item.key, item.value];
// });
//   return dorpDownList;
// }; 

 //data for filters forms 
export const getDropdownValues = (obj) => {
  if (obj.length === 0 || !obj) {
    return null;
  }
  const dropdownData = obj.map(label => ({
    label,
    value: label,
  }));
  return dropdownData;
}

export const getCourseListData = (obj) => {
  let finalResult = [];

  if (!obj || obj.length === 0) {
    return null;
  }

  obj.forEach((data) => {
    let temp = {};
    Object.keys(data).forEach((keyValue) => {
      temp = { ...temp, [keyValue]: data[keyValue] };
    });
    finalResult.push(temp);
  });

  let dropDownList = finalResult.map((item) => ({
    label: item.course_name,
    value: item.crm_course_id
  }));
    return dropDownList;
  }; 

//hiding last four digits of mobile number
export function hideLastFourDigits(mobileNumber, countryCode) {
  if (typeof mobileNumber !== 'string' || mobileNumber.length !== 10) {
    return null;
  }

  const lastFourDigits = mobileNumber.slice(-4);
  let hiddenNumber;

  if (countryCode == +91 || countryCode == 91 || countryCode === 'IND' || countryCode === null) {
    hiddenNumber = mobileNumber.replace(lastFourDigits, 'XXXX');
  } else {
    hiddenNumber = mobileNumber;
  }

  return hiddenNumber;
}



//this ozonetel calling function 
export const customerCall = async (uid, cn, mob) => {
  const url = `https://in1-ccaas-api.ozonetel.com/CAServices/AgentManualDial.php?api_key=KK58c5bb5d513bdd3089cd083b5c610745&username=henryharvin&agentID=${uid}&campaignName=${cn}&customerNumber=${mob}&UCID=true&uui=CallFromCRM`;
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
    // console.log(response);
    alert(response?.data);
  } catch (error) {
    console.error('Error:', error);
    // Handle error here
    console.log("Api error = ",error);
  }
}; 


export function formatDate(inputDate) {
  if(!inputDate || inputDate === null ||inputDate === false || inputDate === undefined){
    return null;
  }
  // Split the input date string into its components
  const [datePart, timePart] = inputDate.split(' ');
  const [day, month, year] = datePart.split('-');
  const [hour, minute] = timePart.split(':');

  // Construct a new Date object with the components
  const parsedDate = new Date(year, month - 1, day, hour, minute);

  // Get the components from the parsed date
  const formattedYear = parsedDate.getFullYear();
  const formattedMonth = String(parsedDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const formattedDay = String(parsedDate.getDate()).padStart(2, '0');
  const formattedHour = String(parsedDate.getHours()).padStart(2, '0');
  const formattedMinute = String(parsedDate.getMinutes()).padStart(2, '0');

  // Construct the formatted date string
  const formattedDateString = `${formattedYear}-${formattedMonth}-${formattedDay}T${formattedHour}:${formattedMinute}`;

  return formattedDateString;
}

// Example usage
const inputDate = "13-02-2024 04:07";
const formattedDate = formatDate(inputDate);
console.log(formattedDate); // Output: "2024-02-13T04:07"
