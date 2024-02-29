import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
//import { primaryColor } from "../../constants/constants";
import MyLeadParentStack from '../../DrawerItem/MyLeads/MyLeadParentStack'
// import FilterLead from "../../screens/FilterLead/FilterLead";
//import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import ProfileScreen from "../../screens/ProfileScreen/ProfileScreen";

const myleadsRoute = () => <MyLeadParentStack/>;

// const HomeRoute = () => <HomeScreen/>;

const profileRoute = () => <ProfileScreen/>

const TabNavigation = ({navigation}) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'myleads', title: 'My Leads', focusedIcon: 'home',unfocusedIcon:'home-outline' },
    // { key: 'home', title: 'Home', focusedIcon: 'home',unfocusedIcon:"home-outline" },
    { key: 'profile', title: 'Profile', focusedIcon: 'account',unfocusedIcon:'account-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    myleads: myleadsRoute,
    // home: HomeRoute,
    profile: profileRoute,
  });

  return (
    <BottomNavigation
    navigationState={{ index, routes }}
    onIndexChange={setIndex}
    renderScene={renderScene}
    barStyle={{ backgroundColor: 'rgba(0,0,0,0)', elevation: 0, height: 63 }}
    activeColor={"black"}
    inactiveColor={"#6b7280"}
    shifting={true}
    sceneAnimationEnabled={true}
    keyboardHidesNavigationBar={true}
  />
  
  );
};

export default TabNavigation;