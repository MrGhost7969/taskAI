import React, { useEffect, useRef, useState } from 'react'
import { Text, View, Pressable, Keyboard } from 'react-native'
import { TextInput, Chip } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowUpLong, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
export default function Trash({ navigation }) {
    const [clicked, setClicked] = useState(false)
    const [active, setActive] = useState(false)
    const [text, setText] = useState('')

    function searchTrash() {
        setClicked(!clicked)
        console.log("Search trash")
    }

    useEffect(() => {
        const unfocus = navigation.addListener('focus', () => {
            setActive(false)
        })
        return unfocus
    }, [navigation])
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <>
                    {!clicked &&
                        <Pressable onPress={searchTrash}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </Pressable>
                    }
                </>
            ),
            headerTitle: () =>
                <>
                    {clicked && <TextInput placeholder='Search for trash' activeOutlineColor='gray' outlineColor='white'
                        onChangeText={text => setText(text)} style={{ backgroundColor: 'white', width: 250, right: 15 }}
                        activeUnderlineColor='transparent' underlineColor='transparent'
                        onFocus={() => setActive(true)} value={text} autoFocus />}
                </>

        })
    }, [navigation, clicked, text]);
    return (
        <>
            {text !== '' ?
                <View className="flex-row top-4 mx-5 items-center">
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                    <Text className="ml-5 text-base">Related Text</Text>
                    <FontAwesomeIcon icon={faArrowUpLong} style={{transform: [{rotate: '-45deg'}], left: 210}} size={18}/>
                </View>
                :
                <>
                    <Animated.View className="flex-row" entering={FadeIn.duration(80)} exiting={FadeOut.duration(80)}>
                        <Chip className="w-1/4 border-gray-400 top-2 left-4" mode='outlined'>
                            <Text>Pages</Text>
                        </Chip>
                        <Chip className="w-1/4 border-gray-400 top-2 left-6" mode='outlined'>
                            <Text>Files</Text>
                        </Chip>
                        <Chip className="w-2/5 border-gray-400 top-2 left-8" mode='outlined'>
                            <Text>Photos & images</Text>
                        </Chip>
                    </Animated.View>
                    <View className="flex absolute left-20 top-16 w-full h-full">
                        <Text className="text-md">Your trashed files will appear below</Text>
                    </View>
                </>
            }
        </>
    )
}
