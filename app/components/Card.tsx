import { useEffect, useRef, useState } from "react";
import { Animated, PanResponder, Platform, Text, View } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setHiragana, setImi, setUpdate } from "../redux/actions/TriggerAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Tts from "react-native-tts";
import Particle from "./Particle";
import { RootState } from "../redux/reducer";
import LottieView from "lottie-react-native";
import CardBtn from "./CardBtn";
import { dateFormat } from "../utils/date";

// import {
//   AdEventType,
//   InterstitialAd,
//   TestIds,
// } from "react-native-google-mobile-ads";

const Wrapper = styled(Animated.createAnimatedComponent(View))<{
  valid: boolean;
}>`
  background-color: ${(props) => props.theme.cardColor};
  width: 86%;
  height: 97%;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  box-shadow: ${(props) =>
    props.valid
      ? "1px 1px 5px rgba(0, 0, 0, 1)"
      : "1px 1px 5px rgba(0, 0, 0, 0.2)"};
  elevation: 5;
  position: absolute;
  flex: 1;
  overflow: hidden;
`;
const CardContainer = styled.View`
  flex: 1;
  align-items: center;
  shadow-offset: {
    width: 1;
    height: 1;
  }
  shadow-opacity: 0.2;
  shadow-radius: 10px;
  elevation: 5;
  justify-content: center;
  align-items: center;
  padding-top: 5%;
`;

const Wrap = styled.View`
  flex: 1;
`;

const KanjiText = styled.Text`
  font-family: "K-Gothic";
  font-size: 60px;
  margin: 5px 0px;
  color: ${(props) => props.theme.wordColor};
`;

const KanjiImiText = styled.Text`
  font-size: 20px;
  color: ${(props) => props.theme.wordColor};
`;
const HuriganaText = styled.Text`
  font-family: "K-Gothic";
  font-size: 20px;
  color: ${(props) => props.theme.wordColor};
`;
const CountText = styled.Text`
  font-family: "K-Gothic";
  position: absolute;
  bottom: 5px;
  font-size: 14px;
  color: gray;
`;
const KanjiWrap = styled.View`
  flex: 4;
  align-items: center;
  justify-content: center;
`;
const ReibunWrap = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${(props) => props.theme.rbColor};
  align-items: center;
  justify-content: center;
  padding: 10px 0px;
  padding-bottom: 30px;
`;
const ReinunText = styled.Text`
  font-family: "K-Gothic";
  color: ${(props) => props.theme.wordColor};
  font-size: 20px;
`;
const ReibunFurigana = styled(ReinunText)`
  font-family: "K-Gothic";
  color: #f48fb1;
  font-size: 14px;
  margin-bottom: 5px;
`;
const ReibunImiText = styled.Text`
  color: ${(props) => props.theme.wordColor};
  font-size: 20px;
  margin-top: 7px;
`;
const ReibunBox = styled.View`
  margin: 0px 10px;
  align-items: center;
`;
const FavoritesWrap = styled.TouchableOpacity`
  position: absolute;
  right: 30px;
  top: -4px;
`;
const FavoritesText = styled.Text`
  font-size: 12px;
  margin-top: 5px;
  color: #27272a;
`;
const FavoritesIcon = styled.View`
  align-items: center;
`;
const IconWrap = styled.View`
  position: absolute;
  right: -30px;
`;
const IconWrapReibun = styled.View`
  position: absolute;
  right: 10px;
  bottom: 10px;
`;
const CharaImg = styled.Image`
  position: absolute;
  left: 10px;
  top: -42px;
  width: 70px;
  height: 42px;
`;

const CompleteWrap = styled.TouchableOpacity`
  display: flex;
  height: 97%;
  justify-content: center;
  align-items: center;
`;
const LiceneWrap = styled.View<{
  valid: boolean;
}>`
  flex-direction: row;
  box-shadow: ${(props) =>
    props.valid
      ? "1px 1px 5px rgba(0, 0, 0, 1)"
      : "1px 1px 5px rgba(0, 0, 0, 0.2)"};
  margin-bottom: 50%;
`;
const LiceneLeft = styled.View`
  background-color: ${(props) => props.theme.liceneColor};
  width: 33%;
  height: 100%;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  margin-bottom: 30%;
  elevation: 5;
`;
const LiceneContent = styled.View`
  position: relative;
  background-color: ${(props) => props.theme.cardColor};
  width: 53%;
  height: 100%;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  overflow: hidden;
  margin-bottom: 30%;
  elevation: 5;
`;
const CompleteGrad = styled.Text`
  text-align: center;
  font-size: 80px;
  font-weight: 600;
  color: #2d3436;
