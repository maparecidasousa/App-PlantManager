import {
    Image,
    StyleSheet,
    Text,
    View
} from "react-native";
import React, {useEffect, useState} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import userImg from "../assets/menina.jpg";

export function Header (){
    const [userName, setUserName] = useState<string>();
    useEffect(() => {
       async function loadStorageName(){
        const user = await AsyncStorage.getItem('@plantmanager:user');
        setUserName(user || '');   }
       loadStorageName();

    }, []);
return(

    <View style={styles.container}>
        <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>{userName}</Text>
        </View>
        <Image source={userImg} style={styles.image} />
        <View>
           
        </View>
        
    </View>
   
)

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),

    },

 
    image:{
    width: 100,
    height: 90,
    marginLeft: 100,
    },

    greeting:{
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text,
    },

    userName:{
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 40,
    }


});