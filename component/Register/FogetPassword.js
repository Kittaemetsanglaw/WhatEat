import React from 'react'
import { View , Text} from 'react-native'


function ForgetPassword({ navigation , route}) {
  return (
      <View>
        <Text> email: {route.params.email} </Text>
        <Text> password: {route.params.password} </Text>
      </View>
  )
}

export default ForgetPassword;
