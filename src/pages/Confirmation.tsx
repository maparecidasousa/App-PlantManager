import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";

import { Button } from "../components/Button";
import React from "react";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface params {
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: 'smile' | 'hug';
  nextScreen: string;
}

const emojis ={
  hug: '🤗',
  smile: '😊'
}

export function Confirmation() {
  const navigation = useNavigation();
  const routs = useRoute()  

  const { title, subtitle, buttonTitle, icon, nextScreen } = routs.params as params;

  function handleMoveOn() {
    navigation.navigate(nextScreen);
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>{emojis[icon]}</Text>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.subtitle}>
         {subtitle}
        </Text>
        <View style={styles.footer}>
          <Button title="Começar" onPress={handleMoveOn} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
  },

  emoji: {
    fontSize: 80,
  },

  title: {
    fontSize: 26,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginTop: 20,
  },

  subtitle: {
    fontFamily: fonts.text,
    fontSize: 19,
    textAlign: "center",
    color: colors.heading,
    paddingVertical: 20,
  },

  footer: {
    width: "100%",
    paddingHorizontal: 75,
    paddingVertical: 20,
  },
});
