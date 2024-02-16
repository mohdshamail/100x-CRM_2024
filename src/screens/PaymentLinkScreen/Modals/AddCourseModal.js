import { View, Text } from 'react-native'
import React,{ useState } from 'react'
// import ButtonComponent from '../../../../components/Button/Button'
//import TextInputComponent from '../../../../components/TextInput/TextInput'
import DropDownComponent from "../../../components/DropDown/DropDown";


const AddCourseModal = () => {

const data = [ 
  {label:"test",value:"test"},
  {label:"test1",value:"test1"},
  {label:"test2",value:"test2"},
  {label:"test3",value:"test4"},
]


  return (
    <View className='flex-1' style={{backgroundColor:"#f5f5f5"}}>
     <View>
      <DropDownComponent 
       placeholder={"Select course"}
       data={data}/>
     </View>
     <View className='mt-4'>
      <DropDownComponent 
       placeholder={"Course Type"}
       data={data}/>
       </View>
    </View>
  )
}

export default AddCourseModal