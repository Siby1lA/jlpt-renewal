import React from "react";
import { View, StyleSheet } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
const Particle = () => {
  return (
    <View style={styles.container}>
      <ConfettiCannon count={100} origin={{ x: -20, y: 0 }} />
      <ConfettiCannon
        count={100}
        origin={{ x: 400, y: 0 }}
        autoStartDelay={500}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Particle;
