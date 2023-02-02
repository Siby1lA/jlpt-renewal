import React, { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components/native";
import { lightTheme } from "./styled";
import Navigator from "./app/navigation/Navigator";
import { Provider } from "react-redux";
import rootReducer from "./app/redux/reducer";
import { legacy_createStore as createStore } from "redux";
import styled from "styled-components/native";
import { MobileAds } from "react-native-google-mobile-ads";
// import { MobileAds } from "react-native-google-mobile-ads";

const Box = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const CharaImg = styled.Image`
  width: 120px;
  height: 175px;
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
        await new Promise((resolve: any) => setTimeout(resolve, 2000));
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
        <CharaImg source={require("./app/assets/image/chara.png")} />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={lightTheme}>
      <Provider store={store}>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </Provider>
    </ThemeProvider>
  );
}
