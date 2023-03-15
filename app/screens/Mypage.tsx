import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
import BottomTab from "../components/BottomTab";

const Mypage: React.FC<NativeStackScreenProps<ParamListBase, "Mypage">> = ({
  route,
  navigation,
}) => {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          // onPress={() => navigation.navigate("Setting")}
          name="duplicate"
          size={24}
          color="#ecf0f1"
        />
      ),
    });
  }, []);
  return (
    <>
      <Text>마이 페이지</Text>
      <BottomTab />
    </>
  );
};

export default Mypage;
