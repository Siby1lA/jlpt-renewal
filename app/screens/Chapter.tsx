import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { Alert, FlatList } from "react-native";
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
  padding: 10px;
`;
const TileWrap = styled.TouchableOpacity`
  flex-grow: 1;
  shadow-offset: {
    width: 0;
    height: 1;
  }
  shadow-opacity: 0.2;
  shadow-radius: 5px;
`;
const Tile = styled.View`
  border-radius: 10px;
  padding: 40px;
  margin: 10px;
  justify-content: center;
  background-color: ${(props: any) => props.theme.cardColor};

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
    setOptions({ title: `${title === "내 단어" ? "" : "JLPT"} ${title}` });
  }, []);
  const renderGridItem = (itemData: IData) => {
    return (
      <TileWrap
        onPress={() => {
          if (
            (isChapter[0] === title && isChapter[1] === itemData.item.page) ||
            isChapter[0] === "0"
          ) {
            navigate("Kanji", {
              id: itemData.item.id,
              title: title,
              page: itemData.item.page,
            });
          } else if (isChapter[0] !== undefined) {
            Alert.alert(
              `${isChapter[0]} ${isChapter[1]}을 진행중입니다.`,
              `진행했던 데이터를 포기하고 \n${title} ${itemData.item.page}으로 넘어가시겠습니까?`,
              [
                {
                  text: "네",
                  style: "cancel",
                  onPress: () => {
                    navigate("Kanji", {
                      id: itemData.item.id,
                      title: title,
                      page: itemData.item.page,
                    });
                  },
                },
                {
                  text: "아니오",
                  style: "destructive",
                  onPress: () => {},
                },
              ]
            );
          }
        }}
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
