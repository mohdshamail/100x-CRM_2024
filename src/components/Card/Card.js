import React from 'react'
import {  Card,Text } from 'react-native-paper';
import { View,StyleSheet } from 'react-native';


const CardComponent = ({
  onCardPress,
  Props
}) => {
  return (
    <View className="p-2 rounded-lg">
     <Card style={styles.card}>
    <Card.Content>
      <Text className="mx-20"
       variant="titleLarge">Card title</Text>
      <Text variant="bodyMedium">
      Visual slider with text: Choose the second or third approach 
      for a combined slider and text display.
      </Text>
    </Card.Content>
     </Card>
     </View>
  )
}

export default CardComponent

const styles = StyleSheet.create({
  card:{
   height:150,
   width:350,
  }
})