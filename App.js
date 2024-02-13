import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { enGB, registerTranslation } from "react-native-paper-dates";
registerTranslation("en-GB", enGB);
import { SafeAreaProvider } from "react-native-safe-area-context";
import { store } from "./src/redux/store";
import Routes from "./Routes";
export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <Routes />
      </Provider>
    </SafeAreaProvider>
  );
}
