import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { JokeType } from "../types/JokeType";
import FlipCard from "react-native-flip-card";
import randomColors from "../assets/colorPairs.json";

enum CardSide {
  front,
  back,
}

type JokeProps = {
  joke: JokeType;
};

type ColorPair = {
  background: string;
  text: string;
};

const colorTemplate = "#XXXXXX";

export default function Joke({ joke }: JokeProps) {
  const [randomColorPair, setRandomColor] = useState<ColorPair>({
    background: "#222",
    text: "#eee",
  });

  useEffect(() => {
    const backgroundColor = colorTemplate.replaceAll("X", (x) =>
      Math.floor(Math.random() * 9).toString()
    );
    setRandomColor({ background: backgroundColor, text: "#fffecb" });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.insideContainer}>
        <FlipCard
          style={{
            ...styles.flipCard,
            backgroundColor: randomColorPair.background,
          }}
          flipHorizontal={true}
          flipVertical={false}
        >
          <View style={styles.side}>
            <Text
              style={{
                ...styles.title,
                color: randomColorPair.text,
              }}
            >
              {joke.setup}
            </Text>
          </View>
          <View style={styles.side}>
            <Text
              style={{
                ...styles.title,
                color: randomColorPair.text,
              }}
            >
              {joke.punchline}
            </Text>
          </View>
        </FlipCard>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    backgroundColor: "#111",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  insideContainer: {
    height: (Dimensions.get("window").width * 80) / 100,
    width: (Dimensions.get("window").width * 80) / 100,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  flipCard: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    height: 10,
    borderRadius: 25,
    padding: (Dimensions.get("window").width * 5) / 100,
  },
  side: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});
