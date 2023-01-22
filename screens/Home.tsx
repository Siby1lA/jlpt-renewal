import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, View } from "react-native";
import styled from "styled-components/native";
import { CATEGORIES } from "../data/list-data";
const Wrapper = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.textColor};
`;
const Header = styled.View`
  width: 100%;
  height: 35%;
  padding: 10%;
  padding-top: 25%;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  background-color: ${(props) => props.theme.bgColor};
`;
const Text = styled.Text`
  color: #d4d4d4;
  font-weight: 500;
  font-size: 30px;
`;
const Btn = styled.TouchableWithoutFeedback``;
const Contents = styled.View`
  flex: 1;
  margin: 10px;
  justify-content: center;
  align-items: center;
  shadow-offset: {
    width: 0;
    height: 1;
  }
  shadow-opacity: 0.2;
  shadow-radius: 10px;
  bottom: 50px;
`;

const TileWrap = styled.TouchableOpacity``;
const Tile = styled.View`
  width: 160px;
  height: 150px;
  border-radius: 10px;
  padding: 30px;
  margin: 10px;
  justify-content: center;
  background-color: ${(props) => props.theme.textColor};
  align-items: center;
`;
const ChapterText = styled.Text`
  font-size: 35px;
  font-weight: 500;
  margin-bottom: 5px;
`;
const ChapterSubText = styled.Text`
  font-size: 22px;
`;

const Home: React.FC<NativeStackScreenProps<any, "Home">> = ({
  navigation: { navigate },
}) => {
  const renderGridItem = (itemData) => {
    return (
      <TileWrap
        onPress={() =>
          navigate("Chapter", {
            title: itemData.item.title,
            chapter: itemData.item.chapter,
          })
        }
      >
        <Tile>
          <ChapterText>{itemData.item.title}</ChapterText>
          <ChapterSubText>
            {itemData.item.subtitle}
            {itemData.item.subtitle !== "즐겨찾기" && "단어"}
          </ChapterSubText>
        </Tile>
      </TileWrap>
    );
  };
  return (
    <Wrapper>
      <Header>
        <Text>JLPT 단어 리뉴얼 테스트</Text>
      </Header>

      <Contents>
        <FlatList
          keyExtractor={(item) => item.title + ""}
          data={CATEGORIES}
          renderItem={renderGridItem}
          numColumns={2}
        />
      </Contents>
    </Wrapper>
  );
};

export default Home;
