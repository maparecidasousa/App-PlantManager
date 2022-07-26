import { Alert, FlatList, Image, StyleSheet, Text, View } from "react-native";
import { PlantProps, loadPlant, removePlant } from "../libs/storage";
import React, { useEffect, useState } from "react";

import { Header } from "../components/Header";
import { Load } from "../components/Load";
import { PlantCardSecondary } from "../components/PlantCardSecondary";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { formatDistance } from "date-fns";
import { pt } from "date-fns/locale";
import waterdrop from "../assets/waterdrop.png";

export function MyPlants() {
  // const[] = useState<PlantProps[]>([]);
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]); // estado para as plantas do usuário.
  const [loading, setLoading] = useState(true); //Simular o carregamento da lista de plantas.
  const [nextWaterd, setNextWatered] = useState(String()); //Para mostrar o próximo momento de água.

  function handleRemove(plant: PlantProps) {
    console.log("veio",plant)
    Alert.alert("Remover", `Deseja remover a ${plant.item.name}?`, [
      {
        text: "Não 🙏🏻",
        style: "cancel",
      },
      {
        text: "Sim 😥",
        onPress: async () => {
          try {
            await removePlant(plant.item.id);

            setMyPlants((oldData) =>
              oldData.filter((item) => item.id !== plant.id)
            );
          } catch (error) {
        
            Alert.alert("Não foi possível remover! 😥");
          }
        },
      },
    ]);
  }

  useEffect(() => {
    //Para carregar a lista de plantas.
    async function loadStorageData() {
      //Para carregar os dados do storage.
      const plantsStoraged = await loadPlant();
      console.log("veio", plantsStoraged);
      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(), //Para pegar o tempo de água da primeira planta.
        new Date().getTime(), //Para pegar o tempo atual.
        { locale: pt } // formatar data no formato pt-br.
      );
      setNextWatered(
        `Não esqueça de regar a ${plantsStoraged[0].name} ás ${nextTime} horas` //Para mostrar o próximo momento de água.
      );

      setMyPlants(plantsStoraged); //Para carregar a lista de plantas.
      setLoading(false); //Para parar o carregamento da lista de plantas.
    }

    loadStorageData(); //Para carregar os dados do storage.
  }, []);

  if (loading) return <Load />; // if (loading) return <Load/> //Para simular o carregamento da lista de plantas.

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.spotLight}>
        <Image style={styles.spotLightImage} source={waterdrop} />

        <Text style={styles.spotLightText}>
          {" "}
          Não esqueça de regar as frutiferas à aproximadamente 17 horas.
        </Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Próximas regadas</Text>

        <FlatList
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardSecondary
              data={item}
              handleRemove={() => {
                handleRemove(item);
              }}
            />
          )}
          showsVerticalScrollIndicator={false} //Para não mostrar o indicador de scroll.
          contentContainerStyle={{ flex: 1 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 50,
    paddingTop: 50,
    backgroundColor: colors.background,
  },

  spotLight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    paddingVertical: 20,
    height: 110,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  spotLightImage: {
    width: 60,
    height: 60,
  },

  spotLightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
    textAlign: "justify",
  },

  plants: {
    flex: 1,
    width: "100%",
  },

  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    fontWeight: "bold",
    color: colors.heading,
    marginVertical: 20,
  },
});
