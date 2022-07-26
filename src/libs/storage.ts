import * as Notifications from "expo-notifications";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";

export interface PlantProps {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  };
  dateTimeNotification: Date;
  hour: string;
}

export interface StoragePlantProps {
  [id: string]: {
    data: PlantProps;
    notificationId: string;
  };
}

export async function savePlant(plant: PlantProps): Promise<void> {
  try {
    const nextTime = new Date(plant.dateTimeNotification); // para envio de notificação
    const now = new Date();

    const { times, repeat_every } = plant.item.frequency;

    if (repeat_every === "week") {
      const interval = Math.trunc(7 / times);
      nextTime.setDate(now.getDate() + interval);
    }
    // else {
    //   nextTime.setDate(nextTime.getDate() + 1)
    // }

    const seconds = Math.abs(
      Math.ceil(now.getTime() - nextTime.getTime()) / 1000
    );

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Heeey, 🌱",
        body: `Está na hora de cuidar da sua ${plant.name}`,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        data: {
          plant,
        },
      },
      trigger: {
        seconds: seconds < 60 ? 60 : seconds,
        repeats: true,
      },
    });

    const data = await AsyncStorage.getItem("@plantmanager:plants");
    const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {};
    const newPlants = {
      [plant.item.id]: {
        data: plant,
        notificationId,
      },
    };
    await AsyncStorage.setItem(
      "@plantmanager:plants",
      JSON.stringify({ ...newPlants, ...oldPlants })
    );
  } catch (error) {
    throw new Error(error);
  }
}

export async function loadPlant(): Promise<PlantProps[]> {
  try {
    const data = await AsyncStorage.getItem("@plantmanager:plants");
    const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    const plantsSorted = Object.keys(plants)
      .map((plant) => {
        return {
          //retorna um objeto com data e hora
          ...plants[plant].data, //pega o data do objeto
          hour: format(
            new Date(plants[plant].data.dateTimeNotification),
            "HH:mm"
          ), //formata a hora
        };
      })

      .sort((a, b) =>
        Math.floor(
          //pega o valor inteiro da hora
          new Date(a.dateTimeNotification).getTime() / 1000 - //pega o timestamp da data e divide por 1000 para converter para segundos e subtrai a hora atual  para saber a diferença de tempo entre as duas datas e retorna o valor inteiro da diferença de tempo em segundos .
            Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
        )
      );

    return plantsSorted;
  } catch (error) {
    throw new Error(error);
  }
}

export async function removePlant(id: string): Promise<void> {
  //função para remover o plant, chamada no myplants.
  const data = await AsyncStorage.getItem("@plantmanager:plants");

  const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

  await Notifications.cancelScheduledNotificationAsync(plants[id].notificationId);
  delete plants[id];

  await AsyncStorage.setItem("@plantmanager:plants", JSON.stringify(plants));
}
