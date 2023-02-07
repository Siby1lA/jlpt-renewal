import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { Alert, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { setChapter } from "../redux/actions/KanjiAction";
import { Ionicons } from "@expo/vector-icons";
// import {
//   BannerAd,
//   BannerAdSize,
//   TestIds,
// } from "react-native-google-mobile-ads";

interface IData {
  item: {
    id: string;
    page: string;
  };
}
const Wrapper = styled.View`
  flex: 1;
  background-color: ${(props: any) => props.theme.bgColor};
`;
const Contents = styled.View`
  flex: 1;
  margin: 10px;
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
  margin: 10px;
  padding: 20px;
  background-color: ${(props: any) => props.theme.cardColor};
  align-items: center;
  border: 1px solid;
  height: 170px;
`;
const ChapterText = styled.Text`
  color: ${(props: any) => props.theme.wordColor};
  font-size: 28px;
  /* margin-top: 11%; */
  margin-top: 13px;
  font-family: "K-Gothic";
`;

const CharaImg = styled.Image`
  position: absolute;
  bottom: 0;
  width: 70px;
  height: 120px;
`;
const NikuImg = styled.Image`
  position: absolute;
  width: 110px;
  height: 80px;
`;

const Chapter: React.FC<NativeStackScreenProps<any, "Chapter">> = ({
  route,
  navigation,
}) => {
  const { isChapter } = useSelector((state: any) => state.Kanji);
  const { title, chapter }: string | any = route.params;
  const dispatch = useDispatch();
  useEffect(() => {
    navigation.setOptions({
      title: `${title === "単語" ? "" : "JLPT"} ${title}`,
      headerRight: () => (
        <Ionicons
          onPress={() => navigation.navigate("Setting")}
          name="settings-sharp"
          size={26}
          color="#ecf0f1"
        />
      ),
    });

    if (isChapter === null) {
      dispatch(setChapter(["0", "0"]));
    }
  }, []);
  const renderGridItem = (itemData: IData) => {
    return (
      <TileWrap
        onPress={() => {
          if (
            (isChapter[0] === title && isChapter[1] === itemData.item.page) ||
            isChapter[0] === "0"
          ) {
            navigation.navigate("Kanji", {
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
                    navigation.navigate("Kanji", {
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
          <Tile>
            <CharaImg source={require("../assets/image/chara.png")} />
            <NikuImg source={require("../assets/image/niku2.png")} />
            <ChapterText>{itemData.item.page}</ChapterText>
          </Tile>
        ) : (
          <Tile>
            <CharaImg source={require("../assets/image/chara.png")} />
            <NikuImg source={require("../assets/image/niku.png")} />
            <ChapterText>{itemData.item.page}</ChapterText>
          </Tile>
        )}
      </TileWrap>
    );
  };
  return (
    <Wrapper>
      <Contents>
        <FlatList
          keyExtractor={(item) => item.id + ""}
          data={chapter}
          renderItem={renderGridItem}
          numColumns={2}
        />
      </Contents>

      {/* <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.FULL_BANNER} /> */}
    </Wrapper>
  );
};

export default Chapter;
