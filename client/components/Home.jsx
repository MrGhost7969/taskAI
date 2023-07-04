import React, {useState, useRef} from 'react'
import { Card, Checkbox } from 'react-native-paper'
import { View, Text, ScrollView, Pressable } from 'react-native'
import { faEllipsis, faChevronRight, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Animated, { useSharedValue, SlideInUp, SlideOutUp, useAnimatedStyle, withSequence, withTiming, withDelay, withSpring, SlideOutDown, FadeOut, FadeInUp, Easing, FadeOutUp } from 'react-native-reanimated'
export default function Home() {
    const [checked, setChecked] = useState(false);
    const [isList, setList] = useState(false);

    const listAnim = useSharedValue(0);

    const reanimatedViewStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateY: listAnim.value}]
        }
    })

    function toggleList(event) {
        event.preventDefault();
        setList(prev => !prev)
        listAnim.value = withSequence(withTiming(-30, {duration: 200}), withSpring(2))
    }

    // TODO: Generate a specific number of keys, labels, so on
    let arrTDs = [{label: "Boyy", key: 0}, {label: "puck", key: 1}, {label: "Cock", key: 2}]
    let cardArr = [{uri: 'https://picsum.photos/700', title: "Page", key: 0}, {uri: 'https://picsum.photos/700', title: "AP Class", key: 1}]
    return (
        <View className="flex">
            <ScrollView horizontal={true} className="flex-row gap-3 m-2" contentContainerStyle={{flexGrow: 1, paddingRight: 400}} 
            showsHorizontalScrollIndicator={false}>
                {cardArr.map((card, i) => (
                    i >= 5 ? 
                    <Card className="w-1/2 h-1/2 top-0 left-0" key={i}>
                        <Card.Title title="More pages" style={{height: "20%"}}/>
                    </Card>
                    :
                    <Card className="w-3/4 h-1/2 top-0 left-0" key={card.key}>
                        <Card.Cover source={{uri: card.uri}} style={{width: '100%', height: '70%'}}/>
                        <Card.Title title={card.title} style={{height: "20%"}}/>
                    </Card>
                ))}
            </ScrollView>
            {/* Important tasks */}
            <View className="relative mb-4 mt-3">
                <View className="flex-row absolute left-3 bottom-28">
                    <Pressable onPress={toggleList}>
                        <FontAwesomeIcon icon={faChevronRight} style={{left: 0, top: 20}} size={12}/>  
                        <Text className="text-lg font-normal left-4">Important To-Do's</Text>
                    </Pressable>
                </View>
                {isList && 
                <View className="absolute left-3 bottom-4">
                    {arrTDs.map((tDo, i) => (
                        i >= 4 ?
                        <FontAwesomeIcon icon={faEllipsis} key={i} color='black'/>
                        :
                        <Animated.View entering={FadeInUp} exiting={FadeOutUp} style={reanimatedViewStyle}>
                            <Checkbox.Item
                              className="-m-3" label={tDo.label}
                              key={tDo.key} status={checked ? 'checked' : 'unchecked'}
                              onPress={() => setChecked(!checked)} 
                              color='tomato' position='leading'
                            />
                        </Animated.View>
                    ))}
                </View>
                }
            </View>
            <Text className="underline underline-offset-2 text-md ml-3">Private Pages</Text>
            <ScrollView horizontal={true} className="flex-row gap-3 m-2" contentContainerStyle={{flexGrow: 1, paddingRight: 200}} 
            showsHorizontalScrollIndicator={false}>
                <Card className="w-3/4 h-1/2 top-0 left-0">
                    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={{width: '100%', height: '70%'}}/>
                    <Card.Title title="Page" style={{height: "20%"}}/>
                </Card>
            </ScrollView>
        </View>
    );
}