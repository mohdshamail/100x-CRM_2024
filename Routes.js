import { useEffect } from "react";
import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { primaryColor, storageKeys } from "./src/constants/constants";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppStack from "./src/routes/AppStack";
import AuthStack from "./src/routes/AuthStack";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./src/components/Loader/Loader";
import ApiError from "./src/components/ApiError/ApiError";
import { getValueFromStorage } from "./src/utility/utility";
import { setToken } from "./src/redux/slices/tokenSlice";

const fontConfig = {
  customVariant: {
    fontFamily: Platform.select({
      web: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      ios: "System",
      default: "sans-serif",
    }),
    fontWeight: "400",
    letterSpacing: 0.5,
    lineHeight: 22,
    fontSize: 20,
  },
};

const theme = {
  ...DefaultTheme,
  fonts: configureFonts({ config: fontConfig }),
  colors: {
    ...DefaultTheme.colors,
    roundness: 2,
    primary: primaryColor,
    accent: primaryColor,
  },
};

const Routes = () => {
  const token = useSelector((state) => state.token.token);
  const loading = useSelector((state) => state.showLoader.showLoader);
  const dispatch = useDispatch();

  //getting token From App_Secure_storage
  const getToken = async () => {
    const tokenStored = await getValueFromStorage(storageKeys.APP_SECURE);
    if (tokenStored) {
      dispatch(setToken(tokenStored));
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ApiError />
          {loading && <Loader />}
          {/* <AuthStack/> */}
          {token ? <AppStack /> : <AuthStack />}
        </GestureHandlerRootView>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default Routes;
