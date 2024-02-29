import React from 'react'
//import DrawerNavigation from '../components/RootNavigator/DrawerNavigation';
import TabNavigation from '../components/RootNavigator/TabNavigation';
// Drawer a is Root-Navigator in this app and stack navigators are embended in it.

const AppStack = ({navigation}) => {
  return (
  //  <DrawerNavigation/>
   <TabNavigation/>
  )
   
};

export default AppStack;
