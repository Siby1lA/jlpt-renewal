import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled from "styled-components/native";
const Wrapper = styled.View`
  width: 100%;
  height: 35%;
  padding: 10%;
  padding-top: 20%;
  border-bottom-left-radius: 50;
  border-bottom-right-radius: 50;
  background-color: ${(props) => props.theme.bgColor};
`;
const Text = styled.Text`
  color: #d4d4d4;
  font-weight: 500;
  font-size: 30px;
`;
const Btn = styled.TouchableWithoutFeedback``;
const Home: React.FC<NativeStackScreenProps<any, "Home">> = ({
  navigation: { navigate },
}) => {
  return (
    <Wrapper>
      <Text>JLPT 단어 테스트</Text>
      <Btn onPress={() => navigate("Kanji")}>
        <Text>테스트 하러 가기</Text>
      </Btn>
    </Wrapper>
  );
};

export default Home;
