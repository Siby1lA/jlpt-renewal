import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import styled from "styled-components/native";
interface IData {
  item: {
    id: string;
    page: string;
  };
}
const Wrapper = styled.View`
  flex: 1;
  background-color: ${(props: any) => props.theme.bgColor};
  shadow-offset: {
    width: 0;
    height: 1;
  }
  shadow-opacity: 0.2;
  shadow-radius: 10px;
  padding: 10px;
`;
const TileWrap = styled.TouchableOpacity`
  flex-grow: 1;
`;
const Tile = styled.View`
  border-radius: 10px;
  padding: 40px;
  margin: 10px;
  justify-content: center;
  background-color: ${(props: any) => props.theme.textColor};
  align-items: center;
`;
const ChapterText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
`;
const ChapterSubText = styled.Text`
  font-size: 18px;
  font-weight: 600;
`;

const Tiled = styled(Tile)`
  background-color: gray;
`;

const Chapter: React.FC<NativeStackScreenProps<any, "Chapter">> = ({
  route,
  navigation: { navigate, setOptions },
}) => {
  const { isChapter } = useSelector((state: any) => state.Kanji);
  const { title, chapter }: string | any = route.params;

  useEffect(() => {
    setOptions({ title: `JLPT ${title}` });
  }, []);
  const renderGridItem = (itemData: IData) => {
    return (
      <TileWrap
        onPress={() =>
          navigate("Kanji", {
            id: itemData.item.id,
            title: title,
            page: itemData.item.page,
          })
        }
      >
        {isChapter &&
        isChapter.lenth !== 0 &&
        isChapter[0] === title &&
        itemData.item.page === isChapter[1] ? (
          <Tiled>
            <ChapterText>{title}</ChapterText>
            <ChapterSubText>{itemData.item.page}</ChapterSubText>
          </Tiled>
        ) : (
          <Tile>
            <ChapterText>{title}</ChapterText>
            <ChapterSubText>{itemData.item.page}</ChapterSubText>
          </Tile>
        )}
      </TileWrap>
    );
  };
  return (
    <Wrapper>
      <FlatList
        keyExtractor={(item) => item.id + ""}
        data={chapter}
        renderItem={renderGridItem}
        numColumns={2}
      />
    </Wrapper>
  );
};

export default Chapter;
