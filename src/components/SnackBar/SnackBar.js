import React from "react";
import { Snackbar } from "react-native-paper";

const SnackBar = ({ snackText, snackLabel, close }) => {
  const [visible, setVisible] = React.useState(true);

  return (
    <Snackbar
      visible={visible}
      onDismiss={() => setVisible(false)}
      action={{
        label: snackLabel || "Ok",
        onPress: () => {
          setVisible(false);
          if (close) {
            close(false);
          }
        },
      }}
    >
      {snackText}
    </Snackbar>
  );
};

export default SnackBar;
