import { useEffect, useRef, useState } from "react";
import { Alert, Animated, PanResponder, View } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setHiragana, setImi, setUpdate } from "../redux/actions/TriggerAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Speech from "expo-speech";
const Wrapper = styled(Animated.createAnimatedComponent(View))`
  background-color: ${(props) => props.theme.cardColor};
  width: 86%;
  height: 97%;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  position: absolute;
  flex: 1;
  overflow: hidden;
`;
const CardContainer = styled.View`
  flex: 1;
  margin-top: 5%;
  align-items: center;
  shadow-offset: {
    width: 1;
    height: 1;
  }
  shadow-opacity: 0.2;
  shadow-radius: 10px;
`;

const KanjiText = styled.Text`
  font-size: 60px;
  font-weight: 500;
  margin: 5px 0px;
  color: ${(props: any) => props.theme.wordColor};
`;

const KanjiImiText = styled.Text`
  font-size: 20px;
  color: ${(props: any) => props.theme.wordColor};
`;
const HuriganaText = styled.Text`
  font-size: 20px;
  color: ${(props: any) => props.theme.wordColor};
`;
const CountText = styled.Text`
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
  background-color: ${(props: any) => props.theme.rbColor};
  align-items: center;
  justify-content: center;
  padding: 10px 0px;
  padding-bottom: 30px;
`;
const ReinunText = styled.Text`
  color: ${(props: any) => props.theme.wordColor};
  font-size: 20px;
`;
const ReibunFurigana = styled(ReinunText)`
  color: #f48fb1;
  font-size: 14px;
`;
const ReibunImiText = styled(ReinunText)`
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
interface IKanji {
  data: {
    hurigana: string;
    imi: string;
    reibun: string;
    kanji: string;
    reibunImi: string;
    reibunFurigana: string;
  };
  pop: any;
  viewed: boolean;
  myword: boolean;
}

let count: number = 0;
let newObj: any = {
  myWord: {
    hurigana: [],
    imi: [],
    reibun: [],
    kanji: [],
    reibunImi: [],
    reibunFurigana: [],
  },
};
const Card = ({ data: KanjiData, pop, viewed, myword = false }: IKanji) => {
  const [index, setIndex] = useState<number>(0);
  const [state, setState] = useState<number>(0);
  const [valid, setValid] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const { isHiragana, isImi, isReibun, isReset, isUpdate } = useSelector(
    (state: any) => state.Trigger
  );

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
        if (dx < -100) {
          setState(0);
        } else if (dx > 100) {
          setState(1);
        }
      },
      onPanResponderGrant: () => {
        onPressIn.start();
      },
      onPanResponderRelease: (_, { dx }) => {
        reset();
        setView((prev) => !prev);
        if (dx < -100) {
          setState(0);
          goLeft.start(onDismissLeft);
        } else if (dx > 100) {
          setState(1);
          goRight.start(onDismissRight);
        } else {
          Animated.parallel([onPressOut, goCenter]).start();
        }
      },
    })
  ).current;
  const onDismissRight = () => {
    scale.setValue(1);
    setIndex((prev) => prev + 1);
    count++;
    position.setValue(0);
  };
  const onDismissLeft = () => {
    scale.setValue(1);
    setIndex((prev) => prev - 1);
    count--;
    position.setValue(0);
  };
  const reset = () => {
    dispatch(setHiragana(false));
    dispatch(setImi(false));
  };
  useEffect(() => {
    // 리셋 트리거
    reset();
    setIndex(0);
  }, [isReset]);

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
      AsyncStorage.getItem("INDEX", (err: unknown, result: any) => {
        const savedIndex = JSON.parse(result);
        setIndex(savedIndex);
        count = savedIndex;
      });
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

  const result = async () => {
    if (!myword) {
      Alert.alert("끝났습니다!", "뒤로가시겠습니까?", [
        {
          text: "네",
          style: "cancel",
          onPress: () => {
            setIndex(0);
            reset();
            count = 0;
            pop();
          },
        },
        {
          text: "아니오",
          style: "destructive",
          onPress: () => {
            setIndex(0);
            reset();
          },
        },
      ]);
    } else {
      setIndex(0);
    }
  };

  const onFavorite = () => {
    if (!myword) {
      AsyncStorage.getItem("MYWORD", (err: unknown, result: any) => {
        let obj = JSON.parse(result);
        if (obj === null) {
          for (let key in newObj) {
            newObj.myWord[key].push(KanjiData[key][index]);
          }
          AsyncStorage.setItem("MYWORD", JSON.stringify(newObj));
        } else {
          if (myWorded(KanjiData.imi[index])) {
            AsyncStorage.getItem("MYWORD", (err: unknown, result: any) => {
              let obj = JSON.parse(result);
              let curIdx = obj.myWord.imi.indexOf(KanjiData.imi[index]);
              for (let key in obj.myWord) {
                obj.myWord[key].splice(curIdx, 1);
              }
              AsyncStorage.setItem("MYWORD", JSON.stringify(obj));
              isUpdate ? dispatch(setUpdate(false)) : dispatch(setUpdate(true));
            });
          } else {
            for (let key in obj.myWord) {
              obj.myWord[key].push(KanjiData[key][index]);
            }
            AsyncStorage.setItem("MYWORD", JSON.stringify(obj));
          }
        }
      });
      isUpdate ? dispatch(setUpdate(false)) : dispatch(setUpdate(true));
    }
    if (myword) {
      AsyncStorage.getItem("MYWORD", (err: unknown, result: any) => {
        let obj = JSON.parse(result);
        for (let key in obj.myWord) {
          obj.myWord[key].splice(index, 1);
        }
        AsyncStorage.setItem("MYWORD", JSON.stringify(obj));
        isUpdate ? dispatch(setUpdate(false)) : dispatch(setUpdate(true));
        setIndex((prev) => prev - 1);
        AsyncStorage.setItem("MYWORD", JSON.stringify(obj));
      });
    }
  };

  const myWorded = (data: string) => {
    AsyncStorage.getItem("MYWORD", (err: unknown, result: any) => {
      if (result) {
        setValid(result.includes(data));
      }
    });
    return valid;
  };

  const speak = async (sounds: string) => {
    if (sounds) {
      Speech.speak(sounds, { language: "ja-JP" });
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
    <CardContainer>
      {index < KanjiData.imi.length - 1 ? (
        <>
          {index + state + state !== 0 ? (
            <Wrapper style={{ transform: [{ scale: secondScale }] }}>
              {myWorded(KanjiData.imi[index]) ? (
                <FavoritesWrap onPress={() => onFavorite()}>
                  <FavoritesIcon>
                    <Ionicons name="bookmark" size={38} color="#27272a" />
                  </FavoritesIcon>
                  <FavoritesText>
                    {myword ? "단어장 삭제" : "단어장 삭제"}
                  </FavoritesText>
                </FavoritesWrap>
              ) : (
                <FavoritesWrap onPress={() => onFavorite()}>
                  <FavoritesIcon>
                    <Ionicons
                      name="bookmark-outline"
                      size={38}
                      color="#27272a"
                    />
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
                <KanjiText>
                  {state === 0
                    ? KanjiData.kanji[index - 1]
                    : KanjiData.kanji[index + 1]}
                </KanjiText>
              </KanjiWrap>
              {isReibun && (
                <ReibunWrap>
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
          {...panResponder.panHandlers}
          style={{
            transform: [
              { scale },
              { translateX: position },
              // { rotateZ: rotation },
            ],
          }}
        >
          {myWorded(KanjiData.imi[index]) ? (
            <FavoritesWrap onPress={() => onFavorite()}>
              <FavoritesIcon>
                <Ionicons name="bookmark" size={38} color="#27272a" />
              </FavoritesIcon>
              <FavoritesText>
                {myword ? "단어장 삭제" : "단어장 삭제"}
              </FavoritesText>
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
    </CardContainer>
  );
};

export default Card;
