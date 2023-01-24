import { useEffect, useRef, useState } from "react";
import { Alert, Animated, PanResponder, View } from "react-native";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setHiragana, setImi, setReibun } from "../redux/actions/TriggerAction";
import AsyncStorage from "@react-native-community/async-storage";

const Wrapper = styled(Animated.createAnimatedComponent(View))`
  background-color: ${(props) => props.theme.textColor};
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
`;

const KanjiText = styled.Text`
  font-size: 60px;
  font-weight: 500;
  margin: 5px 0px;
  color: ${(props: any) => props.theme.bgColor};
`;

const KanjiImiText = styled.Text`
  font-size: 20px;
  color: ${(props: any) => props.theme.bgColor};
`;
const HuriganaText = styled.Text`
  font-size: 20px;
  color: ${(props: any) => props.theme.bgColor};
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
  background-color: aliceblue;
  align-items: center;
  justify-content: center;
  padding: 10px 0px;
  padding-bottom: 30px;
`;
const ReinunText = styled.Text`
  color: ${(props: any) => props.theme.bgColor};
  font-size: 20px;
`;
const ReibunFurigana = styled(ReinunText)`
  color: #f48fb1;
  font-size: 12px;
`;
const ReibunImiText = styled(ReinunText)`
  margin-top: 7px;
`;
const ReibunBox = styled.View`
  margin: 0px 10px;
  align-items: center;
`;
const FavoritesWrap = styled.View`
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
}
let count: number = 0;

const Card = ({ data: KanjiData, pop, viewed }: IKanji) => {
  const [index, setIndex] = useState<number>(0);
  const [state, setState] = useState<number>(0);
  const { isHiragana, isImi, isReibun, isReset } = useSelector(
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
      onPanResponderGrant: () => onPressIn.start(),
      onPanResponderRelease: (_, { dx }) => {
        reset();
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
    setIndex(48);
  }, [isReset]);

  useEffect(() => {
    // 인덱스 추적
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
      AsyncStorage.setItem("INDEX", JSON.stringify(count));
    };
  }, []);
  const result = async () => {
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
  };
  return (
    <CardContainer>
      {index + state + state !== 0 ? (
        <Wrapper style={{ transform: [{ scale: secondScale }] }}>
          <FavoritesWrap>
            <FavoritesIcon>
              <Feather name="bookmark" size={38} color="#27272a" />
            </FavoritesIcon>
            <FavoritesText>단어장 추가2</FavoritesText>
          </FavoritesWrap>
          <KanjiWrap>
            <KanjiText>
              {state === 0
                ? KanjiData.kanji[index - 1]
                : KanjiData.kanji[index + 1]}
            </KanjiText>
          </KanjiWrap>
          {isReibun && (
            <ReibunWrap>
              <ReibunBox>
                {isHiragana && (
                  <ReibunFurigana>
                    {KanjiData.reibunFurigana[index + 1]}
                  </ReibunFurigana>
                )}
                <ReinunText>{KanjiData.reibun[index + 1]}</ReinunText>
                {isImi && (
                  <ReibunImiText>
                    {KanjiData.reibunImi[index + 1]}
                  </ReibunImiText>
                )}
              </ReibunBox>
            </ReibunWrap>
          )}
          <CountText>
            {index < 49 ? (
              index + state + state + "/" + KanjiData.imi.length
            ) : (
              <CountText>끝!!</CountText>
            )}
          </CountText>
        </Wrapper>
      ) : null}

      <Wrapper
        {...panResponder.panHandlers}
        style={{
          transform: [
            { scale },
            { translateX: position },
            { rotateZ: rotation },
          ],
        }}
      >
        <FavoritesWrap>
          <FavoritesIcon>
            <Feather name="bookmark" size={38} color="#27272a" />
          </FavoritesIcon>
          <FavoritesText>단어장 추가</FavoritesText>
        </FavoritesWrap>
        <KanjiWrap>
          {isHiragana && (
            <HuriganaText>{KanjiData.hurigana[index]}</HuriganaText>
          )}
          <KanjiText>{KanjiData.kanji[index]}</KanjiText>
          {isImi && <KanjiImiText>{KanjiData.imi[index]}</KanjiImiText>}
        </KanjiWrap>
        {isReibun && (
          <ReibunWrap>
            <ReibunBox>
              {isHiragana && (
                <ReibunFurigana>
                  {KanjiData.reibunFurigana[index]}
                </ReibunFurigana>
              )}
              <ReinunText>{KanjiData.reibun[index]}</ReinunText>
              {isImi && (
                <ReibunImiText>{KanjiData.reibunImi[index]}</ReibunImiText>
              )}
            </ReibunBox>
          </ReibunWrap>
        )}
        <CountText>
          {index < 50 ? (
            index + 1 + "/" + KanjiData.imi.length
          ) : (
            <CountText>끝!!</CountText>
          )}
        </CountText>
      </Wrapper>
    </CardContainer>
  );
};

export default Card;
