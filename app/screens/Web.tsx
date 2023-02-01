import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { WebView } from "react-native-webview";

const Web: React.FC<NativeStackScreenProps<any, "Web">> = ({
  route,
  navigation,
}) => {
  const { title, uri }: string | any = route.params;
  useEffect(() => {
    navigation.setOptions({
      title,
    });
  }, []);

  return <WebView source={{ uri: uri }} />;
};

export default Web;
