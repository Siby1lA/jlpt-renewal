import { useEffect, useRef, useState } from "react";
import { Animated, PanResponder, View } from "react-native";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setHiragana, setImi } from "../redux/actions/TriggerAction";
const Wrapper = styled(Animated.createAnimatedComponent(View))`
  background-color: ${(props) => props.theme.textColor};
  width: 85%;
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
  font-size: 14px;
  color: gray;
`;
const KanjiWrap = styled.View`
  flex: 4;
  align-items: center;
  justify-content: center;
`;
const ReibunWrap = styled.View`
  width: 100%;
  background-color: aliceblue;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0px;
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
  color: gray;
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
}

const Card = ({ data: KanjiData, pop }: IKanji) => {
  const [index, setIndex] = useState<number>(0);
  const { isHiragana, isImi, isIten, isReset } = useSelector(
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
  // Animations
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
  // Pan Responders
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx }) => {
        position.setValue(dx);
      },
      onPanResponderGrant: () => onPressIn.start(),
      onPanResponderRelease: (_, { dx }) => {
        reset();
        if (dx < -100) {
          goLeft.start(onDismiss);
        } else if (dx > 100) {
          goRight.start(onDismiss);
        } else {
          Animated.parallel([onPressOut, goCenter]).start();
        }
      },
    })
  ).current;

  const onDismiss = () => {
    scale.setValue(1);
    setIndex((prev) => prev + 1);
    position.setValue(0);
  };
  const reset = () => {
    dispatch(setHiragana(false));
    dispatch(setImi(false));
  };
  useEffect(() => {
    reset();
    setIndex(0);
  }, [isReset]);
  useEffect(() => {
    if (index > 0) {
      //   setIndex((prev) => prev - 1);
      setIndex(49);
    }
  }, [isIten]);

  if (index > 49) {
    reset();
    setIndex(0);
    pop();
  }
  return (
    <CardContainer>
      <Wrapper style={{ transform: [{ scale: secondScale }] }}>
        <FavoritesWrap>
          <FavoritesIcon>
            <Feather name="bookmark" size={34} color="gray" />
          </FavoritesIcon>
          <FavoritesText>단어장 추가</FavoritesText>
        </FavoritesWrap>
        <KanjiWrap>
          <KanjiText>{KanjiData.kanji[index + 1]}</KanjiText>
        </KanjiWrap>
        <ReibunWrap>
          <ReibunBox>
            <ReibunFurigana>
              {KanjiData.reibunFurigana[index + 1]}
            </ReibunFurigana>
            <ReinunText>{KanjiData.reibun[index + 1]}</ReinunText>
            <ReibunImiText>{KanjiData.reibunImi[index + 1]}</ReibunImiText>
          </ReibunBox>
          <CountText>{index + 1 + 1}/50</CountText>
        </ReibunWrap>
      </Wrapper>
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
            <Feather name="bookmark" size={34} color="gray" />
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
        <ReibunWrap>
          <ReibunBox>
            <ReibunFurigana>{KanjiData.reibunFurigana[index]}</ReibunFurigana>
            <ReinunText>{KanjiData.reibun[index]}</ReinunText>
            <ReibunImiText>{KanjiData.reibunImi[index]}</ReibunImiText>
          </ReibunBox>
          <CountText>{index + 1}/50</CountText>
        </ReibunWrap>
      </Wrapper>
    </CardContainer>
  );
};

export default Card;
