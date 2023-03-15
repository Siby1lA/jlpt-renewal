import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Chapter from "../screens/Chapter";
import Kanji from "../screens/Kanji";
import Colors from "../constants/Colors";
import MyWord from "../screens/MyWord";
import Setting from "../screens/Setting";
import Web from "../screens/Web";
import Board from "../screens/Board";
import Mypage from "../screens/Mypage";
import Register from "../screens/Register";

const Nav = createNativeStackNavigator();
const Root = () => (
  <Nav.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.backColor,
      },
      headerTintColor: Colors.white,
      headerShadowVisible: false,
      headerTitleAlign: "center",
    }}
  >
    <Nav.Screen
      options={{
        headerTitle: "일단냥",
        animation: "none",
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
    <Nav.Screen
      options={{
        headerTitle: "게시판",
        animation: "none",
      }}
      name="Board"
      component={Board}
    />
    <Nav.Screen
      options={{
        headerTitle: "내 정보",
        animation: "none",
      }}
      name="Mypage"
      component={Mypage}
    />
    <Nav.Screen
      options={{
        headerTitle: "회원가입",
        animation: "none",
      }}
      name="Register"
      component={Register}
    />
  </Nav.Navigator>
);

export default Root;
