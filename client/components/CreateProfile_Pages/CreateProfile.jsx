import React, { useState, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { TextInput } from 'react-native-paper'
import { useForm, Form } from 'react-hook-form';
import { route } from '../exports/exports'
import axios from 'axios'
export default function CreateProfile({ navigation }) {
    const { control, formState: { errors } } = useForm()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [emailState, setEmailState] = useState('')
    const [passwordState, setPasswordState] = useState('')
    const [active, setActive] = useState(false)
    const [registerInfo, setRegisterInfo] = useState('')
    const [registeredMessage, setRegisteredMessage] = useState('')
    useEffect(() => {
        async function fetchResponse() {
            console.log("Fetching register GET req...")
            const getReq = await axios.get(`${route.dev}/register`).then(res => console.log("Register GET Response:", res.data))
                .catch(err => console.log(`Can't seem to connect to register route: ${err}`))
            setRegisterInfo(getReq)
        }
        fetchResponse();
    }, []);
    async function handleUserRegistration() {
        console.log('Password State:', passwordState);
        if (firstName !== '' && lastName !== '' && emailState !== '' && passwordState !== '') {
            console.log("Registered!");
            navigation.navigate("Home");
            try {
                console.log("Before register post request")
                const registerResponse = await axios.post(`${route.dev}/register`, { emailState, passwordState });
                console.log("Registration successful:", registerResponse.data);
                setRegisteredMessage(registerResponse.data)
                return registerResponse.data;
            } catch (error) {
                console.log(`There's an issue: ${error}`);
            }
        } else {
            console.log("Can't register!");
        }
        console.log(registeredMessage)
    }

    const labelColor = {
        colors: {
            onSurfaceVariant: 'rgb(100 116 139)'
        }
    }
    return (
        <Form action='/register' name='register' control={control} render={() => (
            <>
                <View className='flex flex-col gap-4 relative justify-center left-4 my-14'>
                    <View>
                        <Text className='text-md'>First name</Text>
                        <TextInput name='first-name' label={firstName === '' && "John"} theme={labelColor} onChangeText={text => setFirstName(text)}
                            onFocus={() => setActive(!active)} mode='flat' outlineColor='gray' activeOutlineColor='gray'
                            value={firstName} selectionColor='gray' activeUnderlineColor='transparent'
                            underlineColor='transparent' className='w-5/6 bg-gray-200'
                        />
                    </View>
                    <View>
                        <Text className='text-md'>Last name</Text>
                        <TextInput name='last-name' label={lastName === "" && "Doe"} theme={labelColor} onChangeText={text => setLastName(text)}
                            onFocus={() => setActive(!active)} mode='flat' outlineColor='gray' activeOutlineColor='gray'
                            value={lastName} selectionColor='gray' activeUnderlineColor='transparent'
                            underlineColor='transparent' className='w-5/6 bg-gray-200'
                        />
                    </View>
                    <View>
                        <Text className='text-md'>Email</Text>
                        <TextInput name='email' label={emailState === '' && "johndoe@something.com"} theme={labelColor} onChangeText={text => setEmailState(text)}
                            onFocus={() => setActive(!active)} mode='flat' outlineColor='gray' activeOutlineColor='gray'
                            value={emailState} selectionColor='gray' activeUnderlineColor='transparent'
                            underlineColor='transparent' className='w-5/6 bg-gray-200'
                        />
                    </View>
                    <View>
                        <Text className='text-md'>Create password</Text>
                        <TextInput name='password' label={passwordState === '' && "*********"} theme={labelColor} onChangeText={text => setPasswordState(text)}
                            onFocus={() => setActive(!active)} mode='flat' outlineColor='gray' activeOutlineColor='gray'
                            value={passwordState} selectionColor='gray' activeUnderlineColor='transparent'
                            underlineColor='transparent' className='w-5/6 bg-gray-200' secureTextEntry
                        />
                    </View>
                    {/* <View>
                        <Text className='text-md'>Confirm password</Text>
                        <TextInput name='password' label={passwordState === '' && "*********"} theme={labelColor} onChangeText={text => setPasswordState(text)}
                            onFocus={() => setActive(!active)} mode='flat' outlineColor='gray' activeOutlineColor='gray'
                            value={passwordState} selectionColor='gray' activeUnderlineColor='transparent'
                            underlineColor='transparent' className='w-5/6 bg-gray-200' secureTextEntry
                        />
                    </View> */}
                    <View className='relative top-10 w-2/3 justify-center left-16'>
                        <Button title='Register' color={'black'} className="rounded-lg" onPress={handleUserRegistration} />
                    </View>
                </View>
            </>
        )} />
    )
}