import  { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

import React from "react";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface ButtonProps  extends TouchableOpacityProps { 
    title: string;
}

export function Button ( {title, ...rest}: ButtonProps ) 
 {
    return (
        <TouchableOpacity
         style={styles.container}
        {...rest}>
        <Text style={styles.button}>
        {title}</Text>
        </TouchableOpacity>
    );}
    
const styles = StyleSheet.create({
        container:{
            backgroundColor:colors.green,
            height: 56,
            borderRadius:16,
            justifyContent:'center',
            alignItems:'center',
        },
        
        button:{
            fontSize:16,
            color:colors.white,
            fontFamily:fonts.heading

}
    })