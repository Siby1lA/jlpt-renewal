import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import styled from "styled-components/native";
import BottomTab from "../components/BottomTab";

const Wrapper = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.bgColor};
`;
const Box = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  padding: 15px;
  border-bottom-color: #d3cfcf;
  border-bottom-width: 0.5px;
`;
const Text = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 20px;
`;
const TextV = styled(Text)`
  font-size: 20px;
  color: gray;
`;
const Setting: React.FC<NativeStackScreenProps<ParamListBase, "Setting">> = ({
  navigation,
}) => {
  const reviewLink =
    Platform.OS === "ios"
      ? "itms-apps://itunes.apple.com/gb/app/id1669536727?action=write-review&mt=8"
      : "https://play.google.com/store/apps/details?id=com.jlpt";
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
      <Box
        onPress={() =>
          navigation.navigate("Web", {
            title: "리뷰 작성",
            uri: reviewLink,
          })
        }
      >
        <Text>리뷰 작성</Text>
        <Text>💖</Text>
      </Box>
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
        <TextV>v1.2.0 ⚙️</TextV>
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
      <BottomTab />
    </Wrapper>
  );
};

export default Setting;
