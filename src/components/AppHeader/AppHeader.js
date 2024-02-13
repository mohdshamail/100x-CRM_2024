import { View } from "react-native";
import * as React from "react";
import { primaryColor } from "../../constants/constants";
import { Appbar } from "react-native-paper";

const AppHeader = ({
  icon,
  onPress,
  barTittle,
  showMenuButton,
  handleopenMenu,
}) => {
  return (
    <View>
      <Appbar.Header style={{ backgroundColor: primaryColor }} elevated="true">
        <Appbar.Action iconColor="white" icon={icon} onPress={onPress} />
        <Appbar.Content titleStyle={{ color: "white" }} title={barTittle || null} />
        {showMenuButton && (
          <Appbar.Action
            iconColor="white"
            icon="dots-vertical"
            onPress={handleopenMenu}
          />
        )}
      </Appbar.Header>
    </View>
  );
};

export default AppHeader;
