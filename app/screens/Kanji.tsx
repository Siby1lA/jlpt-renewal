import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import styled from "styled-components/native";
import Data from "../data/data.json";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { setChapter } from "../redux/actions/KanjiAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CardBtn from "../components/CardBtn";
import { Ionicons } from "@expo/vector-icons";

const Container = styled.View`
  flex: 1;
  background-color: ${(props: any) => props.theme.bgColor};
`;

const Kanji: React.FC<NativeStackScreenProps<any, "Kanji">> = ({
  route,
  navigation,
}) => {
  const { id, title, page }: string | any = route.params;
  const dispatch = useDispatch();
  const { isChapter } = useSelector((state: any) => state.Kanji);
  useEffect(() => {
    navigation.setOptions({
      title: `${title} ${page}`,
      headerRight: () => (
        <Ionicons
          onPress={() => navigation.navigate("Setting")}
          name="settings-sharp"
          size={26}
          color="#ecf0f1"
        />
      ),
    });
    //redux-persit + asyncstorage 변경 예정
    dispatch(setChapter([title, page]));
    AsyncStorage.setItem("VIEWED", JSON.stringify([title, page]));
  }, []);
  const viewed =
    isChapter &&
    isChapter.lenth !== 0 &&
    isChapter[0] === title &&
    isChapter[1] === page;
  return (
    <Container>
      <Card
        data={Data[title][id]}
        pop={navigation.pop}
        viewed={viewed}
        myword={false}
      />
      <CardBtn />
    </Container>
  );
};

export default Kanji;
