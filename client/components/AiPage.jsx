import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useForm, Form } from 'react-hook-form';
import { View, Text, ScrollView, Dimensions, Keyboard } from 'react-native'
import { TextInput } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { route } from './exports/exports'
import * as tf from '@tensorflow/tfjs'
import axios from 'axios';
export default function AIPage() {
    const [textInput, setText] = useState("")
    const [active, setActive] = useState(false)
    const [press, setPress] = useState(false)
    const [textData, setTextData] = useState('')
    const [loading, setLoading] = useState(false);
    const [arrInputs, setArrInputs] = useState([]) // store arrInputs in some memory or whatever
    const [arrOutputs, setArrOutputs] = useState([])
    const [component, setComponent] = useState([]); // array of components generated from tensorflow
    const { control, formState: { errors } } = useForm()
    const scrollViewRef = useRef()
    let name = "User"
    useEffect(() => {
        async function fetchData() {
            const getResponse = axios.get(route.dev).then(res => console.log(res.data))
                .catch(e => console.log(e));

            setTextData(getResponse)
        }
        fetchData();
    }, []);
    async function sendMessagesChatGPT(userRequest) {
        try {
            setLoading(true)
            const res = await axios.post(`${route.dev}/chat`, { userRequest });
            console.log(`AI output: ${res.data}`)
            return res.data
        } catch (error) {
            console.log("== error ==", error);
            return "I am sorry, I am not able to answer your question.";
        } finally {
            setLoading(false)
        }
    }
    const checkWord = (str, word) => {
        // When the user hits the space bar, it'll seperate words into separate strings
        let words = str.split(' ')
        console.log(`User inputs array: ${words}`)
        // returns true if the words array contains the word input (it could be "flowchart" or "diagram", etc)
        console.log(`Words array contains the word? ${words.includes(word)}`)

        return words.includes(word)
    }
    
    async function sendRequest(e) {
        e.preventDefault();
        Keyboard.dismiss()
        setPress(!press)
        setArrInputs(oldArr => [...oldArr, textInput])
        setText("")
        const response = await sendMessagesChatGPT(textInput);
        setArrOutputs(prevValue => [...prevValue, response])
    }
    const sortInputs = (userInput) => {
        console.log(`User input LIST(?): ${userInput}`);


        /*
            todo:
            - interpret the words from the user and sort them in a flowchart based on the type of information it is (decision, sequence, etc)
            
            * Utilize ChatGPT Neural network
            * Iterate through userInput
            
        */
    }    
    return (
        <View className="flex-1">
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} style={{ marginBottom: 70 }}
                ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
                {arrInputs.map((userInput, key) =>
                    <>
                        <Text key={key} className="text-lg items-start m-10 mr-24 mt-4">{userInput}</Text>
                        <View className="flex-row mt-4 bg-white w-full min-h-min max-h-fit justify-center" key={key + 1}>
                            <FontAwesomeIcon icon={faFaceSmile} style={{ marginTop: 40, marginLeft: 30 }} size={29} />
                            <Text className="m-10 mr-12 text-lg">{loading && key === arrInputs.length - 1
                                ? "Loading..." : arrOutputs[key]}</Text>
                        </View>
                        {checkWord(userInput.toLowerCase(), 'flowchart') && <CustomFlowChart inputs={userInput}/>}
                        {checkWord(userInput.toLowerCase(), 'datatable') && <CustomDataTable inputs={userInput}/>}
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
function CustomDataTable({inputs}){
    console.log("Generate datatable!")
    return(
        <>
            <View className='w-10 h-10 border-4 border-black justify-center items-center'>
                <Text>{inputs}</Text>
            </View>
        </>
    )
}
function CustomFlowChart({inputs}) {
    console.log("Generate flowchart")
    return (
        <>
            <View className="bg-blue-500 rounded-2xl w-32 h-14 justify-center items-center">
                <Text className='text-white'>{inputs}</Text>
            </View>
            <View className='w-1 h-20 bg-black'/>
            <View className='bg-red-500 w-20 h-20 rotate-45 justify-center items-center'>
                <Text className='-rotate-45 text-white'>Condition</Text>
            </View>
            <View className='w-1 h-20 bg-black'/>
            <View className='bg-yellow-500 w-20 h-20 rounded-full justify-center items-center'>
                <Text className='text-white'>Connecter</Text>
            </View>
        </>
    )
}