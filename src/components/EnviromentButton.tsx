import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { StyleSheet, Text } from "react-native";

import React from "react";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface EnviromentButtonProps extends RectButtonProps {
    title: string;
    active?: boolean;
}


export function EnviromentButton({ 
    title,
    active=false,
     ...rest }
    : EnviromentButtonProps) {
    return (
        <RectButton style={[
            styles.container,
            active && styles.containerActive
            ]} {...rest}>
            <Text style={[
                styles.text,
                active && styles.textActive
                ]}>{title}</Text>
        </RectButton>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:colors.shape,
        width:90,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginHorizontal:5,
        },

        containerActive:{
            backgroundColor: colors.green_light,

        },

         text: {
        color: colors.heading,
        fontFamily: fonts.text,},

        textActive: {
            fontFamily: fonts.heading,
            fontWeight: 'bold',
            color: colors.green_dark,}


}); 