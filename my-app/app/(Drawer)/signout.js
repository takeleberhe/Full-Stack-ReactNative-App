import React from 'react'
import { View,Text,Button } from 'react-native'
import { Link } from 'expo-router'

const signout = () => {
  return (
    <View>
         <Text>This is test</Text>
        <Link href={'/(tabs)/home/'} asChild>
            <Button title='Go Back'></Button>
        </Link>
    </View>
  )
}

export default signout
