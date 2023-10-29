import { createStackNavigator } from '@react-navigation/stack'
import React, { useState, useEffect } from 'react'
import { useForm, Form } from 'react-hook-form';
import { View, Text, Button, Keyboard } from 'react-native'
import { TextInput, Card, Avatar } from 'react-native-paper'
import CreateProfile from './CreateProfile_Pages/CreateProfile'
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import Constants from "expo-constants";
import { route } from './exports/exports'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
const Stack = createStackNavigator()
// GoogleSignin.configure()
export default function AuthPageStack() {
    return (
        <Stack.Navigator >
            <Stack.Screen name='AuthPage' component={AuthPage} options={{ headerTitle: () => <Text className='items-center text-xl font-bold'>Task AI</Text> }} />
            <Stack.Screen name='Create Profile' component={CreateProfile} options={{ headerTitle: () => <Text className='text-xl'>Create Profile</Text> }} />
        </Stack.Navigator>
    )
}
function AuthPage({ navigation }) {
    const [loading, setLoading] = useState(false)
    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [userInfo, setUserInfo] = useState([])
    const [active, setActive] = useState(false)
    const { control, formState: { errors } } = useForm()

    useEffect(() => {
        async function fetchResponse(){
            await axios.get(`${route.dev}/login`).then(res => console.log("Authentication GET Response:", res))
            .catch(err => console.log(`Can't seem to connect to login route: ${err}`))
        }
        fetchResponse();
    }, []);

    async function getLoginCredentials() {
        navigation.navigate('Home')
        try {
            setLoading(true);
            const postRequest = await axios.post(`${route.dev}/login`, { emailInput, passwordInput });
            console.log(postRequest.data);
            setUserInfo(postRequest.data)
        } catch (error) {
            console.log("Can't get login credentials at the moment", error);
        } finally {
            setLoading(false);
        }
    }    

    async function handleLogIn() {
        console.log("Logged in!")
        await getLoginCredentials(emailInput, passwordInput);
    }
    async function signInGoogle() {
        console.log("Sign in with google")
    }
    const signInGitHub = async () => {
        console.log("Direct to accounts.github.com!")
    }

    return (
        <>
            <View className='items-center gap-2 mt-1'>
                <Card mode='outlined' onPress={signInGoogle} className='rounded-none w-11/12 h-12 bg-white'>
                    <Card.Title left={() => <Avatar.Image size={24} source={require('../images/GoogleImage.jpg')} />}
                        title="Sign in with Google" className='bottom-3' />
                </Card>
                <Card mode='outlined' onPress={signInGitHub} className='rounded-none w-11/12 h-12 bg-white'>
                    <Card.Title left={() => <Avatar.Image size={24} source={require('../images/githubIcon.jpg')} />}
                        title="Sign in with GitHub" className='bottom-3' />
                </Card>
            </View>
            <Text className='text-lg font-bold m-4 mt-12'>Log in</Text>
            <View className='flex flex-col items-center gap-3'>
                <TextInput label={'Email'} onChangeText={text => setEmailInput(text)}
                    onFocus={() => setActive(!active)} mode='flat' outlineColor='gray' activeOutlineColor='gray'
                    value={emailInput} selectionColor='gray' activeUnderlineColor='transparent'
                    underlineColor='transparent' className='w-11/12 bg-gray-200' />
                <TextInput label={'Password'} secureTextEntry onChangeText={text => setPasswordInput(text)}
                    onFocus={() => setActive(!active)} mode='flat' outlineColor='gray' activeOutlineColor='gray'
                    value={passwordInput} selectionColor='gray' activeUnderlineColor='transparent'
                    underlineColor='transparent' className='w-11/12 bg-gray-200' />
            </View>
            <Form action='/login' control={control} render={() => (
                <View className='mt-5 w-11/12 justify-center left-4'>
                    <Button title='Log in' color={'black'} onPress={handleLogIn} />
                </View>
            )} />
            <View className='top-4 left-3'>
                <Text>Don't have an account?</Text>
                <Text className='text-blue-600' onPress={() => navigation.navigate('Create Profile')}>Create an account</Text>
            </View>
        </>
    )
}
/// ----FOR REFERENCE----
// try {
//     const user = await AsyncStorage.getItem("@user")
//     if(!user){
//         if(response?.type === 'success'){
//             await getUserInfo(response.authentication.accessToken)
//         }
//     } else {
//         setUserInfo(JSON.parse(user))
//     }
// } catch (error) {
//     throw error
// }
// const getUserInfo = async (token) => {
//     if(!token) return;
//     try {
//         const response = await fetch(
//             "https://www.googleapis.com/userinfo/v2/me",
//             {
//                 headers: {Authorization: `Franco ${token}`}
//             }
//         )
//         const user = await response.json()
//         await AsyncStorage.setItem("@user", JSON.stringify(user))
//         setUserInfo(user)
//     } catch (error) {
//         console.log(error)
//     }
// }
// const [request, response, promptAsync] = Google.useAuthRequest({
//     androidClientId: Constants.expoConfig.extra.androidGoogleAuthId,
//     iosClientId: Constants.expoConfig.extra.iOSGoogleAuthId,
//     webClientId: Constants.expoConfig.extra.webGoogleAuthId,
// });
// function GoogleAuthButton() {
//     useEffect(() => {
//         GoogleSignin.configure({
//             webClientId: Constants.expoConfig.extra.googleAuthID,
//         });
//     }, []);
//     const signIn = async () => {
//         try {
//             await GoogleSignin.hasPlayServices();
//             const userInfo = await GoogleSignin.signIn();
//             console.log('User Info: ', userInfo);
//         } catch (error) {
//             if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//                 console.log('User cancelled the login flow');
//             } else if (error.code === statusCodes.IN_PROGRESS) {
//                 console.log('Login already in progress');
//             } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//                 console.log('Play services not available');
//             } else {
//                 console.log('Something went wrong:', error);
//             }
//         }
//     };
//     return (
//         <GoogleSignin
//             size={GoogleSigninButton.Size.Wide}
//             color={GoogleSigninButton.Color.Dark}
//             onPress={signIn}
//         />
//     )
// }