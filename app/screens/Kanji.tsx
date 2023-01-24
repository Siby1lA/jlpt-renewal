import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import styled from "styled-components/native";
import Data from "../data/data.json";
import Card from "../components/Card";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setHiragana,
  setImi,
  setReibun,
  setReset,
} from "../redux/actions/TriggerAction";
import { FontAwesome } from "@expo/vector-icons";
import { setChapter } from "../redux/actions/KanjiAction";
import AsyncStorage from "@react-native-community/async-storage";
import { useColorScheme } from "react-native";

const Container = styled.View`
  flex: 1;
  background-color: ${(props: any) => props.theme.bgColor};
`;
const Navi = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 10px;
  padding-bottom: 20px;
  margin-bottom: 5%;
`;

const Btn = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;
const NaviText = styled.Text`
  font-size: 14px;
  margin-top: 5px;
  color: ${(props: any) => props.theme.textColor};
`;
const Kanji: React.FC<NativeStackScreenProps<any, "Kanji">> = ({
  route,
  navigation,
}) => {
  const { id, title, page }: string | any = route.params;
  const dispatch = useDispatch();
  const { isHiragana, isImi, isReibun, isReset } = useSelector(
    (state: any) => state.Trigger
  );
  const { isChapter } = useSelector((state: any) => state.Kanji);
  useEffect(() => {
    navigation.setOptions({ title: `${title} ${page}` });
    //redux-persit + asyncstorage 변경 예정
    dispatch(setChapter([title, page]));
    AsyncStorage.setItem("VIEWED", JSON.stringify([title, page]));
  }, []);
  const viewed =
    isChapter &&
    isChapter.lenth !== 0 &&
    isChapter[0] === title &&
    isChapter[1] === page;
  const isDark = useColorScheme() === "dark";
  return (
    <Container>
      <Card data={Data[title][id]} pop={navigation.pop} viewed={viewed} />
      <Navi>
        <Btn
          onPress={() =>
            isHiragana
              ? dispatch(setHiragana(false))
              : dispatch(setHiragana(true))
          }
        >
          <MaterialCommunityIcons
            name="syllabary-hiragana"
            size={30}
            color={isDark ? "#d4d4d4" : "#27272a"}
          />
          <NaviText>히라가나</NaviText>
        </Btn>
        <Btn
          onPress={() =>
            isImi ? dispatch(setImi(false)) : dispatch(setImi(true))
          }
        >
          <MaterialCommunityIcons
            name="lightbulb-on-outline"
            size={30}
            color={isDark ? "#d4d4d4" : "#27272a"}
          />
          <NaviText>의미</NaviText>
        </Btn>
        <Btn
          onPress={() =>
            isReibun ? dispatch(setReibun(false)) : dispatch(setReibun(true))
          }
        >
          <FontAwesome
            name="language"
            size={30}
            color={isDark ? "#d4d4d4" : "#27272a"}
          />
          <NaviText>예문</NaviText>
        </Btn>
        <Btn
          onPress={() =>
            isReset ? dispatch(setReset(false)) : dispatch(setReset(true))
          }
        >
          <AntDesign
            name="retweet"
            size={30}
            color={isDark ? "#d4d4d4" : "#27272a"}
          />
          <NaviText>리셋</NaviText>
        </Btn>
      </Navi>
    </Container>
  );
};

export default Kanji;
