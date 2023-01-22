import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import styled from "styled-components/native";
import Data from "../data/data.json";
import Card from "../components/Card";
import { Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

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
  navigation: { navigate, setOptions },
}) => {
  const { id, title, page }: string | any = route.params;
  useEffect(() => {
    setOptions({ title: `${title} ${page}` });
  }, []);
  // Values
  const [huriganaView, setHuriganaView] = useState(false);
  return (
    <Container>
      <Card data={Data[title][id]} />
      <Navi>
        <Btn onPress={() => setHuriganaView((prev) => !prev)}>
          <MaterialCommunityIcons
            name="syllabary-hiragana"
            size={30}
            color="#d4d4d4"
          />
          <NaviText>히라가나</NaviText>
        </Btn>
        <Btn>
          <MaterialCommunityIcons
            name="lightbulb-on-outline"
            size={30}
            color="#d4d4d4"
          />
          <NaviText>의미</NaviText>
        </Btn>
        <Btn>
          <AntDesign name="arrowleft" size={30} color="#d4d4d4" />
          <NaviText>이전</NaviText>
        </Btn>
        <Btn>
          <AntDesign name="retweet" size={30} color="#d4d4d4" />
          <NaviText>리셋</NaviText>
        </Btn>
      </Navi>
    </Container>
  );
};

export default Kanji;
