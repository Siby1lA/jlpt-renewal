import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import styled from "styled-components/native";
import CardBtn from "../components/CardBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Card from "../components/Card";
import { useSelector } from "react-redux";
const Container = styled.View`
  flex: 1;
  background-color: ${(props: any) => props.theme.bgColor};
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
  color: ${(props: any) => props.theme.wordColor};
`;

const MyWord: React.FC<NativeStackScreenProps<any, "MyWord">> = ({
  navigation,
}) => {
  const [kanjiData, setKanjiData] = useState({});
  const { isUpdate } = useSelector((state: any) => state.Trigger);
  useEffect(() => {
    navigation.setOptions({ title: "단어장" });
    AsyncStorage.getItem("MYWORD", (err: unknown, result: any) => {
      if (result) {
        setKanjiData(JSON.parse(result));
      }
    });
  }, [isUpdate]);
  return (
    <Container>
      {kanjiData.myWord !== undefined && kanjiData.myWord.imi.length !== 0 ? (
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
      <CardBtn />
    </Container>
  );
};

export default MyWord;
