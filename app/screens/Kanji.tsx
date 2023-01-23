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
  setReinun,
  setReset,
} from "../redux/actions/TriggerAction";
import { FontAwesome } from "@expo/vector-icons";

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
  color: #d4d4d4;
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
  useEffect(() => {
    navigation.setOptions({ title: `${title} ${page}` });
  }, []);

  return (
    <Container>
      <Card data={Data[title][id]} pop={navigation.pop} id={id} title={title} />
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
            color="#d4d4d4"
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
            color="#d4d4d4"
          />
          <NaviText>의미</NaviText>
        </Btn>
        <Btn
          onPress={() =>
            isReibun ? dispatch(setReinun(false)) : dispatch(setReinun(true))
          }
        >
          <FontAwesome name="language" size={30} color="#d4d4d4" />
          <NaviText>예문</NaviText>
        </Btn>
        <Btn
          onPress={() =>
            isReset ? dispatch(setReset(false)) : dispatch(setReset(true))
          }
        >
          <AntDesign name="retweet" size={30} color="#d4d4d4" />
          <NaviText>리셋</NaviText>
        </Btn>
      </Navi>
    </Container>
  );
};

export default Kanji;
