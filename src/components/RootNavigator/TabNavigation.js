import * as React from 'react';
import { View } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';
//import { primaryColor } from "../../constants/constants";
import MyLeadParentStack from '../../DrawerItem/MyLeads/MyLeadParentStack'
// import FilterLead from "../../screens/FilterLead/FilterLead";
import ProfileScreen from "../../screens/ProfileScreen/ProfileScreen";

const myleadsRoute = () => <MyLeadParentStack/>;

// const FilterRoute = () => <FilterLead/>;

const profileRoute = () => <ProfileScreen/>

const TabNavigation = ({navigation}) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'myleads', title: 'My Leads', focusedIcon: 'card-multiple',unfocusedIcon:'card-multiple-outline' },
    // { key: 'leadFilter', title: 'Lead-Filter', focusedIcon: 'filter-variant-minus',unfocusedIcon:"filter-variant-plus" },
    { key: 'profile', title: 'Profile', focusedIcon: 'account',unfocusedIcon:'account-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    myleads: myleadsRoute,
    // leadFilter: FilterRoute,
    profile: profileRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{ backgroundColor: 'rgba(0,0,0,0)', elevation: 0 , height:63,}}
      activeColor={"black"}
      inactiveColor={"#6b7280"}
      shifting={true}
      sceneAnimationEnabled={true}
      keyboardHidesNavigationBar={true}
     // renderIcon={color}
    />
  );
};

export default TabNavigation;