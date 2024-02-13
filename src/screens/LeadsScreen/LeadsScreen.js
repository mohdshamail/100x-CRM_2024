import { View,TouchableOpacity  } from 'react-native'
import React from 'react'
import { Card, Text } from 'react-native-paper';
//import { primaryColor } from '../../constants/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';


const LeadsScreen = ({data,recordFilterData}) => {
  const navigation = useNavigation();


  return (  
    <ScrollView>
    <View className='mx-4 mb-2'>
     <Card className='bg-white'>
     <TouchableOpacity onPress={()=> navigation.navigate("LeadDetails" , {
      leadData:data,
      filterRecordData:recordFilterData
      })}>
      <View className='flex-row justify-between'>
      <View>
      <Text className='mx-4 mt-2 text-xl text-slate-600'>{data?.name ? data?.name : "Name"}</Text>
     </View>
     </View>
     <View className="mx-2 mt-2">
      <View>
     <View className='mb-2'>
      <View className='flex-row flex-wrap mb-3'>
      <View className='bg-pink-400 p-2 rounded-2xl'>
      <Text className="text-white">{data?.lead_quality ? data?.lead_quality:"lead Qty"}</Text>
      </View>
      <View className='bg-blue-400 mx-1 p-2 px-3 rounded-2xl'>
      {/* <Text className="text-white">{data ? data?.product_lead_quality : "no data"}</Text> */}
      <Text className="text-white">{data.product_lead_quality ? data?.product_lead_quality : "product lead Qty"}</Text>
      </View>
      <View className='bg-yellow-600 mx-1 p-2 px-3 rounded-2xl'>
      <Text className="text-white">{data?.painarea ? data?.painarea : "Painarea"}</Text>
      </View>
      </View>
      <View className='flex-row'>
      <View className='bg-cyan-500 mx-1 p-2 px-3 rounded-2xl'>
      <View className="flex-row">
      <Icon name="phone" size={18} />
      <Text className="text-white pl-1">{data?.call_details_count ? data?.call_details_count : "0"}</Text>
      </View>
      </View>
      <View className='bg-gray-500 mx-1 p-2 px-3 rounded-2xl'>
      <Text className="text-white">{data?.language ? data?.language: "language" }</Text>
      </View>
      </View>
      </View>
      </View>
    <View className='p-1 pb-2'>
      <Text variant='titleSmall' className='text-gray-500'>
        Original Date & Time: {data?.received_date ? data?.received_date:"No-Date Found!"} </Text>
    </View>
     </View>
     </TouchableOpacity>
  </Card>
    </View>
    </ScrollView>
   
  )
}

export default LeadsScreen