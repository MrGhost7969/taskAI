import React, { useState, useEffect, useRef } from 'react';
import { View, Text } from 'react-native'
import { TextInput } from 'react-native-paper';
export default function Page(){
    const [textInput, setText] = useState("")

    return(
        <View className="relative bg-white min-h-screen">
            <View className="items-start left-5 top-10">
                <Text className="text-4xl text-gray-300 font-bold">Untitled Page</Text>
                <TextInput mode='outlined' numberOfLines={15} className="text-base text-gray-500 font-normal top-5 right-3 w-1/2" 
                placeholder='Tap to edit!' onChangeText={text => setText(text)} 
                activeUnderlineColor='transparent'activeOutlineColor='transparent' outlineColor='transparent' 
                underlineColor='transparent' textColor='black' style={{backgroundColor:"white"}}
                />
            </View>
        </View>
    )
}