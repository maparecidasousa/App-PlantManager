import { Alert, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import React, { useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage"
import {Button} from "../components/Button";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import {useNavigation} from '@react-navigation/core'

export function UserIdentification() {

  // O estado focused foi criado para controlar o foco do input,
  // as funções handleInputBlur e handleInputBlur são responsáveis por mudar o estado do input.
 
const [isFocused, setIsFocused] = useState(false); // isFocused é um estado que controla o foco do input.
const [isFilled, setIsFilled] = useState(false); // O estado isFilled foi criado para controlar o preenchimento do input.
const [name, setName] = useState<string>();// O estado name foi criado para armazenar o valor do input.
const navigation = useNavigation();


  function handleInputBlur(){ 
setIsFocused(false);
setIsFilled (!!name);// O !!name é uma expressão que verifica se o valor do input é diferente de nulo. Se tiver conteudo no name continuar verde.
  }

  function handleInputFocus(){
    setIsFocused(true);
  }

  function handleInputChange(value: string){
    setIsFilled (!!value)//verifica se o valor do input é diferente de vazio
    setName(value);
  }
 
  async function  handleSubmit() {
    if(!name){
       return Alert.alert('Me diz como chamar você 😥'); 
    
    }
    try{
    await AsyncStorage.setItem('@plantmanager:user', name);
     navigation.navigate("Confirmation",  {
      title:"Prontinho",
      subtitle: "Agora vamos começar a cuidar das suas plantinhas com muito cuidado.",
      buttonTitle:"Começar",
      icon: "smile", 
      nextScreen:"PlantSelect"

     }); 
    } catch{
      Alert.alert('Não foi possível salvar o nome 😥');
    }
  }

 
  return (
    <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS ==="ios" ? "padding" : "height"}
        >
          {/* Com  isso o usuário não precisa clicar para esconder o teclado. Basta cliqcar em qualquer local da tela. */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} > 
          

      <View style={styles.content}>
        <View style={styles.form}>
        <View  style={styles.header}>
          <Text style={styles.emoji}>
         
           {isFilled ? '😀' : '😊'}
            </Text>
            <Text style={styles.title}>
                Como podemos {'\n'} chamar você?
            </Text>
            </View>
            <TextInput
            // o style está em um array para passar mais de um estilo
            style={[styles.input,
            (isFocused || isFilled ) && {borderColor: colors.green}]}
            placeholder="Digite um nome"
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            onChangeText={handleInputChange}

            />
            <View style={styles.footer}>
              <Button
              title="Confirmar"
              onPress={handleSubmit}
              />
              </View>
        </View>
      
      </View>
      </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
  },

  content:{
    flex:1,
    width: '100%',

  },

  form:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  header:{
    alignItems: 'center',
    },

  emoji:{
    fontSize: 40,
  },

  input:{
    borderBottomWidth: 1,
    borderColor:colors.gray,
    width: '80%',
    fontSize: 18,
    marginTop:50,
    padding: 10,
    textAlign: 'center',


  },

  title:{
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop:20,
  },

  footer:{
    width: '70%',
    marginTop:50,
    paddingHorizontal: 10,
  }



});
