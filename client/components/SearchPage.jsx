import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native'
import { TextInput, Card } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
export default function SearchPage({ navigation }) {
    const [textInput, setText] = useState("")
    const [active, setActive] = useState(false)

    const pubPage = useSelector(state => state.pubPage)
    const privPage = useSelector(state => state.privPage);
    useEffect(() => {
        const unfocus = navigation.addListener('focus', () => {
            setActive(false);
        });
        return unfocus;
    }, [navigation]);

    function searchPress() {
        console.log("Pressed search")
    }
    const generateCards = (arr, type) => {
        return arr.map((name, key) => (
            <Card mode='elevated' key={key} style={{ backgroundColor: 'white', borderRadius: 15 }}>
                <Card.Title
                    title={name.title}
                    subtitle={`in ${type}`}
                />
            </Card>
        ))
    }

    let category = "some category"
    let pagesArr = [{ title: "School Page" }, { title: "Software Engineering" }, { title: "Money money money" }];
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
                        {generateCards(pagesArr, category)}
                    </View>
                    <View className="gap-3">
                        <Text className="text-base text-gray-600">Today</Text>
                        {generateCards(pubPage, category)}

                    </View>
                    <View className="gap-3">
                        <Text className="text-base text-gray-600">Older</Text>
                        {generateCards(privPage, category)}
                    </View>
                </ScrollView>
                :
                <View className="absolute left-0 top-20">
                    <Text>Searching for: {textInput}</Text>
                </View>
            }
        </>
    )
}