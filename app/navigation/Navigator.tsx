import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Chapter from "../screens/Chapter";
import Kanji from "../screens/Kanji";
import Colors from "../constants/Colors";
import MyWord from "../screens/MyWord";

const Nav = createNativeStackNavigator();

const Root = () => (
  <Nav.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.backColor,
      },
      headerBackTitleVisible: false,
      headerTintColor: Colors.white,
      headerShadowVisible: false,
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
    <Nav.Screen name="Kanji" component={Kanji} />
    <Nav.Screen name="MyWord" component={MyWord} />
  </Nav.Navigator>
);

export default Root;
