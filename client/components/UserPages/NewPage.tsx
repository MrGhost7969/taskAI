import React, { ReactNode } from 'react';
import { View, Text, Image, FlatList, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

type RootStackParamList = {
    Home: undefined,
    CreatePage: {
        pageTitle: string, 
        pageContent: string | ReactNode, 
        pageURI: string
    },
}
interface NewPageProps {
    navigation: StackNavigationProp<RootStackParamList, 'CreatePage'>;
    route: RouteProp<RootStackParamList, 'CreatePage'>;
    propArr: any[];
    onPress: (title?: string, content?: string, uri?: string) => void;
    subtitle?: string
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const PageStack: React.FC<NewPageProps> = ({ route }) => {
    const { pageTitle, pageContent, pageURI } = route.params;
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="CreatePage"
          component={NewPage}
          initialParams={{ pageTitle, pageContent, pageURI }} // Pass all params here
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };
  

const NewPage: React.FC<NewPageProps> = ({ route }) => {
    const { pageTitle, pageContent, pageURI } = route.params;
    console.log('Page Title: ', pageTitle);
    console.log('Page Content: ', pageContent);
    console.log('Page URI: ', pageURI);

    function isFunctionComponent(component: ReactNode) {
        return (
            typeof component === 'function' && 
            String(component).includes('return React.createElement')
        )
    }

    return (
        <>
            <Image source={{ uri: pageURI }} style={{ width: '100%', height: 130 }} />
            <Text style={{ fontSize: 35, left: 15, top: 15, width: '95%', height: 150 }} className='font-bold'>{pageTitle}</Text>
            <ScrollView className='w-full h-full flex-col' contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
                <View>
                    {isFunctionComponent(pageContent) ? (
                        // If pageContent is a function component (React component), render it directly
                        <>
                            {pageContent}
                        </>
                    ) : (
                        // If pageContent is a string, render it as text
                        <Text className='left-4 z-10 h-full w-full'>{pageContent}</Text>
                    )}
                </View>
            </ScrollView>
        </>
    );
};

export const RowOfCards: React.FC<NewPageProps> = ({propArr, onPress}) => {
    if (!propArr || propArr.length === 0) {
        return <Text>No pages available.</Text>;
    }
    console.log("propArr: ", propArr);
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
                    onPress={() => onPress(item.title, item.content, item.uri)} key={item.title}>
                        <Card.Cover source={{ uri: item.uri }} style={{ width: '100%', height: '70%' }} alt='Cover'/>
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
export const PageColumn: React.FC<NewPageProps> = ({propArr, subtitle, onPress}) => {
    return propArr.map((item, key) => (
        <Card mode='elevated' key={key} onPress={() => onPress(item.title, item.content, item.uri)} style={{ backgroundColor: 'white', borderRadius: 15, marginBottom: 6, marginTop: 7 }}>
            <Card.Title
                title={item.title}
                subtitle={`in ${subtitle}`}
            />
        </Card>
    ))
}
const Roles = ({ roles }: { roles: [{ name: string; key?: any }] }) => {
    return <Text>{roles[0].name}</Text>;
};


export default PageStack