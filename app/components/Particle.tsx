import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";

const Particle = () => {
  return (
    <View
      style={{
        flex: 1,
        height: "100%",
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
      }}
    >
      <LottieView
        style={{
          width: "100%",
          height: "100%",
        }}
        source={require("../assets/lottie/particle.json")}
        autoPlay
        loop
      />
    </View>
  );
};

export default Particle;
