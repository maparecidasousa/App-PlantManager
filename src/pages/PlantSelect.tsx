import {
     ActivityIndicator,
     FlatList,
     StyleSheet,
     Text,
     TouchableOpacity,
     View
} from "react-native";
import React, {useEffect, useState} from "react";

import {EnviromentButton} from "../components/EnviromentButton";
import { Header } from "../components/Header";
import { Load } from "../components/Load";
import { PlantCardPrimary } from "../components/PlantCardPrimary";
import { PlantProps } from "../libs/storage";
import api from "../services/api";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import {useNavigation} from "@react-navigation/core";

interface EnviromentProps{ // interface para definir o tipo de dados que será passado para o componente typescript.
    key: string;
     title: string; 
}


export function PlantSelect() {
     const [enviroments, setEnviroments] = useState<EnviromentProps[]> ([]);// estado para armazenar os dados da API.
     const [plants, setPlants] = useState<PlantProps[]> ([]);// estado para armazenar os dados da API.
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]> ([]);// estado para armazenar os dados da API. Filtrando as plantas por ambiente.
     const [enviromentSelected, setEnviromentSelected] = useState('all');
    const [loading, setLoading] = useState(true); 
    const [page, setPage] = useState(1);//para paginação.  Vai receber o valor da página atual.
    const [loadingMore, setLoadingMore] = useState(false);//para paginação. Verifica se está carregando mais dados.
    
    const navigation = useNavigation();

    function handleEnviromentSelected(enviroment:String){ 
        setEnviromentSelected(enviroment);
        if(enviroment === 'all')
        return setFilteredPlants(plants);

        const filtered = plants.filter(plant => plant.environments.includes(enviroment));

        setFilteredPlants(filtered);
    }

    async function fetchPlants(){
        const {data} = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=10`);//a partir da interrogação é para color em ordem alfabética. A partir do segundo & é para paginação.
        
        if (!data)
            return setLoading(true);

            if (page>1){
                setPlants (oldValue => [...oldValue, ...data]);
            } else {
                setPlants(data);
                setFilteredPlants(data);
            }

        setPlants(data) 
        setLoading(false)
    } 

    function handleFetchMore (distance:number){
        if (distance < 1)
        return;
      
        setLoadingMore(true)
        setPage(oldValue => oldValue + 1);
         fetchPlants();
        setLoadingMore(false)
      }

      function handlePlantSelect(plant:PlantsProps){
        navigation.navigate('PlantSave', {plant});//navegação para plantSave passando os dados de plants da api.
      }

   useEffect(() => { // função para carregar os dados da API.
        async function fetchEnviroment(){
            const {data} = await api.get('plants_environments?_sort=title&_order=asc'); 
            setEnviroments(
                [{
                    key:'all', 
                    title:'Todos'
                },
                ...data
            ]
            )  // armazenando os dados da API na variável enviroments. 
        } 
        fetchEnviroment(); 
   }, []); 

   useEffect(() => { 
    
    fetchPlants(); 
}, []); 




if (loading){
    return <Load/>
}

    return (
        <View style={styles.container} >
            <View style={styles.header}>
           <Header />
           <Text style={styles.title} >
            Em qual ambiente
           </Text>
           <Text  style={styles.subtitle}>você quer colocar sua planta?</Text>
           </View>
            <View>
            <FlatList
            data={enviroments}
            keyExtractor={(item)=>String(item.key)} //para identificar o item da lista.
            renderItem={({item}) => (
            <EnviromentButton
             title= {item.title}   
             active={item.key === enviromentSelected}
             onPress={() =>handleEnviromentSelected(item.key)}  
               />)} 
            horizontal
            showsHorizontalScrollIndicator={false}
             contentContainerStyle={styles.enviromentList}
            />
           </View>
            <View style={styles.plants} >
                <FlatList
                data={filteredPlants}
                keyExtractor={(item)=>String(item.id)}
                renderItem={(item)=> (
                    <PlantCardPrimary data={item.item}
                    onPress={() => handlePlantSelect(item)} /> 
                    
                )}
              
                showsVerticalScrollIndicator={false}
                numColumns={2}
                onEndReachedThreshold={0.1}//Quando chegar em 10% do final da tela.
                onEndReached={({distanceFromEnd}) => handleFetchMore(distanceFromEnd)}//Quando chegar em 10% do final da tela.})}
                ListFooterComponent ={
                loadingMore
                ?<ActivityIndicator color={colors.green}/>
                : <></>}
                />
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },

    header:{
        paddingHorizontal: 30,
    },

    title:{
        fontSize: 17,
        fontWeight: 'bold',
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15  ,
    },

    subtitle:{
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading,
    },

    enviromentList:{
        height:40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32,

    },

    plants:{
       flex:1,
       paddingHorizontal:32,
       justifyContent: 'center',   
    }
});
    