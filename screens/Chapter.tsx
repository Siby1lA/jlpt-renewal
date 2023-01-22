import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import styled from "styled-components/native";
import { CHAPTER } from "../data/list-data";

const Wrapper = styled.View`
  height: 100%;
  background-color: ${(props) => props.theme.bgColor};
  align-items: center;
`;
const TileWrap = styled.TouchableOpacity``;
const Tile = styled.View`
  width: 160px;
  height: 130px;
  border-radius: 10px;
  padding: 30px;
  margin: 10px;
  justify-content: center;
  background-color: ${(props) => props.theme.textColor};
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
const Chapter: React.FC<NativeStackScreenProps<any, "Chapter">> = ({
  route,
  navigation: { navigate, setOptions },
}) => {
  const { title, chapter } = route.params;
  useEffect(() => {
    setOptions({ title: `JLPT ${title}` });
  }, []);
  const renderGridItem = (itemData) => {
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
        <Tile>
          <ChapterText>{title}</ChapterText>
          <ChapterSubText>{itemData.item.page}</ChapterSubText>
        </Tile>
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
