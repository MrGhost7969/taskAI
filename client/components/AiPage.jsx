import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useForm, Form } from 'react-hook-form';
import { View, Text, ScrollView, Dimensions, Keyboard, TouchableOpacity, Pressable, TouchableWithoutFeedback } from 'react-native'
import { TextInput } from 'react-native-paper';
import { useSaveState, useUserInput } from './exports/exports';
import CustomFlowChart from './Custom_Diagrams/CustomFlowChart.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFaceSmile, faFile } from '@fortawesome/free-regular-svg-icons';
import { route } from './exports/exports.js'
import { useDispatch, useSelector } from 'react-redux';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown, useAnimatedStyle, useSharedValue, withDelay, withSequence, withTiming } from 'react-native-reanimated';
import { addPrivatePage } from '../reduxFiles/privPageSlice';
import { createNativeStackNavigator, getFocusedRouteNameFromRoute } from '@react-navigation/native-stack';
import * as tf from '@tensorflow/tfjs'
import axios from 'axios';
import { faArrowsSpin, faPager, faPen, faSpinner } from '@fortawesome/free-solid-svg-icons';
import PageStack from './UserPages/NewPage'
import { useNavigation } from '@react-navigation/native';
/*
    todo:
    - interpret the words from the user and sort them in a flowchart based on the type of information it is (decision, sequence, etc)
    * Utilize ChatGPT Neural network
    * Iterate through userInput
    * Use the decision tree algorithm for text classification and random forest for optmization
    * Limit the amount of trees generated while have low bias and optimal run times          
*/
const Stack = createNativeStackNavigator()

// function AIPageStack(){
//     return(
//         <Stack.Navigator>
//             <Stack.Screen name='AIPage' component={AIPage} />
//             <Stack.Screen name="PageStack" component={PageStack} options={{ headerTitle: "Page" }} />
//         </Stack.Navigator>
//     )
// }

