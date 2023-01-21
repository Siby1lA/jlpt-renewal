import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Chapter from "../screens/Chapter";
import Kanji from "../screens/Kanji";
import Colors from "../constants/Colors";

const Nav = createNativeStackNavigator();

const Root = () => (
  <Nav.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.backColor,
      },
      headerTintColor: Colors.white,
    }}
  >
    <Nav.Screen
      options={{
        headerShown: false,
      }}
      name="Home"
      component={Home}
    />
    <Nav.Screen name="Chapter" component={Chapter} />
    <Nav.Screen
      options={{
        headerTitle: "한자",
      }}
      name="Kanji"
      component={Kanji}
    />
  </Nav.Navigator>
);

export default Root;
