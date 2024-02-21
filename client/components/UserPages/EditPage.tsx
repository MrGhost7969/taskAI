import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, Image, FlatList, Keyboard } from 'react-native'
import { TextInput, Card } from 'react-native-paper';
import { useSaveState } from '../exports/exports';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown, useAnimatedStyle, useSharedValue, withDelay, withSequence, withTiming } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';

export default function EditPage({}) {
    const { isSaved, setIsSaved } = useSaveState()
    const saveButton = useSharedValue(0)

    return ( // contain contents of the page selected
        <>
            
        </>
    )
}