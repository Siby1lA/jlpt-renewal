import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";

const Particle = () => {
  const [isAnimating, setIsAnimating] = useState(true);

  const handleAnimationEnd = () => {
    setTimeout(() => {
      setIsAnimating(false);
      setIsAnimating(true);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {isAnimating && (
        <>
          <ConfettiCannon count={100} origin={{ x: -20, y: 0 }} />
          <ConfettiCannon
            count={100}
            origin={{ x: 400, y: 0 }}
            autoStartDelay={500}
            onAnimationEnd={handleAnimationEnd}
          />
        </>
      )}
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
