import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import LottieView from "lottie-react-native";
import styled from "styled-components/native";

const Box = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

type WebScreenParams = {
  title: string;
  uri: string;
};

const Web: React.FC<NativeStackScreenProps<ParamListBase, "Web">> = ({
  route,
  navigation,
}) => {
  const { title, uri } = route.params as WebScreenParams;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      title,
    });
  }, []);

  return (
    <>
      {loading && (
        <Box>
          <LottieView
            style={{
              width: "30%",
            }}
            source={require("../assets/lottie/splash.json")}
            autoPlay
            loop
          />
        </Box>
      )}
      <WebView
        source={{ uri: uri }}
        onLoad={() => setLoading(false)}
        style={{ opacity: loading ? 0 : 1 }}
      />
    </>
  );
};

export default Web;
