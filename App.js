import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Headline } from "react-native-paper";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { enGB, registerTranslation } from "react-native-paper-dates";
registerTranslation("en-GB", enGB);
import { SafeAreaProvider } from "react-native-safe-area-context";
import { store } from "./src/redux/store";
import Routes from "./Routes";
import * as Network from "expo-network";
import noInternet from "./assets/LostConnection/no-internet.json";
import LottieView from "lottie-react-native";


export default function App() {
  const [isConnected, setIsConnected] = useState(true);

  //console.log("isConnected = ", isConnected);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const networkState = await Network.getNetworkStateAsync();
        setIsConnected(networkState.isConnected);
      } catch (error) {
        setIsConnected(false);
      }
    };

    checkConnection();

    const intervalId = setInterval(checkConnection, 1000); // Check every second
    return () => clearInterval(intervalId);
  }, []);

  return (
    <SafeAreaProvider>
      {isConnected ? (
        <Provider store={store}>
          <Routes />
        </Provider>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LottieView
            source={noInternet}
            autoPlay={true}
            loop={true}
            style={{ width: 350, height: 300 }}
          />
          <Headline className="font-bold text-slate-400">
           No internet connection
          </Headline>
        </View>
      )}
    </SafeAreaProvider>
  );
}
