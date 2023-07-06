import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react'
import { Divider } from 'react-native-paper';
import { Text, View, Pressable, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse, faComments, faMagnifyingGlass, faSquarePlus, faBars } from '@fortawesome/free-solid-svg-icons';
import Animated, { useSharedValue, withSpring, withTiming, useAnimatedStyle, ZoomIn, ZoomOut } from 'react-native-reanimated';

import Home from './components/Home'
import AIPage from './components/AiPage';
import SearchPage from './components/SearchPage';
import Page from './components/Page';

const Tab = createBottomTabNavigator();
export default function App() {
    let name = 'Random person'
    let typeOfPage = 'Normal Page'
    let pageName = "Private Page"
    const [show, setShow] = useState(false)
    const scale = useSharedValue(0);
    const reanimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }))

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName='Home'
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home')
                            iconName = focused ? faHouse : faHouse;
                        else if (route.name === 'AI')
                            iconName = focused ? faComments : faComments;
                        else if (route.name === 'Search')
                            iconName = focused ? faMagnifyingGlass : faMagnifyingGlass;
                        else if (route.name === 'NewPage')
                            iconName = focused ? faSquarePlus : faSquarePlus;
                        return <FontAwesomeIcon icon={iconName} size={size} color={color} />
                    },
                    tabBarActiveTintColor: 'black',
                    tabBarInactiveTintColor: 'gray',
                    headerTitleAlign: 'center'
                })}
            >
                <Tab.Screen name={"Home"} key={0} component={Home} options={{
                    headerRight: () => (
                        <View>
                            <Pressable onPress={() => {
                                setShow(() => {
                                    scale.value = withSpring(1)
                                    return !show;
                                })
                            }}>
                                <FontAwesomeIcon icon={faBars} style={{ right: 15 }} size={25} />
                            </Pressable>
                            {show &&
                                <Animated.View entering={ZoomIn.duration(100)} exiting={ZoomOut.duration(100)} className="bg-white p-3 top-5 right-10 rounded-lg border-slate-800 absolute w-32" style={[reanimatedStyle]}>
                                    <Text className='my-2'>Settings</Text>
                                    <Divider bold={true} style={{ width: 128, right: 15 }} />
                                    <Text className='my-2'>Profile</Text>
                                </Animated.View>
                            }
                        </View>
                    ), headerTitle: `${name}'s Dashboard`
                }} />
                <Tab.Screen name={"AI"} key={1} component={AIPage} options={{ headerTitle: "Task AI" }} />
                <Tab.Screen name={"Search"} key={2} component={SearchPage} />
                <Tab.Screen name={"NewPage"} key={3} component={Page}
                    options={{
                        headerRight: () => (<Text className="absolute right-3">Type: {typeOfPage}</Text>),
                        headerLeft: () => (<Text className="absolute left-3">In page: {pageName}</Text>),
                        headerTitle: "",
                        headerStyle: { borderBottomColor: 'black', borderBottomWidth: .5}
                    }}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}