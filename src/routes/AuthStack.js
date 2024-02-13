import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screenNames } from "../constants/screenNames";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import ForgotPassword from "../screens/ForgotPassword/ForgotPassword";

const Stack = createNativeStackNavigator();
// AuthStack component is responsible for Authentication mechanism of App.
const AuthStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName={LoginScreen}>
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name={screenNames.LOGIN} component={LoginScreen} />
        <Stack.Screen
          name={screenNames.FORGOT_PASSWORD}
          component={ForgotPassword}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AuthStack;
