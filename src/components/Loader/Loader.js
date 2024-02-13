import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const Loader = () => {
  return (
    <View className="absolute z-40 flex justify-center items-center h-full right-0 bottom-0 left-0">
      <View
        style={{ backgroundColor: "gray" }}
        className="opacity-40 h-full w-full z-20 absolute"
      />
      <ActivityIndicator size="large" animating={true} className="z-40" />
    </View>
  );
};

export default Loader;
