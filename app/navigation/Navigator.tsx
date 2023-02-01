import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Chapter from "../screens/Chapter";
import Kanji from "../screens/Kanji";
import Colors from "../constants/Colors";
import MyWord from "../screens/MyWord";
import Setting from "../screens/Setting";
import Web from "../screens/Web";

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
        headerTitle: "일단냥",
      }}
      name="Home"
      component={Home}
    />
    <Nav.Screen name="Chapter" component={Chapter} />
    <Nav.Screen name="Kanji" component={Kanji} />
    <Nav.Screen name="MyWord" component={MyWord} />
    <Nav.Screen
      options={{
        headerTitle: "설정",
      }}
      name="Setting"
      component={Setting}
    />
    <Nav.Screen name="Web" component={Web} />
  </Nav.Navigator>
);

export default Root;
