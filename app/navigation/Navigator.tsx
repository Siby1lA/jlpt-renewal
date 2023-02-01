import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Chapter from "../screens/Chapter";
import Kanji from "../screens/Kanji";
import Colors from "../constants/Colors";
import MyWord from "../screens/MyWord";
import { Ionicons } from "@expo/vector-icons";
import { Alert } from "react-native";

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
      headerRight: () => (
        <Ionicons
          onPress={() => Alert.alert("This is a button!")}
          name="settings-sharp"
          size={26}
          color="#ecf0f1"
        />
      ),
    }}
  >
    <Nav.Screen
      options={{
        headerTitle: "일단냥",
        headerLeft: () => (
          <Ionicons
            onPress={() => Alert.alert("準備してるにゃん")}
            name="ios-cart"
            size={26}
            color="#ecf0f1"
          />
        ),
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
