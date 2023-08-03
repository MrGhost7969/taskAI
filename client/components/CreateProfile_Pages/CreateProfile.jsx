import React, {useState, useEffect} from 'react'
import { View, Text, Button } from 'react-native'
import { TextInput } from 'react-native-paper'
export default function CreateProfile() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    return (
        <>
            <Text>First name</Text>
            <TextInput />
        </>
    )
}