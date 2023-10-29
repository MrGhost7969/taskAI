import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { Text, View, Pressable, ScrollView } from 'react-native';
import { NavigationContainer, getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse, faComments, faMagnifyingGlass, faSquarePlus, faBars } from '@fortawesome/free-solid-svg-icons';

import AIPage from './components/AiPage';
import SearchPage from './components/SearchPage';
import CreatePage from './components/CreatePage';
import HomeStack from './components/Home';
import axios from 'axios';
import { route } from './components/exports/exports';
import store from './reduxFiles/store';

import { Provider } from 'react-redux';
import AuthPageStack from './components/AuthPage';
import { createStackNavigator } from '@react-navigation/stack';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator()
export default function App() {

    let typeOfPage = 'Normal Page'
    let pageName = "Private Page"

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Tab.Navigator
                    initialRouteName='AuthPage'
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;
                            switch (route.name) {
                                case 'Home': iconName = focused ? faHouse : faHouse
                                    break;
                                case 'AI': iconName = focused ? faComments : faComments
                                    break;
                                case 'Search': iconName = focused ? faMagnifyingGlass : faMagnifyingGlass
                                    break;
                                case 'New Page': iconName = focused ? faSquarePlus : faSquarePlus
                                    break;
                                default: break;
                            }
                            return <FontAwesomeIcon icon={iconName} size={size} color={color} />
                        },
                        tabBarActiveTintColor: 'black',
                        tabBarInactiveTintColor: 'gray',
                        headerTitleAlign: 'center',
                        tabBarStyle: {display: route.name === 'AuthPage' ? 'none' : 'flex'}
                    })}
                >
                    {/* <Stack.Screen name={'AuthPage'} component={AuthPageStack} options={{ headerShown: false }} /> */}
                    <Tab.Screen name={"Home"} component={HomeStack} options={{ headerShown: false }} />
                    <Tab.Screen name={"AI"} component={AIPage} options={{ headerTitle: "Task AI" }} />
                    <Tab.Screen name={"Search"} component={SearchPage} />
                    <Tab.Screen name={"New Page"} component={CreatePage}
                        options={{
                            headerRight: () => (<Text className="absolute right-3">Type: {typeOfPage}</Text>),
                            headerLeft: () => (<Text className="absolute left-3">In page: {pageName}</Text>),
                            headerTitle: "",
                            headerStyle: { borderBottomColor: 'black', borderBottomWidth: .5 }
                        }} />
                </Tab.Navigator>
            </NavigationContainer>
        </Provider>
    );
}