export default function AIPage() {
    const [dummyArr, setDummyArr] = useState(["Start", "Condition", "Process", "End"])
    const { textInput, setTextInput } = useUserInput()
    const [active, setActive] = useState(false)
    const [press, setPress] = useState(false)
    const [textData, setTextData] = useState('')
    const [loading, setLoading] = useState(false);
    const [arrInputs, setArrInputs] = useState([]) // store arrInputs in some memory or whatever
    const [textOutputs, setTextOutputs] = useState([])
    const [flowchartArrOutput, setFlowchartArrOutput] = useState([])
    const { isSaved, setIsSaved } = useSaveState()
    const { control, formState: { errors } } = useForm()
    const scrollViewRef = useRef()
    let name = "User"
    useEffect(() => {
        async function fetchChatServer() {
            try {
                const getChatRoute = await axios.get(`http://${route}:5000/chat`)
                console.log(`GET Api data from AIPAGE: ${getChatRoute.data}`)
                return getChatRoute;
            } catch (error) {
                console.log(`Cannot GET chat route. Details: ${error}`)
            }
        }
        fetchChatServer()
    }, [])
    const sendMessagesChatGPT = async (textInput) => {
        console.log(`Chat route: ${route}`)
        try {
            setLoading(true)
            const res = await axios.post(`http://${route}:5000/chat`, { textInput: textInput });
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
        setTextInput("")
        const response = await sendMessagesChatGPT(textInput);
        const includesTextFollowedByNewline = /\S+\n/.test(response);
        // try {
        //     const pyResponse = await axios.post('http://diagramClassifier.py/predict', {
        //         data: response
        //     })
        //     return pyResponse.data
        // } catch (error) {
        //     console.log(`Error fetching PYTHON code: ${error}`)
        // }
        if (checkWord(textInput.toLowerCase(), 'flowchart')) {
            if (response.includes('\n') && includesTextFollowedByNewline) {
                setTextOutputs(prevValue => [...prevValue, ...response.split('\n')]); // splits divs if text has a \n after
            } else {
                setTextOutputs(prevValue => [...prevValue, response])
            }
        } else {
            setTextOutputs(prevValue => [...prevValue, response])
        }
    }


    return (
        <View className="flex-1">
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} style={{ marginBottom: 70 }}
                ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
                {arrInputs && arrInputs.map((userInput, key) =>
                    <TaskAIOutput
                        arrInputsState={arrInputs}
                        userInput={userInput} key={key}
                        inputContainsFlowchart={checkWord(userInput.toLowerCase(), 'flowchart')}
                        dataTableMethod={checkWord(userInput.toLowerCase(), 'datatable')}
                        loadingState={loading}
                        flowchartOutput={textOutputs}
                        textOutputKey={textOutputs[key]}
                    />
                )}
            </ScrollView>
            <View className="justify-center items-center">
                {(arrInputs === undefined || arrInputs.length === 0) && <Text className="text-base absolute bottom-96">Hello there, {name}</Text>}
                <Form action='/chat' name='chat' control={control} render={() => (
                    <TextInput placeholder='Start creating!' onChangeText={text => setTextInput(text)}
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
function TaskAIOutput({ arrInputsState, userInput, textOutput, textOutputKey, inputContainsFlowchart, inputContainsDatatable, loadingState, flowchartOutput, flowchartMethod }, key) {
    console.log(`TaskAI inputs array: ${[arrInputsState]}`)
    console.log(`TaskAI output: ${textOutputKey}`);
    const chatArea = useRef(null)
    const [isButtonHeld, setIsButtonHeld] = useState(false)
    const [touchPosition, setTouchPosition] = useState({
        y: 0,
    })
    const [active, setActive] = useState(false);
    const { isSaved, setIsSaved } = useSaveState()
    const privPage = useSelector(state => state.privPage);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        const unfocus = navigation.addListener('focus', () => {
            setActive(false)
        })
        return () => unfocus
    }, [navigation, active])

    function popUpMenu(event) {
        setTouchPosition({ y: event.nativeEvent.locationY, })
        setIsButtonHeld(!isButtonHeld)
    }

    function saveAsPage(pageContent) {
        if (pageContent !== '' && pageContent !== null) {
            console.log(`Private Page from AIPage.jsx: ${JSON.stringify(privPage)}`)
            dispatch(addPrivatePage({ uri: "https://picsum.photos/700", title: "AI Page", content: pageContent }))
            setIsSaved(!isSaved);
            // direct to page instance with navigation method
            navigation.navigate('PageStack', { pageTitle: "AI Page", pageContent: pageContent, pageURI: "https://picsum.photos/700" })
            console.log("Edit button tapped!")
        } else {
            console.log("Error")
        }
    }
    function regenerate() {
        console.log("Regenerate")
    }

    const saveAsPageString = 'Save as page'
    const regenerateResponse = 'Regenerate Response';
    return (
        <React.Fragment key={key}>
            <Text key={key} className="text-lg items-start m-10 mr-24 mt-4">{userInput}</Text>
            <TouchableOpacity ref={chatArea} onLongPress={popUpMenu} className="flex-row mt-4 bg-white w-full max-h-fit justify-center " key={`${key}_view`}>
                {isButtonHeld && (
                    <View style={{ top: touchPosition.y }} className='flex-col absolute bg-slate-300 w-40 h-36 rounded z-10'>
                        {[saveAsPageString, regenerateResponse].map((item, index) => (
                            <Pressable onPress={item === saveAsPageString ? () => saveAsPage(inputContainsFlowchart ? <CustomFlowChart flowchartInputs={flowchartOutput} /> : textOutputKey) : regenerate} key={`chat-options_${index}`} className='pt-5 px-3 items-center flex-row'>
                                {item === saveAsPageString ? (
                                    <FontAwesomeIcon icon={faFile} size={20} />
                                ) : item === regenerateResponse && (
                                    <FontAwesomeIcon icon={faArrowsSpin} size={20} />
                                )}
                                <Text key={index} className='font-medium text-xs text-black pl-3'>{item}</Text>
                            </Pressable>
                        ))}
                    </View>
                )}
                <FontAwesomeIcon icon={faFaceSmile} style={{ position: 'absolute', top: 40, left: 10 }} size={29} />
                <Text className="m-10 mr-12 text-lg">
                    {loadingState && key === arrInputsState.length - 1
                        ? "Loading..." : (!inputContainsFlowchart || inputContainsDatatable) && textOutputKey}
                </Text>
                {/* Check if the user types "flowchart" or "datable" and display that */}
                {inputContainsFlowchart && <CustomFlowChart flowchartInputs={flowchartOutput} />}
                {inputContainsDatatable && <CustomDataTable inputs={userInput} />}
            </TouchableOpacity>
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
//  setTextInput("")
//  setDummyArr([...dummyArr])
// }
