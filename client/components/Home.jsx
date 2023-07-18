import React, { useState, useRef, useEffect } from 'react'
import { Card, Checkbox } from 'react-native-paper'
import { View, Text, ScrollView, Pressable, FlatList } from 'react-native'
import { faEllipsis, faChevronRight, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Settings from './UserOptions/Settings';
import { Divider } from 'react-native-paper';
import Profile from './UserOptions/Profile';
import Animated, { useSharedValue, ZoomIn, ZoomOut, useAnimatedStyle, withSequence, withTiming, withDelay, withSpring, SlideOutDown, FadeOut, FadeInUp, Easing, FadeOutUp, SlideInDown, RotateInDownLeft, RotateOutDownRight, Keyframe } from 'react-native-reanimated'

import { route, cardArr, privPageArr, arrTDs } from './exports/exports';
import axios from 'axios';
const Stack = createNativeStackNavigator()

export default function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Settings' component={Settings} />
            <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
    )
}


function HomeScreen({ navigation }) {
    let name = 'Random person'
    let email = "rando@gmail.com"

    // ---------For later-----------
    // const [pageTitle, setPageTitle] = useState("");  
    // const [pageContent, setPageContent] = useState("");  

    const [show, setShow] = useState(false)
    const [isList, setList] = useState(false);
    const [profileToggle, setProfileToggle] = useState(false)

    const [checkedItems, setCheckedItems] = useState(Array(arrTDs.length).fill(false));

    const scale = useSharedValue(0);
    const listAnim = useSharedValue(0);
    const toggleProfileList = useSharedValue(0)

    const reanimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }))

    const reanimatedViewStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: listAnim.value }]
    }))

    const toggleStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: toggleProfileList.value }]
    }))
    // Transfer Page data in here:

    const [data, setData] = useState("")
    useEffect(() => {
        console.log("Connecting to server")
        async function fetchServer(){
            const response = await axios.get(route.dev).then(res => console.log(res.data)).catch(e => console.log(e))
            setData(response)
        }
        console.log(data)
        fetchServer();
        console.log(route)

    }, []);

    useEffect(() => {
        scale.value = withTiming(show ? 1 : 0);
        toggleProfileList.value = withTiming(profileToggle ? 1 : 0);
    }, [show, profileToggle])

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable onPress={() => setShow(prevVal => !prevVal)}>
                    <FontAwesomeIcon icon={faBars} style={{ right: 15 }} size={25} />
                </Pressable>
            ),
            headerTitle: () =>
                <View className="flex flex-row">
                    <Pressable onPress={() => setProfileToggle(prevToggle => !prevToggle)}>
                        <FontAwesomeIcon icon={faUser} style={{ top: 12, left: -4, marginRight: 10 }} size={25} />
                    </Pressable>
                    <View>
                        <Text className="text-base">{name + "'s"} Dashboard</Text>
                        <Text className="text-sm text-gray-500">{email}</Text>
                    </View>
                </View>
        })
    }, [navigation]);

    function toggleList(event) {
        event.preventDefault();
        setList(prev => !prev)
        listAnim.value = withSequence(withTiming(-30, { duration: 200 }), withSpring(2))
    }

    return (
        <View className="flex">
            <View style={{ opacity: profileToggle ? 0.6 : 1 }}>
                <FlatList
                    className="flex-row gap-5 m-2"
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingRight: 400 }}
                    horizontal={true}
                    data={cardArr}
                    keyExtractor={(item, index) => item.title + index}
                    renderItem={({ item }) => (
                        <Card className="ml-1 mr-6 top-0 left-0 bg-white" style={{ width: 150, height: "50%" }} key={item.title}>
                            <Card.Cover source={{ uri: item.uri }} style={{ width: '100%', height: '70%' }}/>
                            <Card.Title title={item.title.length > 35 ? 
                            item.title.substring(0, Math.min(item.title.length, 10)).concat("...")
                            : item.title} style={{ height: '20%', width: "100%" }} />
                        </Card>
                    )}
                    onEndReachedThreshold={0.5}
                />
                {show && (
                    <Animated.View entering={ZoomIn.duration(50)} exiting={ZoomOut.duration(100)}
                        className="bg-white p-3 -top-2 right-10 rounded-lg border-slate-800 absolute w-36 h-28 z-20"
                        style={[reanimatedStyle]}>
                        <Text onPress={() => navigation.navigate('Settings')} className='my-2'>Settings</Text>
                        <Divider bold={true} style={{ width: 145, right: 12 }} />
                        <Text onPress={() => navigation.navigate('Profile')} className='my-2'>Profile</Text>
                    </Animated.View>
                )}
                {/* Important tasks */}
                <View className="relative mb-4 mt-3">
                    <View className="flex-row absolute left-3 bottom-28">
                        <Pressable onPress={toggleList}>
                            <Animated.View entering={isList && RotateInDownLeft} exiting={RotateOutDownRight}>
                                <FontAwesomeIcon icon={faChevronRight} style={{ left: 0, top: 20 }} size={12} />
                            </Animated.View>
                            <Text className="text-lg font-normal left-4">Important To-Do's</Text>
                        </Pressable>
                    </View>
                    {isList &&
                        <View className="absolute left-3 bottom-4">
                            <Animated.View entering={FadeInUp} exiting={FadeOutUp} style={reanimatedViewStyle}>
                                {arrTDs.map((tDo, i) => (
                                    i >= 4 ?
                                        <FontAwesomeIcon icon={faEllipsis} key={i + 1} color='black' />
                                        :
                                        <Checkbox.Item
                                            className="-m-3" label={tDo.label}
                                            key={i} status={checkedItems[i] ? 'checked' : 'unchecked'} // if the box pressed is true, checked : unchecked
                                            onPress={() => {
                                                const newCheckedItems = [...checkedItems]; // get elements of arrTDs
                                                newCheckedItems[i] = !newCheckedItems[i]; // assign specific box to true
                                                setCheckedItems(newCheckedItems);
                                            }}
                                            color='purple' position='leading'
                                        />
                                ))}
                            </Animated.View>
                        </View>
                    }
                </View>
                <Text className="underline underline-offset-2 text-md ml-3">Private Pages</Text>
                <FlatList
                    className="flex-row m-2"
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingRight: 400 }}
                    horizontal={true}
                    data={privPageArr}
                    keyExtractor={(item, index) => item.title + index}
                    renderItem={({ item }) => (
                        <Card className="ml-1 mr-6 top-0 left-0 bg-white" style={{ width: 150, height: "50%" }} key={item.title}>
                            <Card.Cover source={{ uri: item.uri }} style={{ width: '100%', height: '70%' }} />
                            <Card.Title title={item.title.length > 35 ? 
                            item.title.substring(0, Math.min(item.title.length, 10)).concat("...")
                            : item.title} style={{ height: '20%', width: "100%" }} />
                        </Card>
                    )}
                    onEndReachedThreshold={0.5}
                />
            </View>
            {profileToggle &&
                <Animated.View entering={SlideInDown.duration(100)} exiting={SlideOutDown.duration(400)}
                    style={toggleStyle} className="p-5 bg-white absolute bottom-0 w-full h-2/5 flex rounded-lg">
                    <View className="items-center mb-5">
                        <View className="bg-gray-300 w-1/12 h-1/4 -top-3 absolute rounded"></View>
                        <Text>Accounts</Text>
                    </View>
                    <Text className="text-gray-500 font-semibold">{email}</Text>
                    <Text>Lorem Ipsum text</Text>
                </Animated.View>
            }
        </View>
    );
}