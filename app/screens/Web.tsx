import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { WebView } from "react-native-webview";
type WebScreenParams = {
  title: string;
  uri: string;
};
const Web: React.FC<NativeStackScreenProps<ParamListBase, "Web">> = ({
  route,
  navigation,
}) => {
  const { title, uri } = route.params as WebScreenParams;
  useEffect(() => {
    navigation.setOptions({
      title,
    });
  }, []);

  return <WebView source={{ uri: uri }} />;
};

export default Web;
