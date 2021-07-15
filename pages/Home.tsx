import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Dimensions,
  StyleSheet,
  StatusBar,
} from "react-native";
import Joke from "../components/Joke";
import { JokeType } from "../types/JokeType";

export default function Home() {
  const [jokes, setJokes] = useState<JokeType[]>([]);

  const loadJokes = () => {
    axios
      .get("https://official-joke-api.appspot.com/random_ten")
      .then((response) => {
        const newJokes = response.data.filter(
          (item: JokeType) => !jokes.some((joke) => joke.id === item.id)
        );
        setJokes([...jokes, ...newJokes]);
      });
  };

  useEffect(() => {
    loadJokes();
  }, []);
  return (
    <View style={styles.container}>
      {jokes.length === 0 ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <FlatList
            data={jokes}
            renderItem={({ item, index }) => <Joke joke={item} key={item.id} />}
            showsVerticalScrollIndicator={false}
            snapToInterval={Dimensions.get("window").height}
            snapToAlignment="start"
            decelerationRate="fast"
            style={styles.list}
            onEndReached={loadJokes}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000000",
  },
});
