import { View, Text, StyleSheet } from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import BottomSheet, {
  useBottomSheetSpringConfigs,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";

const BottomDrawer = ({ children, setIsVisible }) => {
  const [isVisible, setIsVisible] = useState(false);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "70%"], []);
  setIsVisible(setIsVisible);
  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
  });

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        isVisible={isVisible}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        animationConfigs={animationConfigs}
      >
        <BottomSheetScrollView>{children}</BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

export default BottomDrawer;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
});
