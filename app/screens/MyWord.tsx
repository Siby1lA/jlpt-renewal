import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Card from "../components/Card";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { ParamListBase } from "@react-navigation/native";
import { RootState } from "../redux/reducer";
const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.bgColor};
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
const Wrapper = styled.View`
  background-color: ${(props) => props.theme.cardColor};
  width: 86%;
  height: 97%;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  position: absolute;
  flex: 1;
  overflow: hidden;
`;
const NotWord = styled.Text`
  font-size: 22px;
  font-weight: 600;
  color: ${(props) => props.theme.wordColor};
`;

interface IType {
  myWord: {
    hurigana: string[];
    imi: string[];
    reibun: string[];
    kanji: string[];
    reibunImi: string[];
    reibunFurigana: string[];
  };
}

const MyWord: React.FC<NativeStackScreenProps<ParamListBase, "MyWord">> = ({
  navigation,
}) => {
  const [kanjiData, setKanjiData] = useState<IType>();
  const { isUpdate } = useSelector((state: RootState) => state.Trigger);
  useEffect(() => {
    navigation.setOptions({
      title: "단어장",
      headerRight: () => (
        <Ionicons
          onPress={() => navigation.navigate("Setting")}
          name="settings-sharp"
          size={24}
          color="#ecf0f1"
        />
      ),
    });
    AsyncStorage.getItem(
      "MYWORD",
      (err: unknown, result: string | null | undefined) => {
        if (result) {
          const data = JSON.parse(result);
          setKanjiData(data);
        }
      }
    );
  }, [isUpdate]);
  return (
    <Container>
      {kanjiData !== undefined && kanjiData.myWord.imi.length !== 0 ? (
        <Card
          data={kanjiData.myWord}
          pop={navigation.pop}
          viewed={false}
          myword={true}
        />
      ) : (
        <CardContainer>
          <Wrapper>
            <NotWord>내 단어가 없습니다.</NotWord>
          </Wrapper>
        </CardContainer>
      )}
    </Container>
  );
};

export default MyWord;
