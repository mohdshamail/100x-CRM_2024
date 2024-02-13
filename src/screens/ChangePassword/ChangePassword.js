import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { ChangePasswordFormData } from "./ChangePasswordFormData";
import TextInputComponent from "../../components/TextInput/TextInput";
import { Headline, HelperText } from "react-native-paper";
import ButtonComponent from "../../components/Button/Button";
import {
  checkFormValidity,
  doLogout,
  getDataFromKey,
  getValueFromStorage,
} from "../../utility/utility";
import { storageKeys } from "../../constants/constants";
import { ChangePasswordByTokenAPI } from "../../api/ChangePasswordByTokenAPI/ChangePasswordByTokenAPI";
import SnackBar from "../../components/SnackBar/SnackBar";

const ChangePassword = () => {
  const [formState, setFormState] = useState({});
  const [chagnePasswordError, setChagnePasswordError] = useState(false);
  const [success, setSuccess] = useState(false);

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

  const updatePassword = async () => {
    const isFormValid = checkFormValidity(ChangePasswordFormData, formState);
    if (isFormValid.formValid) {
      setChagnePasswordError(false);
      const token = await getValueFromStorage(storageKeys.APP_SECURE);
      const data = await ChangePasswordByTokenAPI(formState, token);
      const message = data.message;

      if (message && message.includes("Authorization is required")) {
        doLogout();
      } else if (message && !message.includes("successfully")) {
        setChagnePasswordError(message);
      } else {
        setSuccess(message);
        setFormState({});
      }
    } else {
      setFormState(isFormValid.state);
    }
  };

  return (
    <View className="flex flex-1 relative">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        <View className="flex mt-5">
          <Headline className="font-bold">Chagne Password</Headline>
        </View>
        {ChangePasswordFormData.map((data, index) => (
          <View key={index} className="mt-5">
            <TextInputComponent
              value={(formState[data.name] && formState[data.name].value) || ""}
              onInputChange={(value) => {
                if (data.name === "confirmNewPassword") {
                  if (
                    formState[data.name] &&
                    formState["newPassword"] &&
                    value !== formState["newPassword"].value
                  ) {
                    setFormState({
                      ...formState,
                      [data.name]: {
                        value: value,
                        error: true,
                        helperText: true,
                      },
                    });
                  } else {
                    setFormState({
                      ...formState,
                      [data.name]: {
                        value: value,
                        error: false,
                        helperText: false,
                      },
                    });
                  }
                } else {
                  setFormState({
                    ...formState,
                    [data.name]: { value: value, error: false },
                  });
                }
              }}
              placeholder={data.placeholder}
              leftIcon={data.leftIcon}
              rightIcon={data.rightIcon}
              error={formState[data.name] && formState[data.name].error}
              label={data.label}
              secureTextEntry={data.secureTextEntry}
            />
            {formState[data.name] && formState[data.name].helperText && (
              <HelperText type="info" visible={true} padding="none">
                Passwords should match
              </HelperText>
            )}
          </View>
        ))}
        {chagnePasswordError && renderError(chagnePasswordError)}
        <View className="mt-5 flex items-center">
          <ButtonComponent
            cssClassName="w-full"
            mode="contained"
            onPress={updatePassword}
          >
            Update Password
          </ButtonComponent>
        </View>
      </ScrollView>
      {success && <SnackBar snackLabel="Ok" snackText={success} />}
    </View>
  );
};

export default ChangePassword;
