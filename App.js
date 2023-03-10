import React, { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components/native";
import Navigator from "./app/navigation/Navigator";
import { Provider } from "react-redux";
import rootReducer from "./app/redux/reducer";
import { legacy_createStore as createStore } from "redux";
import styled from "styled-components/native";
import { MobileAds } from "react-native-google-mobile-ads";
import { lightTheme } from "./styled";
import LottieView from "lottie-react-native";
// import { MobileAds } from "react-native-google-mobile-ads";

const Box = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export default function App() {
  const store = createStore(rootReducer);
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "K-Gothic": require("./ios/Fonts/K-Gothic.ttf"),
        });
        MobileAds()
          .initialize()
          .then((adapterStatuses) => {
            // Initialization complete!
          });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);
  if (!appIsReady) {
    return (
      <Box onLayout={onLayoutRootView}>
        <LottieView
          style={{
            width: "30%",
          }}
          source={require("./app/assets/lottie/splash.json")}
          autoPlay
          loop
        />
      </Box>
    );
  }

  return (
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}
