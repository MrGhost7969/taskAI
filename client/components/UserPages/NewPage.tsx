import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { Card } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { cardArr, privPageArr } from '../exports/exports';

type RootStackParamList = {
    Home: undefined,
    Page: {pageTitle: string, pageContent?: string, pageURI?: string}
}
interface NewPageProps {
    navigation: StackNavigationProp<RootStackParamList, 'Page'>;
    route: RouteProp<RootStackParamList, 'Page'>;
    propArr: any[];
    // add onPress
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const PageStacks: React.FC<NewPageProps> = ({route}) => {
    return(
        <Stack.Navigator>
            <Stack.Screen name='Page' component={NewPage} initialParams={route.params}
            options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

const NewPage: React.FC<NewPageProps> = ({ route }) => {
    const { pageTitle, pageURI } = route.params;
    return (
        <>
            <Image source={{uri: pageURI}} style={{width: '100%', height: 120}}/>
            <Roles roles={[{ name: 'Admin', key: 0 }]} />
            <Text style={{fontSize: 35, left: 15, width: '95%', height: 150}}>{pageTitle}</Text>
            <Text style={{top: 15, left: 15, width: '95%'}}>Page content!</Text>
        </>
    );
};

export const RowOfCards: React.FC<NewPageProps> = ({navigation, propArr}) => {
    function navigateToPage(title: string, uri: string){ 
        console.log("Go to page")
        navigation.navigate('Page', { pageTitle: title, pageURI: uri })
    }

    function navigateToPrivatePage(title: string, uri: string) { 
        console.log("Go to private page")
        navigation.navigate('Page', { pageTitle: title, pageURI: uri })
    }
    return(
        <>
            <FlatList
                className="flex-row gap-5 m-2"
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 400 }}
                horizontal={true}
                data={propArr}
                keyExtractor={(item, index) => item.title + index}
                renderItem={({ item }) => (
                    <Card className="ml-1 mr-6 top-0 left-0 bg-white" style={{ width: 150, height: "50%" }}
                    onPress={() => navigateToPage(item.title, item.uri)} key={item.title}>
                        <Card.Cover source={{ uri: item.uri }} style={{ width: '100%', height: '70%' }} />
                        <Card.Title title={item.title.length > 35 ?
                            item.title.substring(0, Math.min(item.title.length, 10)).concat("...")
                            : item.title} style={{ height: '20%', width: "100%" }} />
                    </Card>
                )}
                onEndReachedThreshold={0.5}
            />
        </>
    )
}
const Roles = ({ roles }: { roles: [{ name: string; key?: any }] }) => {
    return <Text>{roles[0].name}</Text>;
};


export default PageStacks