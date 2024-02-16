import { useEffect, useState } from "react";
import { Image, ScrollView, View } from "react-native";
import { screenNames } from "../../constants/screenNames";
import ButtonComponent from "../../components/Button/Button";
import { AntDesign } from "@expo/vector-icons";
import {
  Button,
  Caption,
  Headline,
  Paragraph,
  TextInput,
} from "react-native-paper";
import TextInputComponent from "../../components/TextInput/TextInput";
import { LoginFormData } from "./LoginFormData";
import { primaryColor, storageKeys } from "../../constants/constants";
import Logo from "../../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { loginAPI } from "../../api/loginAPI";
import { validateOtpAPI } from "../../api/validateOtpApi/validateOtpApi";
import { resendOtpAPI } from "../../api/ResendOtpApi/resendOtpApi";
import {
  checkFormValidity,
  getValueFromStorage,
  setValueInStorage,
} from ".././../utility/utility";
import SnackBar from "../../components/SnackBar/SnackBar";
import BottomSheet from "../../components/BottomSheet/BottomSheet";
import { setToken } from "../../redux/slices/tokenSlice";
import { setUserData } from  "../../redux/slices/userDataSlice";

const LoginScreen = ({ navigation }) => {
  const [formState, setFormState] = useState({});
  const [LoginError, setLoginError] = useState(null);
  const [loggedInState, setLoggedInState] = useState({});
  const [otpState, setOtpState] = useState(false);
  const [showOTPError, setShowOTPError] = useState(false);
  const dispatch = useDispatch();
  const showSnackBar = useSelector((state) => state.showSnackBar.showSnackBar);


  //getting Email from secure storage.
  useEffect(() => {
    const getValue = async () => {
      const email = await getValueFromStorage(storageKeys.EMAIL_ID);
      // const password = await getValueFromStorage(storageKeys.PASSWORD);
      if ((email)) {
        setFormState({
          ...formState,
          email: { value: email, error: false },
          // password: { value: password, error: false },
        });
      }
    };
    getValue();
  }, []);

  const postLogin = async () => {
    const isFormValid = checkFormValidity(LoginFormData, formState);
    if (isFormValid.formValid) {
      setLoginError(null);
      try {
       const response = await loginAPI(formState);
       console.log("response ====", response);
        
        if (response.tempId) {
          setLoggedInState({
            email: response?.email,
            sname: response?.sname,
            tempId: response?.tempId,
            otp:response?.otp,
          });
          setLoginError(response?.message);
          //wait here for success message in snackbar
          setTimeout(() => {
            setOtpState(true);
          }, 500);
        } else {
          await setValueInStorage(storageKeys.EMAIL_ID, formState.email);
          // const password = JSON.parse(formState?.password?.value); 
          // await setValueInStorage(storageKeys.PASSWORD, password);
          
        }
      } catch (error) {
        //setLoginError(response?.error);
        console.error("Login error:", error);
        // Check if there is an error message in the response
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          const errorMessage = error.response.data.error;
          setLoginError(errorMessage);
        } else {
          setLoginError("Invalid credintial");
        }
      }
    } else {
      // Validate the login form here
      setFormState(isFormValid.state);
    }
  };
  
  const actual_otp = loggedInState.otp;
  const email = loggedInState.email;

  const submitOtp = async () => {
    if (formState["otp"] && formState["otp"].value) {
    
      try {
        const otpResponse = await validateOtpAPI(formState,actual_otp,email);
        //console.log("otpResponse = " , otpResponse);
        const token = otpResponse?.token;
        const status = otpResponse?.success;
        const message = otpResponse?.message;
        const member_id = otpResponse?.member_id?.id;
        if (status) {
          setShowOTPError(false);
          await setValueInStorage(storageKeys.APP_SECURE, token);
          await setValueInStorage(storageKeys.USER_ROLES, loggedInState.sname);
          await setValueInStorage(storageKeys.EMAIL_ID, loggedInState.email);
          await setValueInStorage(storageKeys.MEMBER_ID, JSON.stringify(member_id));
          await setValueInStorage(storageKeys.V_NAME, otpResponse?.member_id?.v_name );
          await setValueInStorage(storageKeys.CONTACT_NO, JSON.stringify(otpResponse?.member_id?.mobile));
            // const passwordString = JSON.stringify(loggedInState.password);
          // await setValueInStorage(storageKeys.PASSWORD,passwordString);
          dispatch(setUserData(otpResponse?.member_id));
          dispatch(setToken(token));
          setShowOTPError(message);
        }
      } catch (error) {
        console.error("Error in submitOtp:", error);
        // Check if there's a response in the error object
        if (error.response) {
          const responseData = error.response?.data;
          const message = responseData?.error;
          // Handle the error or show the message as needed
          setShowOTPError(message);
        } else {
          // Handle other types of errors
          console.error("Unexpected error:", error.message);
          setShowOTPError("Please resend the otp");
        }
      }
    } else {
      setFormState({ ...formState, ["otp"]: { value: "", error: true } });
    }
  };

  // Resend Otp response function
  const otp = loggedInState.otp;
  const handleResendOtp = async () => {
    try {
      const resendotpResponse = await resendOtpAPI(email,otp);
      if (resendotpResponse?.success) {
        setShowOTPError(false)
        setFormState({ ...formState, ["otp"]: { value: "", error: true } });
        setShowOTPError(resendotpResponse?.message);
        // setOtpState(false);
      }
    } catch (error) {
      console.error("Network error:", error.message);
      setShowOTPError(error.message);
      setTimeout(() => {
        setOtpState(false);
      }, 2000);
    }
    setFormState("");
  };

  return (
    <View
      className="flex flex-col flex-1 relative"
      style={{ backgroundColor: primaryColor }}
    >
      <View className="h-52 mt-6 flex justify-center items-center">
        <Image source={Logo} className="w-36 bg-white h-32 mt-6 rounded-3xl" />
      </View>
      <View className="rounded-t-3xl mt-8 bg-white flex-1">
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            paddingLeft: 16,
            paddingRight: 16,
            borderTopRightRadius: 60,
            borderTopLeftRadius: 60,
            borderTopLeftRadius: 20,
          }}
        >
          <View className="flex items-center">
            <Headline
              className="font-bold text-gray-3700"
              style={{ color: primaryColor }}
            >
              ERP Portal
            </Headline>
          </View>
          {LoginFormData.map((data, index) => (
            <View key={index} className="mt-6">
              <TextInputComponent
                value={
                  (formState[data.name] && formState[data.name].value) || ""
                }
                onInputChange={(value) =>
                  setFormState({
                    ...formState,
                    [data.name]: {
                      value: value,
                      error: false,
                    },
                  })
                }
                placeholder={data.placeholder}
                leftIcon={data.leftIcon}
                rightIcon={data.rightIcon}
                error={formState[data.name] && formState[data.name].error}
                label={data.label}
                secureTextEntry={data.secureTextEntry}
              />
            </View>
          ))}
          <View className="mt-5 flex items-center">
            <ButtonComponent
              cssClassName="w-full"
              mode="contained"
              onPress={postLogin}
            >
              SIGN IN
            </ButtonComponent>
          </View>
          <View className="flex m-0 mt-4">
            <View className="m-0">
              <ButtonComponent
                mode="text"
                onPress={() => navigation.navigate(screenNames.FORGOT_PASSWORD)}
              >
                forgot password?
              </ButtonComponent>
            </View>
          </View>
        </ScrollView>
      </View>
      {/* the otp BottomSheet appears here */}
      {otpState && (
        <BottomSheet>
          <View>
            <View className="flex flex-1 items-end">
              <AntDesign
                name="closecircleo"
                size={26}
                color={primaryColor}
                onPress={() => {
                  setOtpState(false);
                }}
              />
            </View>
            <View className="flex flex-1 items-center justify-center">
              <Headline className="font-bold">ERP Portal</Headline>
            </View>
            <View className="flex flex-1 items-center justify-center">
              <Paragraph className="mt-4 font-bold text-xs">
                Enter OTP received on your E-mail
              </Paragraph>
            </View>
            <TextInput
              value={(formState["otp"] && formState["otp"].value) || ""}
              onChangeText={(value) => {
                setFormState({
                  ...formState,
                  ["otp"]: { value: value, error: false },
                });
                setShowOTPError(false);
              }}
              mode="outlined"
              className="mt-4"
              placeholder={"Enter OTP"}
              left={<TextInput.Icon icon={"message-text"} />}
              error={formState["otp"] && formState["otp"].error}
              label={"OTP"}
              keyboardType="numeric"
            />
            {showOTPError && (
              <Caption className="text-red-700 mx-1">{showOTPError}</Caption>
            )}
            <View>
              <ButtonComponent
                cssClassName="w-full mt-6"
                mode="contained"
                onPress={submitOtp}
              >
                Verify OTP
              </ButtonComponent>
              <View className="mb-8">
                <Button onPress={handleResendOtp}> Resend OTP </Button>
              </View>
            </View>
          </View>
        </BottomSheet>
      )}
      {LoginError && <SnackBar snackLabel="Ok" snackText={LoginError} />}
      {showSnackBar && <SnackBar snackLabel="Ok" snackText={showSnackBar} />}
      {/* </LinearGradient> */}
    </View>
  );
};

export default LoginScreen;
