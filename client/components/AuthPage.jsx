import { createStackNavigator } from '@react-navigation/stack'
import React, { useState, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { TextInput, Card, Avatar } from 'react-native-paper'
import CreateProfile from './CreateProfile_Pages/CreateProfile'

const Stack = createStackNavigator()
export default function AuthPageStack(){
    return(
        <Stack.Navigator >
            <Stack.Screen name='AuthPage' component={AuthPage} options={{headerTitle: () => <Text className='absolute text-xl font-bold left-36'>Task AI</Text>}} />
            <Stack.Screen name='CreateProfile' component={CreateProfile} options={{headerTitle: () => <Text>Create Profile</Text>}}/>
        </Stack.Navigator>
    )
}
function AuthPage({navigation}) {
    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [active, setActive] = useState(false)

    function logInWithGoogle(){
        console.log("Direct to accounts.google.com!")
    }

    function logInWithGitHub(){
        console.log("Direct to accounts.github.com!")
    }
    return (
        <>
            <View className='items-center gap-2 mt-1'>
                <Card mode='outlined' onPress={logInWithGoogle} className='rounded-none w-11/12 h-12 bg-white'>
                    <Card.Title left={() => <Avatar.Image size={24} source={require('../images/GoogleImage.jpg')}/>} 
                    title="Sign in with Google" className='bottom-3'/>
                </Card>
                <Card mode='outlined' onPress={logInWithGitHub} className='rounded-none w-11/12 h-12 bg-white'>
                    <Card.Title left={() => <Avatar.Image size={24} source={require('../images/githubIcon.jpg')}/>} 
                    title="Sign in with GitHub" className='bottom-3'/>
                </Card>
            </View>
            <Text className='text-lg font-bold m-4 mt-12'>Log in</Text>
            <View className='flex flex-col items-center gap-3'>
                <TextInput label={'Email'} onChangeText={text => setEmailInput(text)}
                    onFocus={() => setActive(!active)} mode='flat' outlineColor='gray' activeOutlineColor='gray'
                    value={emailInput} selectionColor='gray' activeUnderlineColor='transparent'
                    underlineColor='transparent' className='w-11/12 bg-gray-200'/>
                <TextInput label={'Password'} onChangeText={text => setPasswordInput(text)}
                    onFocus={() => setActive(!active)} mode='flat' outlineColor='gray' activeOutlineColor='gray'
                    value={passwordInput} selectionColor='gray' activeUnderlineColor='transparent'
                    underlineColor='transparent' className='w-11/12 bg-gray-200'/>
            </View>
            <View className='mt-5 w-11/12 justify-center left-4'>
                <Button title='Log in' color={'black'} />
            </View>
            <View className='top-4 left-3'>
                <Text>Don't have an account?</Text>
                <Text className='text-blue-600' onPress={() => navigation.navigate('CreateProfile')}>Create an account</Text>
            </View>
        </>
    )
}