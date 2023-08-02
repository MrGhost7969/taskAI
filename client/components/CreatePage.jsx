import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, Image, FlatList, Keyboard } from 'react-native'
import { TextInput, Card } from 'react-native-paper';
import { useSaveState } from './exports/exports';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown, useAnimatedStyle, useSharedValue, withDelay, withSequence, withTiming } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { addPrivatePage } from '../reduxFiles/privPageSlice';

export default function CreatePage ({ navigation }) {
    const [pageTitle, setPageTitle] = useState('');
    const [pageContent, setPageContent] = useState('');
    const [active, setActive] = useState(false)
    const [pageImageExamples, setPageImageExamples] = useState(false)
    const [selectedImageCover, setSelectedImageCover] = useState("")
    const { isSaved, setIsSaved } = useSaveState()
    const privPage = useSelector(state => state.privPage);
    const saveButton = useSharedValue(0)
    // SetpageTitle and setPagecontent should affect NewPage
    const dispatch = useDispatch();
    const images = [
        { uri: 'https://picsum.photos/600' },
        { uri: 'https://picsum.photos/700' },
        { uri: 'https://wallpapercave.com/wp/wp6202709.jpg' },
        { uri: 'https://th.bing.com/th/id/OIP.1i0IPWWGz00AQLMy0cK7QwHaEK?pid=ImgDet&rs=1' },
        { uri: 'https://c4.wallpaperflare.com/wallpaper/851/501/292/minimalism-programming-code-wallpaper-preview.jpg' },
        { uri: 'https://static.wikia.nocookie.net/baki/images/a/a2/Yujiro%27s_Demon_Back.jpg/revision/latest?cb=20200715084726' }
    ];
    const saveButtonAnim = useAnimatedStyle(() => ({
        opacity: saveButton.value 
    }))
    useEffect(() => {
        const unfocus = navigation.addListener('focus', () => {
            setActive(false)
        })
        return unfocus
    }, [navigation, active]);

    function handleToggle() {
        console.log("Image change")
        Keyboard.dismiss()
        setPageImageExamples(!pageImageExamples)
    }
    function handleImageChange(imageUri) {
        console.log("Change image!")
        setSelectedImageCover(imageUri)
        setPageImageExamples(false)
        console.log('Image URL when clicked!', imageUri)
        console.log(typeof imageUri === 'string')
    }
    useEffect(() => {
        const isEmpty = pageTitle !== '' && pageContent !== '';
        console.log('Page title state is:', pageTitle !== '')
        console.log('Page content state is:', pageContent !== '')
        active && (isEmpty || selectedImageCover !== "") && navigation.setOptions({
            headerRight: () => 
                <Pressable onPress={() => savePage(pageTitle, pageContent, selectedImageCover)} >
                    <Text style={{color: !isEmpty ? '#93C5FD' : 'rgb(37 99 235)'}} 
                    className='right-4 font-bold'>Save</Text>
                </Pressable>
        })
    }, [navigation, active, pageTitle, pageContent, selectedImageCover]);

    function savePage(pageTitle, pageContent, pageURI) {
        console.log('onPress: Page title state is:', pageTitle !== '')
        console.log('onPress: Page content state is:', pageContent !== '')
        console.log('onPress: Page URI state is:', pageURI !== '');
        if ((pageTitle !== '' && pageContent !== '') || pageURI !== '') {
            console.log(privPage);
            dispatch(addPrivatePage({ uri: pageURI, title: pageTitle, content: pageContent }));
            setIsSaved(!isSaved)
            setActive(false);
            setPageTitle('')
            setPageContent('')
            setSelectedImageCover('')
            console.log("Saved!")
            console.log("Saved is:", isSaved);
        } else {
            console.log("Error!")
        }
    }
    useEffect(() => {
        saveButton.value = withSequence(withTiming(1), withDelay(1000, withTiming(0)))
    }, [isSaved]);
    return (
        <View className="relative bg-white min-h-screen">
            <View style={{ opacity: pageImageExamples ? 0.4 : 1 }}>
                {(privPage !== undefined || privPage.length !== 0) &&
                    selectedImageCover !== '' ?
                    <Pressable onPress={handleToggle}>
                        <Image source={{ uri: selectedImageCover }}
                            style={{ width: '100%', height: 100 }} />
                    </Pressable>
                    :
                    <Pressable className='flex-row w-full top-6 left-5' onPress={handleToggle}>
                        <FontAwesomeIcon icon={faImage} color='rgb(156 163 175)' style={{ marginRight: 5 }} />
                        <Text className='text-gray-400'>Add cover</Text>
                    </Pressable>
                }
                <View className="items-start left-5 top-10">
                    <TextInput mode='outlined' numberOfLines={3} className="text-4xl text-gray-300 font-bold w-5/6 right-4"
                        placeholder='Untitled Page' onChangeText={text => setPageTitle(text)} value={pageTitle}
                        activeUnderlineColor='transparent' activeOutlineColor='transparent' outlineColor='transparent'
                        underlineColor='transparent' textColor='black' style={{ backgroundColor: "white" }}
                        placeholderTextColor={'#d1d5db'} onFocus={() => setActive(!active)}
                    />
                    <TextInput mode='outlined' numberOfLines={15} className="text-base font-normal top-5 right-3 w-1/2"
                        placeholder='Tap to edit!' onChangeText={text => setPageContent(text)} value={pageContent}
                        activeUnderlineColor='transparent' activeOutlineColor='transparent' outlineColor='transparent'
                        underlineColor='transparent' textColor='black' style={{ backgroundColor: "white" }}
                        placeholderTextColor={'rgb(107 114 128)'} onFocus={() => setActive(!active)}
                    />
                </View>
            </View>

            {pageImageExamples &&
                <Animated.View className="p-5 bg-white absolute bottom-0 w-full h-2/3 flex rounded-lg border-black border-y-2"
                    entering={SlideInDown.duration(100)} exiting={SlideOutDown}>
                    <View className="bg-gray-400 w-1/4 h-2 top-3 right-40 absolute rounded" />
                    <Text>Images here</Text>
                    <FlatList
                        key={'_'}
                        keyExtractor={(_, index) => index.toString()}
                        contentContainerStyle={{ paddingBottom: 200 }}
                        style={{ left: -5 }}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        data={images}
                        renderItem={({ item, index }) => (
                            <Pressable key={index} onPress={() => handleImageChange(item.uri)}>
                                <Card.Cover style={{ aspectRatio: 0.85, marginBottom: 10, marginRight: 15 }} className="w-full" source={{ uri: item.uri }} />
                            </Pressable>
                        )}
                    />
                </Animated.View>
            }
            {isSaved &&
                <Animated.View style={saveButtonAnim} entering={FadeIn.duration(100)} exiting={FadeOut.duration(100)}
                    className='bg-gray-600 w-56 h-14 rounded-md flex items-center absolute justify-center left-20 bottom-56'>
                    <Text className='text-white'>Saved!</Text>
                </Animated.View>
            }
        </View>
    )
}