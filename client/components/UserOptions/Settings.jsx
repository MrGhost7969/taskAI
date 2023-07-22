import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Card, Divider } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function Settings({ navigation }){
    return(
        <View className="bg-white h-full w-full">
            <View className="left-4">
                <Text className="text-lg font-bold py-5">My Settings</Text>
                <Divider />
                <Text>Passwords</Text>
                <Divider />
                <Text>Appearance</Text>
            </View>
        </View>
    );
}