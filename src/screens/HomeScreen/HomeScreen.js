import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { primaryColor } from '../../constants/constants';
import useBottomSheetModal from '../../components/CustomHooks/BottomSheetModal';

const HomeScreen = ({ navigation }) => {
  const { bottomSheetModalRef, snapPoints, animationConfigs, presentModal, closeModal } = useBottomSheetModal();

  return (
    <View style={{flex:1}}>
       <View className ='mt-20'>
       <Button  title="Open Modal" onPress={presentModal} />
       </View>
       <View style={{flex:1}}>
        <BottomSheetModalProvider>
          <View style={styles.container}>
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={1}
              animationConfigs={animationConfigs}
              snapPoints={snapPoints}
              handleIndicatorStyle={{ backgroundColor: primaryColor }}
              backgroundStyle = {{backgroundColor:"#cbd5e1"}}
            >
              <View className='flex-1 mx-4'>
              <View style={styles.contentContainer}>
                <Text>Awesome 🎉</Text>
              </View>
              <Text>Hello react</Text>
              </View>
            </BottomSheetModal>
          </View>
        </BottomSheetModalProvider>
        </View>
        </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    // backgroundColor:'gray'
  },
  contentContainer: {
    alignItems: 'center',
  },
});
