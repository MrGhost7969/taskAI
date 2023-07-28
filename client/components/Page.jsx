import React, { useState } from 'react';
import { View, Text } from 'react-native'
import { TextInput } from 'react-native-paper';
import { cardArr, privPageArr } from './exports/exports';
const Page = ({ updateTitle, updateContent }) => {
    const [pageTitle, setPageTitle] = useState('');
    const [pageContent, setPageContent] = useState('');
    // SetpageTitle and setPagecontent should affect NewPage
    return (
        <View className="relative bg-white min-h-screen">
            <View className="items-start left-5 top-10">
                <TextInput mode='outlined' numberOfLines={3} className="text-4xl text-gray-300 font-bold w-5/6 right-4"
                    placeholder='Untitled Page' onChangeText={text => setPageTitle(text)} value={pageTitle}
                    activeUnderlineColor='transparent' activeOutlineColor='transparent' outlineColor='transparent'
                    underlineColor='transparent' textColor='black' style={{ backgroundColor: "white" }} placeholderTextColor={'#d1d5db'}
                />
                <TextInput mode='outlined' numberOfLines={15} className="text-base font-normal top-5 right-3 w-1/2"
                    placeholder='Tap to edit!' onChangeText={text => setPageContent(text)} value={pageContent}
                    activeUnderlineColor='transparent' activeOutlineColor='transparent' outlineColor='transparent'
                    underlineColor='transparent' textColor='black' style={{ backgroundColor: "white" }} placeholderTextColor={'rgb(107 114 128)'}
                />
            </View>
        </View>
    )
}
export default Page