import React, {useState} from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { TextInput, Card } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
export default function SearchPage(){
    const [textInput, setText] = useState("")
    const [active, setActive] = useState(false)
    const [page, setPage] = useState([])
    function searchPress(){
        console.log("Pressed search")
    }

    let category = "some category"
    let pagesArr = [{title: "School Page"}, {title: "Software Engineering"}, {title: "Money money money"}];
    return (
        <>
            <View className="flex justify-center items-center">
                <TextInput label={"Search"} className="absolute w-11/12 top-3 bg-gray-200"
                onChangeText={text => setText(text)} onFocus={() => setActive(!active)} 
                mode='flat' outlineColor='gray' activeOutlineColor='gray'
                selectionColor='gray' activeUnderlineColor='transparent' underlineColor='transparent'
                left={ <TextInput.Icon icon={'magnify'} disabled={textInput === "" ? true : false} onPress={searchPress}/>}
                />
            </View>
            {/* Render below under a condition */}
            <ScrollView className="flex absolute h-full w-full top-28 left-4 gap-10" showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 300}} style={{position: 'absolute'}}>
                <View className="gap-3">
                    <View className="flex-row">
                        <FontAwesomeIcon icon={faStar} color='gold' style={{top: 4, marginRight: 3, left: -4}}/>
                        <Text className="text-base text-gray-600">Favorites</Text>
                    </View>
                    
                        {pagesArr.map(i => 
                        <Card mode='elevated'>
                            <Card.Title 
                                title={i.title}
                                subtitle={`in ${category}`}
                            />
                        </Card>
                        )}
                </View>
                <View className="gap-3">
                    <Text className="text-base text-gray-600">Today</Text>
                    
                        {pagesArr.map(i => 
                        <Card mode='elevated'>
                            <Card.Title 
                                title={i.title}
                                subtitle={`in ${category}`}
                            />
                        </Card>
                        )}
                </View>
                <View className="gap-3">
                    <Text className="text-base text-gray-600">Older</Text>
                    
                    {pagesArr.map(i => 
                    <Card mode='elevated'>
                        <Card.Title 
                            title={i.title}
                            subtitle={`in ${category}`}
                        />
                    </Card>
                    )}
                </View>
            </ScrollView>
        </>
    )
}