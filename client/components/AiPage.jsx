import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useForm, Form } from 'react-hook-form';
import { View, Text, ScrollView, Dimensions, Keyboard } from 'react-native'
import { TextInput } from 'react-native-paper';
import { useSaveState } from './exports/exports';
import CustomFlowChart from './Custom_Diagrams/CustomFlowChart.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { route } from './exports/exports.js'
import * as tf from '@tensorflow/tfjs'
import axios from 'axios';

/*
    todo:
    - interpret the words from the user and sort them in a flowchart based on the type of information it is (decision, sequence, etc)
    * Utilize ChatGPT Neural network
    * Iterate through userInput
    * Use the decision tree algorithm for text classification and random forest for optmization
    * Limit the amount of trees generated while have low bias and optimal run times          
*/

export default function AIPage() {
    const [dummyArr, setDummyArr] = useState(["Start", "Condition", "Process", "End"])
    // const [dummyArr, setDummyArr] = useState([
    //     { content: "Start", key: 0 },
    //     { content: "Decision", key: 1 },
    //     { content: "Process", key: 2 },
    //     { content: "End", key: 3 }
    // ])
    const [textInput, setText] = useState("")
    const [active, setActive] = useState(false)
    const [press, setPress] = useState(false)
    const [textData, setTextData] = useState('')
    const [loading, setLoading] = useState(false);
    const [arrInputs, setArrInputs] = useState([]) // store arrInputs in some memory or whatever
    const [arrOutputs, setArrOutputs] = useState([])
    const { isSaved, setIsSaved } = useSaveState()
    const { control, formState: { errors } } = useForm()
    const scrollViewRef = useRef()
    let name = "User"

    const sendMessagesChatGPT = async (textInput) => {
        console.log(`Chat route: ${route}`)
        try {
            setLoading(true)
            const res = await axios.post(`${route}/chat`, { textInput: textInput });
            console.log(`AI output: ${res.data}`)
            console.log(`Text input POST request AFTER: ${textInput}`)
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
        // const lines = str.split('\n').filter(line => line.trim() !== '');
        console.log(`User inputs array: ${words}`)
        // returns true if the words array contains the word input (it could be "flowchart" or "diagram", etc)
        console.log(`Words array contains the word? ${words.includes(word)}`)
        // root node, and subnodes

        return words.includes(word)
    }

    async function sendRequest(e) {
        e.preventDefault();
        Keyboard.dismiss()
        setPress(!press)
        setArrInputs(oldArr => [...oldArr, textInput])
        setText("")
        const response = await sendMessagesChatGPT(textInput);
        if (arrInputs.some(userInput => checkWord(userInput.toLowerCase(), 'flowchart'))) {
            console.log("Flowchart is in there! " + checkWord(userInput.toLowerCase(), 'flowchart'));
            const [, ...rest] = response
            setArrOutputs(rest); // Set arrOutputs to a new array containing only the latest response
        } else {
            setArrOutputs(prevValue => [...prevValue, response]);
        }
    }

    function saveGPTResponseAsPage(input) {

    }

    return (
        <View className="flex-1">
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} style={{ marginBottom: 70 }}
                ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
                {arrInputs.map((userInput, key) =>
                    <TaskAIOutput
                        arrInputsState={arrInputs}
                        userInput={userInput} key={key}
                        flowchartMethod={checkWord(userInput.toLowerCase(), 'flowchart')}
                        dataTableMethod={checkWord(userInput.toLowerCase(), 'datatable')}
                        loadingState={loading}
                        flowchartOutput={arrOutputs}
                        flowchartOutputKey={arrOutputs[key]}
                    />
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
function TaskAIOutput({ arrInputsState, userInput, flowchartMethod, dataTableMethod, loadingState, flowchartOutput, flowchartOutputKey }, key) {
    console.log(`TaskAI output: ${flowchartOutputKey}`);
    console.log(`Task AI output array: ${flowchartOutput}`);
    return (
        <React.Fragment key={key}>
            <Text key={key} className="text-lg items-start m-10 mr-24 mt-4">{userInput}</Text>
            <View className="flex-row mt-4 bg-white w-full max-h-fit justify-center " key={`${key}_view`}>
                <FontAwesomeIcon icon={faFaceSmile} style={{ position: 'absolute', top: 40, left: 10 }} size={29} />
                <Text className="m-10 mr-12 text-lg">
                    {loadingState && key === arrInputsState.length - 1
                        ? "Loading..." : (!flowchartMethod || dataTableMethod) && flowchartOutputKey}
                </Text>
                {/* Check if the user types "flowchart" or "datable" and display that */}
                {flowchartMethod && <CustomFlowChart inputs={flowchartOutput} />}
                {dataTableMethod && <CustomDataTable inputs={userInput} />}
            </View>
        </React.Fragment>
    )
}
function CustomDataTable({ inputs }) {
    console.log("Generate datatable!")
    return (
        <>
            <View className='w-10 h-10 border-4 border-black justify-center items-center'>
                <Text>{inputs}</Text>
            </View>
        </>
    )
}

// for testing purposes
// async function dummyRequest(e) {
//  e.preventDefault()
//  Keyboard.dismiss()
//  setPress(!press)
//  setArrInputs(oldArr => [...oldArr, textInput])
//  setText("")
//  setDummyArr([...dummyArr])
// }
