import { useEffect, useState } from "react";
import { View, ScrollView, Image } from "react-native";
import { Headline, HelperText, Card, Text, Button } from "react-native-paper";
import ButtonComponent from "../../components/Button/Button";
import TextInputComponent from "../../components/TextInput/TextInput";
import { primaryColor, storageKeys } from "../../constants/constants";
import Logo from "../../../assets/logo.png";
import SnackBar from "../../components/SnackBar/SnackBar";
import DialogComponent from "../../components/Dialog/Dialog";
import BottomSheet from "../../components/BottomSheet/BottomSheet";
// import { ChangePasswordByUserIdAPI } from "../../api/ChangePasswordByUserIdAPI/ChangePasswordByUserIdAPI";
import {
  checkFormValidity,
  getDataFromKey,
  getValueFromStorage,
} from "../../utility/utility";
import {
  changePasswordFormData,
  ForgotPasswordFormData,
} from "./ForgotpasswordFormdata";
import { forgotPasswordAPI } from "../../api/ForgotPasswordAPI/forgotPasswordAPI";

const ForgotPassword = ({ navigation }) => {
  const [formState, setFormState] = useState({});
  const [changePasswordFormState, setChangePasswordFormState] = useState({});
  const [chagnePasswordSheet, setChagnePasswordSheet] = useState(false);
  const [chagnePasswordError, setChagnePasswordError] = useState(false);
  const [resetPasswordError, setResetPasswordError] = useState(false);
  const [confirmationDialog, setConfirmationDialog] = useState(false);

  useEffect(() => {
    const getValue = async () => {
      const email = await getValueFromStorage(storageKeys.EMAIL_ID);
      if (email) {
        setFormState({
          ...formState,
          email: { value: email, error: false },
        });
      }
    };
    getValue();
  }, []);
  // console.log(formState);
  //reset Password function//
  const resetPassword = async () => {
    const isFormValid = checkFormValidity(ForgotPasswordFormData, formState);
    if (isFormValid.formValid) {
      setResetPasswordError(false);
      try {
        const data = await forgotPasswordAPI(formState);
        if (data) {
          setResetPasswordError(data.message);
         // setChagnePasswordSheet(data.message);
        }
      } catch (error) {
        //handle error is pending
        console.log(error);
      }
    } else {
      setFormState(isFormValid.state);
    }
    //Update Password function Update the Password of App.
    const updatePassword = async () => {
      const isFormValid = checkFormValidity(
        changePasswordFormData,
        changePasswordFormState
      );
      if (isFormValid.formValid) {
        setChagnePasswordError(false);
        const data = await ChangePasswordByUserIdAPI({
          ...formState,
          ...changePasswordFormState,
        });
      
        if (message && !message.includes("successfully")) {
          setChagnePasswordError(message);
        } else {
          setConfirmationDialog(message);
        }
      } else {
        setChangePasswordFormState(isFormValid.state);
      }
    };

    const confimartionClose = () => {
      setConfirmationDialog(false);
      navigation.navigate(screenNames.LOGIN);
    };

    const renderError = (error) => {
      const errorDOM = error.split("\\n");
      return (
        <View className="mt-2">
          {errorDOM.map((data, index) => {
            return (
              <Text key={index} className="text-red-500 text-xs">
                {data}
              </Text>
            );
          })}
        </View>
      );
    };
  };

  return (
    <View
      className="flex flex-col flex-1 relative "
      style={{ backgroundColor: primaryColor }}
    >
      <View className="h-52 mt-12 flex justify-center items-center">
        <Image
          source={Logo}
          className="w-36 bg-slate-50 justify-center items-center h-32  rounded-3xl"
        />
      </View>
      <View className="rounded-t-3xl bg-white flex-1">
        <ScrollView
          contentContainerStyle={{
            // flexGrow:1,
            justifyContent: "center",
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <View className="flex items-center">
            <Headline
              className="font-bold"
              style={{ color: primaryColor, paddingBottom: 9, marginTop: 50 }}
            >
              FORGOT PASSWORD
            </Headline>
            <Card>
              <Card.Content>
                <Text variant="bodyMedium" style={{ color: primaryColor }}>
                  Forgot your password? No problem. Just let us know your email
                  address and we will email you a password reset link that will
                  allow you to choose a new one.
                </Text>
              </Card.Content>
            </Card>
          </View>
          {ForgotPasswordFormData.map((data, index) => (
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
              mode="contained"
              cssClassName="w-full"
              onPress={resetPassword}
            >
              Reset Password
            </ButtonComponent>
           {/* <View className='mt-2'>
           <Button onPress={()=>{console.log("in Change Password!!")}}
           >Change Password</Button>
           </View> */}
          </View>
        </ScrollView>
      </View>
      {chagnePasswordSheet && (
        <BottomSheet>
          <View className="flex flex-1 items-center justify-center">
            <Headline className="font-bold">Change Password</Headline>
          </View>
          {changePasswordFormData.map((data, index) => (
            <View key={index} className="mt-5">
              <TextInputComponent
                value={
                  (changePasswordFormState[data.name] &&
                    changePasswordFormState[data.name].value) ||
                  ""
                }
                onInputChange={(value) => {
                  if (data.name === "confirmNewPassword") {
                    if (
                      changePasswordFormState[data.name] &&
                      changePasswordFormState["newPassword"] &&
                      value !== changePasswordFormState["newPassword"].value
                    ) {
                      setChangePasswordFormState({
                        ...changePasswordFormState,
                        [data.name]: {
                          value: value,
                          error: true,
                          helperText: true,
                        },
                      });
                    } else {
                      setChangePasswordFormState({
                        ...changePasswordFormState,
                        [data.name]: {
                          value: value,
                          error: false,
                          helperText: false,
                        },
                      });
                    }
                  } else {
                    setChangePasswordFormState({
                      ...changePasswordFormState,
                      [data.name]: {
                        value: value,
                        error: false,
                      },
                    });
                  }
                }}
                placeholder={data.placeholder}
                leftIcon={data.leftIcon}
                rightIcon={data.rightIcon}
                error={
                  changePasswordFormState[data.name] &&
                  changePasswordFormState[data.name].error
                }
                label={data.label}
                secureTextEntry={data.secureTextEntry}
              />
              {data.helperText && (
                <HelperText type="info" visible={true} padding="none">
                  {data.helperText}
                </HelperText>
              )}
            </View>
          ))}
          {chagnePasswordError && renderError(chagnePasswordError)}
          <View>
            <ButtonComponent
              cssClassName="w-full mt-6 mb-7"
              mode="contained"
              onPress={() => {
                "updatePassword is Pressed!!";
              }}
            >
              Update Password
            </ButtonComponent>
          </View>
        </BottomSheet>
      )}
      {resetPasswordError && (
        <SnackBar snackLabel="Ok" snackText={resetPasswordError} />
      )}
      {confirmationDialog && (
        <DialogComponent
          visible={true}
          buttonText={"Ok"}
          hideDialog={confimartionClose}
          title=""
          body={confirmationDialog}
        />
      )}
    </View>
  );
};

export default ForgotPassword;
