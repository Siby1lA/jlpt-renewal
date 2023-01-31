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

const Contents = styled.View`
  flex: 1;
  margin: 10px;
  shadow-offset: {
    width: 0;
    height: 1;
  }
  shadow-opacity: 0.2;
  shadow-radius: 10px;
`;

const TileWrap = styled.TouchableOpacity`
  flex: 1;
  flex-grow: 1;
`;
const Tile = styled.View<ITheme>`
  border-radius: 10px;
  margin: 15px;
  padding: 20px;
  background-color: ${(props: any) => props.theme.cardColor};
  align-items: center;
  border: 1px solid;
  height: 170px;
`;
const Tiled = styled(Tile)`
  background-color: #aaaaaa;
`;
const TextWrap = styled.View`
  background-color: ${(props: any) => props.theme.cardColor};
  border-radius: 12px;
  padding: 7px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  border: 1px solid;
`;
const ChapterText = styled.Text`
  color: ${(props: any) => props.theme.wordColor};
  font-size: 30px;
  font-weight: 500;
`;

const CharaImg = styled.Image`
  position: absolute;
  left: 35%;
  bottom: 0;
  width: 70px;
  height: 120px;
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
            <CharaImg source={require("../assets/image/chara.png")} />
            <TextWrap>
              <ChapterText>{itemData.item.title}</ChapterText>
            </TextWrap>
          </Tiled>
        ) : (
          <Tile>
            <CharaImg source={require("../assets/image/chara.png")} />
            <TextWrap>
              <ChapterText>{itemData.item.title}</ChapterText>
            </TextWrap>
          </Tile>
        )}
      </TileWrap>
    );
  };
  return (
    <Wrapper>
      <Contents>
        <FlatList
          data={CATEGORIES}
          renderItem={renderGridItem}
          keyExtractor={(item) => item.title + ""}
          numColumns={2}
        />
      </Contents>
    </Wrapper>
  );
};

export default Home;
