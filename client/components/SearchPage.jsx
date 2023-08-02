import React, { useState, useEffect } from 'react';
import { CommonActions } from '@react-navigation/native';
import { View, Text, ScrollView, FlatList } from 'react-native'
import { TextInput, Card } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { PageColumn } from './UserPages/NewPage';
export default function SearchPage({ navigation }) {
    const [textInput, setText] = useState("")
    const [active, setActive] = useState(false)

    const pubPage = useSelector(state => state.pubPage)
    const privPage = useSelector(state => state.privPage);
    let pagesArr = [{ title: "School Page" }, { title: "Software Engineering" }, { title: "Money money money" }];

    const query = [pubPage, privPage, pagesArr]
    useEffect(() => {
        const unfocus = navigation.addListener('focus', () => {
            setActive(false);
        });
        return unfocus;
    }, [navigation]);

    function searchPress() {
        console.log("Pressed search")
    }
    function navigateToPage(title, content, uri) {
        navigation.navigate('PageStack', { pageTitle: title, pageURI: uri, pageContent: content })
    }

    let category = "some category"
    return (
        <>
            <View className="flex justify-center items-center">
                <TextInput label={"Search"} className="absolute w-11/12 top-3 bg-gray-200"
                    onChangeText={text => setText(text)} onFocus={() => setActive(true)}
                    mode='flat' outlineColor='gray' activeOutlineColor='gray' value={textInput}
                    selectionColor='gray' activeUnderlineColor='transparent' underlineColor='transparent'
                    left={<TextInput.Icon icon={'magnify'} disabled={textInput === "" ? true : false} onPress={searchPress} />}
                />
            </View>
            {/* Render below under a condition */}
            {!active && textInput === "" ?
                <ScrollView className="flex h-full w-full top-28 left-4 gap-10" showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 300 }} style={{ position: 'absolute' }}>
                    <View className="gap-3">
                        <View className="flex-row">
                            <FontAwesomeIcon icon={faStar} color='gold' style={{ top: 4, marginRight: 3, left: -4 }} />
                            <Text className="text-base text-gray-600">Favorites</Text>
                        </View>
                        <PageColumn onPress={navigateToPage} subtitle={category} propArr={pagesArr} />
                    </View>
                    <View className="gap-3">
                        <Text className="text-base text-gray-600">Today</Text>
                        <PageColumn onPress={navigateToPage} subtitle={category} propArr={pubPage} />
                    </View>
                    <View className="gap-3">
                        <Text className="text-base text-gray-600">Older</Text>
                        <PageColumn onPress={navigateToPage} subtitle={category} propArr={privPage} />
                    </View>
                </ScrollView>
                :
                <View className="absolute left-5 top-20 w-11/12">
                    <Text>Searching for: {textInput}</Text>
                    <FlatList
                        data={query}
                        keyExtractor={(item, index) => index.toString()} // Add keyExtractor
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 200 }}
                        renderItem={({ item, index }) => {
                            const matchingPages = item.filter(item => item.title === textInput || item.title.includes(textInput));
                            if (matchingPages.length > 0 && textInput !== "") {
                                return (
                                    <View key={index}>
                                        <PageColumn propArr={matchingPages} />
                                    </View>
                                );
                            }
                        }}
                    />
                </View>
            }
        </>
    )
}