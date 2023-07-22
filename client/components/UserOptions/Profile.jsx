import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, Pressable, FlatList } from 'react-native'
import { Card, Chip } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios'
export default function Profile({ navigation }) {
    // Set state
    let title = "Description"
    let subtitle = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

    const [role, setRole] = useState({
        admin: "Admin",
        guest: "Guest"
    })
    function changePFP() {
        console.log("Change pfp")
    }
    return (
        <ScrollView className="h-full w-full gap-3" showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 400 }} style={{ position: 'absolute' }}>
            <View className="bg-gray-200 w-full h-2/5 mb-9">
                <Pressable onPress={changePFP} className="rounded-full z-10 absolute items-center justify-center bg-white top-32 left-32 w-1/3 h-32">
                    <FontAwesomeIcon icon={faUser} size={50} />
                    <FontAwesomeIcon icon={faPlusCircle} className="bg-black rounded-full w-7 h-7"
                        style={{ position: 'absolute', bottom: 3, right: 25 }} size={20} />
                </Pressable>
            </View>
            <View className="flex items-center justify-center top-8">
                <Text className="text-3xl">Username</Text>
                <Text>fmolinari106@gmail.com</Text>
            </View>
            <View className="bottom-52 left-5">
                <View className="h-80 -mb-16">
                    <Card className="w-11/12 top-64 h-2/3 bg-white"
                        style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                        <Card.Title title={title} subtitle={subtitle} subtitleNumberOfLines={6} titleStyle={{ fontWeight: '700' }}
                            subtitleStyle={{ height: "70%" }} style={{ width: "100%", height: '100%' }} />
                    </Card>
                </View>
                <View className="h-24 max-h-80">
                    <Card className="w-11/12 top-64 h-full bg-white"
                        style={{ position: 'absolute'}}>
                        <Card.Title title={"Roles"} subtitleNumberOfLines={4} titleStyle={{ fontWeight: '700', marginBottom: 50 }}
                            subtitleStyle={{ height: "70%" }} style={{ width: "100%", height: '100%' }} />
                    </Card>
                    <Chip icon="information" className="w-1/4 top-72 left-4">
                        {role.admin}
                    </Chip>
                </View>
            </View>
        </ScrollView>
    );
}
