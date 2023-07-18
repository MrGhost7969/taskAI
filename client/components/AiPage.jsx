import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useForm, Form } from 'react-hook-form';
import { View, Text, ScrollView, Dimensions, Keyboard } from 'react-native'
import { TextInput } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import Constants from 'expo-constants';
import { route } from './exports/exports'
import axios from 'axios';
export default function AIPage() {
    const [textInput, setText] = useState("")
    const [active, setActive] = useState(false)
    const [press, setPress] = useState(false)
    const [textData, setTextData] = useState('')
    const [loading, setLoading] = useState(false);
    const [arrInputs, setArrInputs] = useState([]) // store arrInputs in some memory or whatever
    const [arrOutputs, setArrOutputs] = useState([])
    const { control, formState: { errors } } = useForm()
    const scrollViewRef = useRef()
    let name = "User"
    let aiOut = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    async function sendMessagesChatGPT(requestData) {
        try {
            setLoading(true)
            const res = await axios.post(`${route.dev}/chat`, { requestData });
            console.log(res.data)
            return res.data
        } catch (error) {
            console.log("== error ==", error);
            return "I am sorry, I am not able to answer your question.";
        } finally {
            setLoading(false)
        }
    }

    async function sendRequest(e) {
        e.preventDefault();
        Keyboard.dismiss()
        setPress(!press)
        setArrInputs(oldArr => [...oldArr, textInput])
        setText("")
        const requestData = {
            messages: [{ role: 'user', content: textInput }]
        }
        const response = await sendMessagesChatGPT(requestData)
        setArrOutputs(prevValue => [...prevValue, response])
        console.log(response)
    }
    
    useEffect(() => {
        async function fetchData() {
            const getResponse = axios.get(route.dev).then(res => console.log(res.data))
                .catch(e => console.log(e));

            setTextData(getResponse)
        }
        fetchData();
    }, []);

    return (
        <View className="flex-1">
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} style={{ marginBottom: 70 }}
                ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
                {arrInputs.map((inputList, key) =>
                    <>
                        <Text key={key} className="text-lg items-start m-10 mr-24 mt-4">{inputList}</Text>
                            <View className="flex-row mt-4 bg-white w-full min-h-min max-h-fit justify-center" key={key + 1}>
                                <FontAwesomeIcon icon={faFaceSmile} style={{ marginTop: 40, marginLeft: 30 }} size={29} />
                                <Text className="m-10 mr-12 text-lg">{loading && key === arrInputs.length - 1
                                ? "Loading..." : arrOutputs[key]}</Text>
                            </View>
                    </>
                )}
            </ScrollView>
            <View className="justify-center items-center">
                {(arrInputs === undefined || arrInputs.length === 0) && <Text className="text-base absolute bottom-96">Hello there, {name}</Text>}
                <Form action='/chat' name='chat' control={control} render={() => (
                    <TextInput placeholder='Start creating!' onChangeText={text => setText(text)}
                        className="w-11/12 bottom-7 absolute" mode='outlined' outlineColor='black' value={textInput}
                        activeOutlineColor='gray' onFocus={() => setActive(true)} style={{ backgroundColor: 'white' }}
                        right={
                            <TextInput.Icon icon={"play"} disabled={textInput === "" ? true : false} onPress={sendRequest} />
                        }
                    />
                )} />
            </View>
        </View>
    );
}