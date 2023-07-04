import React, {useState} from 'react';
import { View, Text } from 'react-native'
import { TextInput } from 'react-native-paper';

export default function SearchPage(){
    const [textInput, setText] = useState("")
    const [active, setActive] = useState(false)

    return(
        <View className="flex justify-center items-center">
            <TextInput label={"Search"} className="absolute w-11/12 top-3 bg-gray-200"
            onChangeText={text => setText(text)} onFocus={() => setActive(!active)} 
            mode='flat' outlineColor='gray' activeOutlineColor='gray'
            selectionColor='gray' activeUnderlineColor='transparent' underlineColor='transparent'/>
        </View>
    )
}