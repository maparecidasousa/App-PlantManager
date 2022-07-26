import {Animated, StyleSheet, Text, View} from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

import { Feather } from "@expo/vector-icons";
import React from "react";
import {SvgFromUri} from "react-native-svg"
import Swipeable from "react-native-gesture-handler/Swipeable";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface PlantsProps extends RectButtonProps {
    data:{
        photo: string | null;
        name: string
       
    }
    handleRemove:()=>void;
}

export const PlantCardSecondary = ({data,handleRemove, ...rest}:PlantsProps) => {

    console.log("o que vem",data)
    return (
        <Swipeable //Permite que o usuário possa arrastar o card para direita ou esquerda. 
        overshootRight={false}
        renderRightActions={() => (
            <Animated.View>
                <View>
                    <RectButton
                    style={styles.buttonRemove}
                    onPress={handleRemove}
                    >
                    
                    <Feather
                    name="trash"
                    size={32}
                    color={colors.white}
                    />

                    

                    </RectButton>
                </View>
            </Animated.View>
        )}
        
        > 
        <RectButton style={styles.container}
         {...rest}>
            <SvgFromUri uri={data.photo}width={50} height={50} />
            <Text style={styles.title}>
                {data.name}
               
            
            </Text>
     
        
        <View style={styles.details}>
            <Text style={styles.timeLabel} >Regar as</Text>
            <Text style={styles.time} >{data.hour}</Text>
        </View>
        </RectButton>
        </Swipeable>
    );
} 

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 25,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.shape,
        marginVertical:5,
    },
    title:{
        flex: 1,
        marginLeft: 10,
        fontFamily: fonts.heading,
        fontSize:17,
        color:colors.heading,
    },

    details:{
        alignItems:'flex-end',

    },

    timeLabel:{
        fontSize:16,
        fontFamily: fonts.text,
        color: colors.body_light,
    },

    time:{
        marginTop: 5,
        fontSize:16,
        fontFamily:fonts.heading, 
        color:colors.body_dark,
    },

    buttonRemove: {
        width: 100,
        height: 85,
        backgroundColor: colors.red,
        marginTop: 15,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        right: 20,
        paddingLeft: 15
      }

});