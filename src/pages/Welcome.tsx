import {
   Dimensions,
   Image,
   SafeAreaView,
   StyleSheet,
   Text,
   TouchableOpacity
} from "react-native";

import Entypo from "@expo/vector-icons/Entypo";
import React from "react";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import {useNavigation} from '@react-navigation/core'
import wateringImg from "../assets/watering.png";

export function Welcome() {
const navigation = useNavigation();

function  handleStart() {
   navigation.navigate("UserIdentification"); 
}

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Gerencie {'\n'} 
      suas plantas de {'\n'} forma fácil</Text>
      <Image
       source={wateringImg}
        style={styles.image}
        resizeMode="contain"
         />
      <Text  style={styles.subtitle}>
        {" "}
        Não esqueça mais de regar suas {'\n'} plantas. 
        Nós cuidamos de lembrar você {'\n'} sempre que precisar.
      </Text>
        <TouchableOpacity
         style={styles.button}
          activeOpacity={0.8}
          onPress={handleStart}>

                <Entypo 
                name="chevron-thin-right" 
                style={styles.buttonIcon} />
          
        </TouchableOpacity>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'space-around',
        alignItems:'center'
    },

    title:{
      fontSize:30,
      fontWeight:'bold',
      fontFamily: fonts.heading,
      textAlign: 'center',
      color: colors.heading,
      marginTop:29,
      lineHeight:40
    },

    subtitle:{
      fontFamily: fonts.text,
      textAlign:'center',
      fontSize:18,
      paddingHorizontal: 20,
      color:colors.heading
    },

    image:{
      height: Dimensions.get('window').width * 0.7
    },
     

    button:{
      backgroundColor:colors.green,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:16,
      marginBottom:10,
      height: 40,
      width: 100
    },

    buttonIcon:{
color:colors.white,
fontSize:20
    }
})