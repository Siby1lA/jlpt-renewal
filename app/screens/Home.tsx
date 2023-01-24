import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { CATEGORIES } from "../data/list-data";
import { setChapter } from "../redux/actions/KanjiAction";
interface ITheme {
  textColor?: string;
  bgColor?: string;
}
interface IData {
  item: {
    title: string;
    chapter: string;
    subtitle: string | number;
  };
}
const Wrapper = styled.View<ITheme>`
  flex: 1;
  background-color: ${(props: any) => props.theme.bgColor};
`;
const Header = styled.View<ITheme>`
  flex: 1;
  width: 100%;
  height: 35%;
  padding: 10%;
  padding-top: 20%;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  background-color: ${(props: any) => props.theme.textColor};
`;
const Text = styled.Text`
  color: ${(props: any) => props.theme.bgColor};
  font-weight: 500;
  font-size: 30px;
`;
const Contents = styled.View`
  flex: 3;
  margin: 10px;
  shadow-offset: {
    width: 0;
    height: 1;
  }
  shadow-opacity: 0.2;
  shadow-radius: 10px;
  bottom: 50px;
`;

const TileWrap = styled.TouchableOpacity`
  flex: 1;
  width: 10%;
  flex-grow: 1;
`;
const Tile = styled.View<ITheme>`
  border-radius: 10px;
  margin: 10px;
  padding: 40px;
  justify-content: center;
  background-color: ${(props: any) => props.theme.cardColor};
  align-items: center;
`;
const Tiled = styled(Tile)`
  background-color: gray;
`;
const ChapterText = styled.Text`
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 5px;
`;
const ChapterSubText = styled.Text`
  font-size: 20px;
`;

const Home: React.FC<NativeStackScreenProps<any, "Home">> = ({
  navigation: { navigate },
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    //redux-persit + asyncstorage 변경 예정
    AsyncStorage.getItem("VIEWED", (err: unknown, result: any) => {
      dispatch(setChapter(JSON.parse(result)));
    });
  }, []);

  const { isChapter } = useSelector((state: any) => state.Kanji);
  const renderGridItem = (itemData: IData) => {
    return (
      <TileWrap
        onPress={() => {
          if (itemData.item.title !== "내 단어") {
            navigate("Chapter", {
              title: itemData.item.title,
              chapter: itemData.item.chapter,
            });
          } else {
            navigate("MyWord");
          }
        }}
      >
        {isChapter &&
        isChapter.lenth !== 0 &&
        isChapter[0] === itemData.item.title ? (
          <Tiled>
            <ChapterText>{itemData.item.title}</ChapterText>
            <ChapterSubText>
              {itemData.item.subtitle}
              {itemData.item.subtitle !== "단어장" && "단어"}
            </ChapterSubText>
          </Tiled>
        ) : (
          <Tile>
            <ChapterText>{itemData.item.title}</ChapterText>
            <ChapterSubText>
              {itemData.item.subtitle}
              {itemData.item.subtitle !== "단어장" && "단어"}
            </ChapterSubText>
          </Tile>
        )}
      </TileWrap>
    );
  };
  return (
    <Wrapper>
      <Header>
        <Text>JLPT 단어</Text>
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
