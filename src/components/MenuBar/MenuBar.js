import React from 'react'
import { View,Button, Menu, Divider, PaperProvider } from 'react-native-paper';


const MenuBar = () => {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  return (
    <>
    <View>
      <Text>Hello React</Text>
    </View>
    </>
//     <PaperProvider>
//     <View
//     style={{
//       paddingTop: 50,
//       flexDirection: 'row',
//       justifyContent: 'center',
//     }}>
//     <Menu
//       visible={visible}
//       onDismiss={closeMenu}
//       anchor={<Button onPress={openMenu}>Show menu</Button>}>
//       <Menu.Item onPress={() => {}} title="Item 1" />
//       <Menu.Item onPress={() => {}} title="Item 2" />
//       <Divider />
//       <Menu.Item onPress={() => {}} title="Item 3" />
//     </Menu>
//   </View>
//  </PaperProvider>
  )
}

export default MenuBar