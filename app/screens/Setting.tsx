import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled from "styled-components/native";

const Wrapper = styled.View`
  flex: 1;
  background-color: ${(props: any) => props.theme.bgColor};
`;
const Box = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 15px;
  border-bottom-color: #a8a8a8;
  border-bottom-width: 0.5px;
`;
const Text = styled.Text`
  color: ${(props: any) => props.theme.textColor};
  font-size: 20px;
`;
const TextV = styled(Text)`
  font-size: 20px;
  color: gray;
`;
const NameBox = styled.View`
  align-items: center;
  border: 1px solid;
  padding: 10px;
`;
const NameText = styled.Text`
  color: ${(props: any) => props.theme.textColor};
  font-size: 16px;
`;
const CharaImg = styled.Image`
  position: absolute;
  left: 10;
  width: 80px;
  height: 55px;
`;
const CharaImgRight = styled.Image`
  transform: scaleX(-1);
  position: absolute;
  right: 10;
  width: 80px;
  height: 55px;
`;
const Setting: React.FC<NativeStackScreenProps<any, "Setting">> = ({
  navigation,
}) => {
  return (
    <Wrapper>
      <NameBox>
        <CharaImg source={require("../assets/image/chara2.png")} />
        <NameText>일본단어냥이</NameText>
        <NameText>Siby1lA</NameText>
        <CharaImgRight source={require("../assets/image/chara2.png")} />
      </NameBox>

      <Box>
        <Text>공지사항</Text>
        <Text>🏆</Text>
      </Box>
      <Box>
        <Text>리뷰 작성</Text>
        <Text>💖</Text>
      </Box>
      <Box>
        <Text>자주 묻는 질문</Text>
        <Text>⛩️</Text>
      </Box>
      <Box>
        <Text>문의하기</Text>
        <Text>🧾</Text>
      </Box>
      <Box>
        <Text>앱 버전</Text>
        <TextV>v1.0.0 ⚙️</TextV>
      </Box>
      <Box>
        <Text>개발자 깃허브</Text>
        <TextV>🧑🏻‍💻</TextV>
      </Box>
    </Wrapper>
  );
};

export default Setting;
