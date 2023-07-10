import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { Text, View, Pressable, ScrollView } from 'react-native';
import { NavigationContainer, getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse, faComments, faMagnifyingGlass, faSquarePlus, faBars } from '@fortawesome/free-solid-svg-icons';

import AIPage from './components/AiPage';
import SearchPage from './components/SearchPage';
import Page from './components/Page';
import HomeStack from './components/Home';

const Tab = createBottomTabNavigator();

export default function App() {

    let typeOfPage = 'Normal Page'
    let pageName = "Private Page"
    

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
                    headerTitleAlign: 'center',
                })}
            >
                <Tab.Screen name={"Home"} component={HomeStack} options={{headerShown: false}} />
                <Tab.Screen name={"AI"} component={AIPage} options={{ headerTitle: "Task AI" }} />
                <Tab.Screen name={"Search"} component={SearchPage} />
                <Tab.Screen name={"NewPage"} component={Page}
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