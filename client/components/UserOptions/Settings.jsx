import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Pressable } from 'react-native'
import { Card, Divider, Switch } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BrightnessHigh from 'react-native-bootstrap-icons/icons/brightness-high'
import Moon from 'react-native-bootstrap-icons/icons/moon'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons'
export default function Settings({ navigation }) {
    const [isAppearanceSwitchOn, setIsAppearanceSwitchOn] = useState(false);
    const [isNotificationSwitchOn, setIsNotificationSwitchOn] = useState(false);
    const [isActivityOn, setIsActivityOn] = useState(false)
    const [activityDropDown, setActivityDropDown] = useState(false)

    const [activity, setActivity] = useState({
        online: {
            current: false,
            text: "Online"
        },
        away: {
            current: false,
            text: "Away"
        },
        do_not_disturb: {
            current: false,
            text: "Do Not Disturb"
        }
    })

    useEffect(() => {
        console.log(`Online is: ${activity.online.current}
                    Online text: ${activity.online.text}`)
    }, [activity])
    return (
        <View className="bg-white h-full w-full">
            <View className="left-4">
                <Text className="text-lg font-bold py-5">My Settings</Text>
                <View className="gap-3">
                    <Divider />
                    <Text>Passwords</Text>
                    <Divider />
                    <View className="flex-row items-center bottom-2">
                        <Text>Appearance</Text>
                        <BrightnessHigh style={{ left: 205 }} fill={'rgb(0 0 0)'} />
                        <Switch value={isAppearanceSwitchOn} onValueChange={() => setIsAppearanceSwitchOn(!isAppearanceSwitchOn)}
                            className="left-52" />
                        <Moon style={{ left: 210 }} fill={'rgb(0,0,0)'} />
                    </View>
                    <Divider />
                    <Text className="text-lg font-bold py-4">Notfications</Text>
                    <Divider />
                    <View className="flex-row items-center">
                        <Text >Enable push Notfications</Text>
                        <Switch value={isNotificationSwitchOn} onValueChange={() => setIsNotificationSwitchOn(!isNotificationSwitchOn)}
                            className="left-36" />
                    </View>
                    <Divider />
                    <View className="flex-row items-center">
                        <Text>Show Activity</Text>
                        <Switch value={isActivityOn} onValueChange={() => setIsActivityOn(!isActivityOn)}
                            style={{ left: 215 }} />
                    </View>
                    <View className="flex-row items-center">
                        <Pressable onPress={() => setActivityDropDown(!activityDropDown)}>
                            <View className="rounded border-2 border-gray-400" style={{
                                height: activityDropDown ? 110 : 24,
                                width: activity.online.current || activity.away.current || activity.do_not_disturb.current ? 200 : 112
                            }}>
                                <Text className="text-gray-600 ml-2">Activity type: {
                                    activity.online.current ? activity.online.text :
                                        activity.away.current ? activity.away.text :
                                            activity.do_not_disturb.current && activity.do_not_disturb.text
                                }</Text>
                                <FontAwesomeIcon icon={faChevronRight} size={10} style={{ left: 90, top: -14, transform: [{ rotate: '90deg' }] }} />
                            </View>
                        </Pressable>
                        {activityDropDown && (
                            <View className="absolute top-6 left-6 gap-2">
                                <Pressable onPress={() => {
                                    console.log("Online")
                                    setActivity(prevState => ({
                                        ...prevState,
                                        online: { current: true },
                                    }))
                                    }} className="flex-row items-center">
                                    <View className="w-3 h-3 rounded-full bg-green-400 right-4" />
                                    <Text>Online</Text>
                                </Pressable>
                                <Pressable onPress={() => setActivity(prevState => ({
                                        ...prevState,
                                        away: { current: true },
                                    }))} className="flex-row items-center">
                                    <View className="w-3 h-3 rounded-full bg-orange-400 right-4" />
                                    <Text>Away</Text>
                                </Pressable>
                                <Pressable onPress={() => setActivity(prevState => ({
                                        ...prevState,
                                        do_not_disturb: { current: true }
                                    }))} className="flex-row items-center">
                                    <View className="w-3 h-3 rounded-full bg-red-500 right-4" />
                                    <Text>DND</Text>
                                </Pressable>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
}