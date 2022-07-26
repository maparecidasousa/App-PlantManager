import {
    Alert,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import DateTimePicker, {Event} from "@react-native-community/datetimepicker";
import { PlantProps, savePlant } from "../libs/storage";
import React, {useState} from "react";
import { format, isBefore } from "date-fns";
import{useNavigation, useRoute} from "@react-navigation/core"

import {Button} from "../components/Button";
import { SvgFromUri } from "react-native-svg";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import {getBottomSpace} from "react-native-iphone-x-helper"
import waterdrop from "../assets/waterdrop.png";

interface Params{ // interface para definir o tipo de dados que será passado para o componente typescript.
    plant: PlantProps 
}

export function PlantSave(){
const [selectedDateTime, setSelectedDateTime] = useState( new Date());
const [showDatePicker, setShowDatePicker] = useState (Platform.OS === 'ios')

const route = useRoute();
const {plant} = route.params as Params; // pegar dados da seleção realizada na página anterior.

const navigation = useNavigation();


function handleChangeTime(event: Event, dateTime: Date | undefined) {
    if(Platform.OS === "android"){
        setShowDatePicker ((oldState) => !oldState); // para ocultar o datepicker
    }

    if(dateTime && isBefore( dateTime, new Date())){ //para evitar selecionar uma data, horário que já passou.
        setSelectedDateTime(new Date());
        return Alert.alert('Escolha uma hora no futuro');
    }

    if (dateTime) setSelectedDateTime(dateTime);
    
}

function handleOpenDateTimePickerForAndroid(){
    setShowDatePicker((oldState) => !oldState); 
}

   async function handleSave(){
      
        try{
            await savePlant({
                ...plant,
                dateTimeNotification: selectedDateTime});
        

        navigation.navigate("Confirmation",  {
            title:"Tudo certo",
            subtitle: "Fique tranquilo que sempre lembraremos você de cuidar de suas plantinhas.",
            buttonTitle:"Muito obrigado",
            icon: "hug", 
            nextScreen:"MyPlants"
      
           }); 

        }catch(err){
            console.log("vai",err);
            Alert.alert("Erro ao salvar plantinha");
           
        }
    
    
    }

    return(
        <ScrollView  
        showsVerticalScrollIndicator={false}
        style={styles.container1}>
        <View  style={styles.container}>
        <View style={styles.plantInfo}>
            <SvgFromUri
            uri={plant.item.photo}
            height={150}
            width={150}
            />
            <Text style={styles.plantName} >
                {plant.item.name}
            </Text>
            <Text style={styles.plantAbout} >
              {plant.item.about}
            </Text>
        </View>
        <View style={styles.controller}>
            <View  style={styles.tipContainer}>
                <Image
                source={waterdrop}
                style={styles.tipImage}
                />
                <Text style={styles.tipText}>
                {plant.item.water_tips}                </Text>
            </View>
            <Text  style={styles.alertLabel}>
                Escolha o melhor horário para ser lembrado.
            </Text>
            {showDatePicker && ( // para mostrar o datepicker apenas no ios
            <DateTimePicker
            
            style={styles.dateTimePickerButton2}
            value={selectedDateTime}
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleChangeTime}


            />)}

            {  
                Platform.OS === 'android' && (
                    
                 <TouchableOpacity 
                 style={styles.dateTimePickerButton}
                 onPress = {handleOpenDateTimePickerForAndroid}>
                    <Text style = { styles.dateTimePickerText}>
                    {`Lembrar de  ${format(selectedDateTime, 'HH:mm')}`} {/* para mostrar o horário selecionado */}
                    </Text>


                 </TouchableOpacity>
                    
                )}
            <Button
            title="Cadastrar planta"
            onPress={handleSave}
            />
        </View>
        </View>
        </ScrollView>
    )
}
 
const styles = StyleSheet.create({

    container1: {
        flex: 1,
        backgroundColor: colors.shape,
    },

    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: colors.shape,
    },

    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.shape,
    },

    controller:{
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20,
    },

    plantName:{
        fontFamily: fonts.heading,
        fontWeight: "bold",
        fontSize: 24,
        color: colors.heading,
        marginTop: 15,
    },

    plantAbout:{
        textAlign: "center",
        fontSize: 17,
        marginTop: 10,
        fontFamily: fonts.text,
        color:colors.heading,
    },

    tipContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: "relative",
        bottom: 60,
    },
    tipImage:{
        width: 56,
        height: 56,
    },

    tipText:{
        flex: 1,
        marginLeft:20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: "justify",
    },

    alertLabel:{
        textAlign: "center",
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize:12,
        marginBottom:5,
    },

    dateTimePickerButton:{
        width: "100%",
        alignItems: "center",
        paddingVertical: 40,
    },

  

    dateTimePickerText:{
        color:colors.heading,
        fontSize:24,
        fontFamily:fonts.text
    },


}   );