import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled from "styled-components/native";

const Wrapper = styled.View`
  flex: 1;
  background-color: ${(props: any) => props.theme.bgColor};
`;
const Box = styled.TouchableOpacity`
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
  margin-top: 20px;
  align-items: center;
  padding: 10px;
`;
const NameText = styled.Text`
  color: ${(props: any) => props.theme.textColor};
  font-size: 16px;
`;
const CharaImg = styled.Image`
  position: absolute;
  left: 10px;
  width: 80px;
  height: 55px;
`;
const CharaImgRight = styled.Image`
  transform: scaleX(-1);
  position: absolute;
  right: 10px;
  width: 80px;
  height: 55px;
`;
const Setting: React.FC<NativeStackScreenProps<any, "Setting">> = ({
  navigation,
}) => {
  return (
    <Wrapper>
      <Box
        onPress={() =>
          navigation.navigate("Web", {
            title: "공지사항",
            uri: "https://clear-index-f4b.notion.site/b34c929bcaa34f9989d245e0470f7be4",
          })
        }
      >
        <Text>공지사항</Text>
        <Text>🏆</Text>
      </Box>
      {/* <Box>
        <Text>리뷰 작성</Text>
        <Text>💖</Text>
      </Box> */}
      <Box
        onPress={() =>
          navigation.navigate("Web", {
            title: "자주 묻는 질문",
            uri: "https://clear-index-f4b.notion.site/81675bb648254447ab7618323bfe7275",
          })
        }
      >
        <Text>자주 묻는 질문</Text>
        <Text>⛩️</Text>
      </Box>
      <Box
        onPress={() =>
          navigation.navigate("Web", {
            title: "문의하기",
            uri: "https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=twilight9508@gmail.com",
          })
        }
      >
        <Text>문의하기</Text>
        <Text>🧾</Text>
      </Box>
      <Box
        onPress={() =>
          navigation.navigate("Web", {
            title: "개발 스토리",
            uri: "https://clear-index-f4b.notion.site/0996bacc945e4ad6b338d1077dabc1a9",
          })
        }
      >
        <Text>개발 스토리</Text>
        <Text>📱</Text>
      </Box>
      <Box>
        <Text>앱 버전</Text>
        <TextV>v1.0.1 ⚙️</TextV>
      </Box>
      <Box
        onPress={() =>
          navigation.navigate("Web", {
            title: "개발자",
            uri: "https://github.com/Siby1lA",
          })
        }
      >
        <Text>개발자</Text>
        <TextV>🧑🏻‍💻</TextV>
      </Box>
      <NameBox>
        <CharaImg source={require("../assets/image/chara2.png")} />
        <NameText>일본어 단어 공부하는 냥이</NameText>
        <NameText>@twilight</NameText>
        <CharaImgRight source={require("../assets/image/chara2.png")} />
      </NameBox>
    </Wrapper>
  );
};

export default Setting;
