import React, { useState, useRef, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { TextInput } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
export default function AIPage(){
    const [textInput, setText] = useState("")
    const [active, setActive] = useState(false)
    const [press, setPress] = useState(false)
    const [arrInputs, setArrInputs] = useState([]) // store arrInputs in some memory or whatever
    const scrollViewRef = useRef()
    let name = "User"
    let aiOut = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    function sendRequest(e) {
        setPress(!press)
        setArrInputs(oldArr => [...oldArr, textInput])
        setText("")
        console.log("Request input")

        e.preventDefault();
    }

    console.log(arrInputs)
    return (
        <View className="flex-1">
            <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center'}} style={{marginBottom: 70}} 
            ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({animated: false})}>
                {arrInputs.map((inputList, key) =>
                <>
                    <Text key={key} className="text-lg items-start m-10 mr-24 mt-4">{inputList}</Text>
                    <View className="flex-row mt-4 bg-white w-full min-h-min max-h-fit justify-center" key={key + 1}> 
                        <FontAwesomeIcon icon={faFaceSmile} style={{marginTop: 40, marginLeft: 30}} size={29}/>
                        <Text className="m-10 mr-12 text-lg">{aiOut}</Text>
                    </View>
                </>
                )}
            </ScrollView>
            <View className="justify-center items-center">
                {(arrInputs === undefined || arrInputs.length === 0) && <Text className="text-base absolute bottom-96">Hello there, {name}</Text>}
                <TextInput placeholder='Start creating!' onChangeText={text => setText(text)} 
                className="w-11/12 bottom-7 absolute" mode='outlined' outlineColor='black' value={textInput}
                activeOutlineColor='gray' onFocus={() => setActive(!active)} style={{backgroundColor: 'white'}}
                right={ <TextInput.Icon icon={"play"} disabled={textInput === "" ? true : false} onPress={sendRequest}/> }
                /> 
            </View>
        </View>
    );
}