import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import CardBtn from "../components/CardBtn";

const Container = styled.View`
  flex: 1;
  background-color: ${(props: any) => props.theme.bgColor};
`;
const MyWord: React.FC<NativeStackScreenProps<any, "MyWord">> = ({
  route,
  navigation,
}) => {
  const dispatch = useDispatch();
  const { isHiragana, isImi, isReibun, isReset } = useSelector(
    (state: any) => state.Trigger
  );
  const { isChapter } = useSelector((state: any) => state.Kanji);
  useEffect(() => {
    navigation.setOptions({ title: "내 단어" });
  }, []);
  return (
    <Container>
      {/* <Card data={Data[title][id]} pop={navigation.pop} viewed={viewed} /> */}
      <CardBtn />
    </Container>
  );
};

export default MyWord;