`;

const CompletePage = styled.Text`
  text-align: center;
  font-size: 50px;
  font-weight: 600;
  color: #2d3436;
`;

const CompleteKanryo = styled.Text`
  padding: 15px;
  right: 10px;
  bottom: 10px;
  position: absolute;
  font-family: "K-Gothic";
  text-align: center;
  font-size: 80px;
  font-weight: 600;
  margin-top: 10px;
  color: #f78fb3;
  border-radius: 57px;
  border-width: 2px;
  border-color: #f78fb3;
  transform: rotateZ(-30deg);
`;

const LottieWrap = styled.View`
  position: absolute;
  bottom: 10%;
  left: 40%;
  width: 130%;
  height: 100%;
  z-index: 0;
  transform: scaleX(-1); /* 좌우 반전 */
`;

const CompleteText = styled.Text`
  font-family: "K-Gothic";
  font-size: 18px;
  padding-top: 20px;
  text-align: center;
  color: #2d3436;
`;

const CompleteDay = styled.Text`
  font-family: "K-Gothic";
  font-size: 14px;
  color: #2d3436;
  position: absolute;
  right: 5%;
  bottom: 5%;
`;

interface IKanjiData {
  hurigana: string[];
  imi: string[];
  reibun: string[];
  kanji: string[];
  reibunImi: string[];
  reibunFurigana: string[];
}

interface IKanji {
  data: IKanjiData;
  pop: () => void;
  viewed: boolean;
  myword: boolean;
  title?: string;
  page?: string;
}

let count: number = 0;
// const unitId =
//   Platform.OS === "ios"
//     ? "ca-app-pub-8661339697648826/5434811422" //ios unitId
//     : "ca-app-pub-8661339697648826/3160753878"; // android unitId
// const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
//   requestNonPersonalizedAdsOnly: true,
//   keywords: ["japan", "word"],
// });

const Card = ({
  data: KanjiData,
  pop,
  viewed,
  myword = false,
  title,
  page,
}: IKanji) => {
  const [index, setIndex] = useState<number>(0);
  const [state, setState] = useState<number>(0);
  const [valid, setValid] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [shot, setShot] = useState<boolean>(false);
  const { isHiragana, isImi, isReibun, isReset, isUpdate, isMovePage } =
    useSelector((state: RootState) => state.Trigger);
  const dispatch = useDispatch();
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.Value(0)).current;
  const rotation = position.interpolate({
    inputRange: [-250, 250],
    outputRange: ["-15deg", "15deg"],
  });

  const secondScale = position.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [1, 0.7, 1],
    extrapolate: "clamp",
  });

  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });

  const onPressIn = Animated.spring(scale, {
    toValue: 0.95,
    useNativeDriver: true,
  });

  const goCenter = Animated.spring(position, {
    toValue: 0,
    useNativeDriver: true,
  });

  const goLeft = Animated.spring(position, {
    toValue: -500,
    tension: 5,
    useNativeDriver: true,
    restDisplacementThreshold: 300,
    restSpeedThreshold: 500,
  });

  const goRight = Animated.spring(position, {
    toValue: 500,
    tension: 5,
    useNativeDriver: true,
    restDisplacementThreshold: 300,
    restSpeedThreshold: 500,
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx }) => {
        position.setValue(dx);
        if (dx < -40) {
          setState(1);
        } else if (dx > 40) {
          setState(0);
        }
      },
      onPanResponderGrant: () => {
        onPressIn.start();
      },
      onPanResponderRelease: (_, { dx }) => {
        reset();
        setView((prev) => !prev);
        if (dx < -40) {
          setState(1);
          goLeft.start(onDismissLeft);
        } else if (dx > 40) {
          setState(0);
          goRight.start(onDismissRight);
        } else {
          Animated.parallel([onPressOut, goCenter]).start();
        }
      },
    })
  ).current;
  const onDismissLeft = () => {
    scale.setValue(1);
    setIndex((prev) => prev + 1);
    count++;
    position.setValue(0);
  };
  const onDismissRight = () => {
    scale.setValue(1);
    setIndex((prev) => prev - 1);
    count--;
    position.setValue(0);
  };
  const reset = () => {
    dispatch(setHiragana(false));
    dispatch(setImi(false));
  };
  // useEffect(() => {
  //   // 전면 광고 로딩
  //   const unsubscribe = interstitial.addAdEventListener(
  //     AdEventType.LOADED,
  //     () => {}
  //   );
  //   interstitial.load();
  //   return unsubscribe;
  // }, []);
  useEffect(() => {
    // 리셋 트리거
    reset();
    setIndex(0);
  }, [isReset]);

  // 페이지 이동
  useEffect(() => {
    setIndex(isMovePage);
    count = isMovePage;
  }, [isMovePage]);

  useEffect(() => {
    // 인덱스 추적
    setView(false);
    if (index > KanjiData.imi.length - 1) {
      setTimeout(() => {
        result();
      }, 100);
    }
    if (index < 0) {
      setIndex(0);
    }
  }, [index]);

  useEffect(() => {
    if (viewed) {
      AsyncStorage.getItem(
        "INDEX",
        (err: unknown, result: string | null | undefined) => {
          if (result) {
            const savedIndex = JSON.parse(result);
            setIndex(savedIndex);
            count = savedIndex;
          }
        }
      );
    } else {
      setIndex(0);
      count = 0;
    }

    return () => {
      //내 단어장 입장시 카운트 초기화하면 안됨
      if (!myword) {
        AsyncStorage.setItem("INDEX", JSON.stringify(count));
      }
    };
  }, []);

  const resultView = async () => {
    setShot(false);
    setIndex(0);
    reset();
    count = 0;
    pop();
  };

  const result = async () => {
    if (!myword) {
      setShot(true);
    } else {
      setIndex(0);
    }
  };

  const onFavorite = async () => {
    try {
      let obj: { myWord: IKanjiData } = {
        myWord: {
          hurigana: [],
          imi: [],
          reibun: [],
          kanji: [],
          reibunImi: [],
          reibunFurigana: [],
        },
      };
      if (myword) {
        const result = await AsyncStorage.getItem("MYWORD");
        if (result) {
          obj = JSON.parse(result);
          (Object.keys(obj.myWord) as Array<keyof IKanjiData>).forEach(
            (key) => {
              obj.myWord[key].splice(index, 1);
            }
          );
          setIndex((prev) => prev - 1);
        }
      } else {
        const result = await AsyncStorage.getItem("MYWORD");
        if (result) {
          obj = JSON.parse(result);
          if (myWorded(KanjiData.imi[index])) {
            const curIdx = obj.myWord.imi.indexOf(KanjiData.imi[index]);
            (Object.keys(obj.myWord) as Array<keyof IKanjiData>).forEach(
              (key) => {
                obj.myWord[key].splice(curIdx, 1);
              }
            );
          } else {
            (Object.keys(obj.myWord) as Array<keyof IKanjiData>).forEach(
              (key) => {
                obj.myWord[key].push(KanjiData[key][index]);
              }
            );
          }
        }
      }
      await AsyncStorage.setItem("MYWORD", JSON.stringify(obj));
      isUpdate ? dispatch(setUpdate(false)) : dispatch(setUpdate(true));
    } catch (error) {
      console.log(error);
    }
  };
  const myWorded = (data: string) => {
    AsyncStorage.getItem(
      "MYWORD",
      (err: unknown, result: string | null | undefined) => {
        if (result) {
          setValid(result.includes(data));
        }
      }
    );
    return valid;
  };

  const speak = async (sounds: string) => {
    if (sounds) {
      Tts.getInitStatus().then(
        () => {
          Tts.setDefaultLanguage("ja-JP");
          Tts.setIgnoreSilentSwitch("ignore");
          // Tts.addEventListener("tts-start", (event) =>
          //   console.log("start", event)
          // );
          // Tts.addEventListener("tts-finish", (event) =>
          //   console.log("finish", event)
          // );
          // Tts.addEventListener("tts-cancel", (event) =>
          //   console.log("cancel", event)
          // );
          Tts.speak(sounds);
        },
        (err) => {
          if (err.code === "no_engine") {
            Tts.requestInstallEngine();
          }
        }
      );
    }
  };
  const viewImiValid = () => {
    if (isImi || view) {
      return true;
    }
    return false;
  };
  const viewHiraValid = () => {
    if (isHiragana || view) {
      return true;
    }
    return false;
  };
  return (
    <Wrap>
      <CardContainer>
        {index < KanjiData.imi.length - 1 ? (
          <>
            {index + state + state !== 0 ? (
              <Wrapper
                valid={Platform.OS === "ios" ? false : true}
                style={{ transform: [{ scale: secondScale }] }}
              >
                <FavoritesWrap onPress={() => onFavorite()}>
                  <FavoritesIcon>
                    {myword ? (
                      <Ionicons name="bookmark" size={38} color="#27272a" />
                    ) : (
                      <Ionicons
                        name="bookmark-outline"
                        size={38}
                        color="#27272a"
                      />
                    )}
                  </FavoritesIcon>
                  <FavoritesText>
                    {myword ? "단어장 삭제" : "단어장 추가"}
                  </FavoritesText>
                </FavoritesWrap>
                <KanjiWrap>
                  <IconWrap>
                    <Ionicons
                      onPress={() => speak(KanjiData.hurigana[index])}
                      name="volume-medium"
                      size={24}
                      color="gray"
                    />
                  </IconWrap>
                  <KanjiText>
                    {state === 0
                      ? KanjiData.kanji[index - 1]
                      : KanjiData.kanji[index + 1]}
                  </KanjiText>
                </KanjiWrap>
                {isReibun && (
                  <ReibunWrap>
                    <CharaImg source={require("../assets/image/chara2.png")} />
                    <IconWrapReibun>
                      <Ionicons
                        onPress={() => speak(KanjiData.reibunFurigana[index])}
                        name="volume-medium"
                        size={24}
                        color="gray"
                      />
                    </IconWrapReibun>
                    <ReibunBox>
                      <ReinunText>{KanjiData.reibun[index + 1]}</ReinunText>
                    </ReibunBox>
                  </ReibunWrap>
                )}
                <CountText>
                  {index < KanjiData.imi.length - 1 ? (
                    index + state + state + "/" + KanjiData.imi.length
                  ) : (
                    <CountText>끝!!</CountText>
                  )}
                </CountText>
              </Wrapper>
            ) : null}
          </>
        ) : null}

        {index < KanjiData.imi.length ? (
          <Wrapper
            valid={Platform.OS === "ios" ? false : true}
            {...panResponder.panHandlers}
            style={{
              transform: [
                { scale },
                { translateX: position },
                { rotateZ: rotation },
              ],
            }}
          >
            {myWorded(KanjiData.imi[index]) ? (
              <FavoritesWrap onPress={() => onFavorite()}>
                <FavoritesIcon>
                  <Ionicons name="bookmark" size={38} color="#27272a" />
                </FavoritesIcon>
                <FavoritesText>단어장 삭제</FavoritesText>
              </FavoritesWrap>
            ) : (
              <FavoritesWrap onPress={() => onFavorite()}>
                <FavoritesIcon>
                  <Ionicons name="bookmark-outline" size={38} color="#27272a" />
                </FavoritesIcon>
                <FavoritesText>
                  {myword ? "단어장 삭제" : "단어장 추가"}
                </FavoritesText>
              </FavoritesWrap>
            )}

            <KanjiWrap>
              <IconWrap>
                <Ionicons
                  onPress={() => speak(KanjiData.hurigana[index])}
                  name="volume-medium"
                  size={24}
                  color="gray"
                />
              </IconWrap>
              {viewHiraValid() && (
                <HuriganaText>{KanjiData.hurigana[index]}</HuriganaText>
              )}

              <KanjiText>{KanjiData.kanji[index]}</KanjiText>
              {viewImiValid() && (
                <KanjiImiText>{KanjiData.imi[index]}</KanjiImiText>
              )}
            </KanjiWrap>
            {isReibun && (
              <ReibunWrap>
                <CharaImg source={require("../assets/image/chara2.png")} />
                <IconWrapReibun>
                  <Ionicons
                    onPress={() => speak(KanjiData.reibunFurigana[index])}
                    name="volume-medium"
                    size={24}
                    color="gray"
                  />
                </IconWrapReibun>
                <ReibunBox>
                  {viewHiraValid() && (
                    <ReibunFurigana>
                      {KanjiData.reibunFurigana[index]}
                    </ReibunFurigana>
                  )}

                  <ReinunText>{KanjiData.reibun[index]}</ReinunText>
                  {viewImiValid() && (
                    <ReibunImiText>{KanjiData.reibunImi[index]}</ReibunImiText>
                  )}
                </ReibunBox>
              </ReibunWrap>
            )}
            <CountText>
              {index < KanjiData.imi.length
                ? index + 1 + "/" + KanjiData.imi.length
                : null}
            </CountText>
          </Wrapper>
        ) : null}
        {shot && (
          <CompleteWrap onPress={() => resultView()}>
            <Particle />
            <LiceneWrap valid={Platform.OS === "ios" ? false : true}>
              <LiceneLeft>
                <CompleteGrad>{title}</CompleteGrad>
                <CompletePage>{page}</CompletePage>
              </LiceneLeft>
              <LiceneContent>
                <LottieWrap>
                  <LottieView
                    style={{ width: "100%" }}
                    source={require("../assets/lottie/cat.json")}
                    autoPlay
                    loop
                  />
                </LottieWrap>
                <CompleteKanryo>完</CompleteKanryo>
                <CompleteText>資格証明書</CompleteText>
                <CompleteDay>{dateFormat()}</CompleteDay>
              </LiceneContent>
            </LiceneWrap>
          </CompleteWrap>
        )}
      </CardContainer>
      {!shot && <CardBtn />}
    </Wrap>
  );
};

export default Card;
