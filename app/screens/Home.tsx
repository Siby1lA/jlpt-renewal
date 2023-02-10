import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { CATEGORIES } from "../data/list-data";
import { setChapter } from "../redux/actions/KanjiAction";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import AddBanner from "../components/AddBanner";
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
const Header = styled.View`
  border-radius: 10px;
  margin: 0px 20px;
  margin-top: 20px;
  padding: 10px;
  background-color: ${(props: any) => props.theme.cardColor};
  align-items: center;
  border: 1px solid;
  height: 170px;
  overflow: hidden;
  shadow-offset: {
    width: 0;
    height: 1;
  }
  shadow-opacity: 0.2;
  shadow-radius: 10px;
  elevation: 5;
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
  elevation: 5;
`;

const TileWrap = styled.TouchableOpacity`
  flex: 1;
  flex-grow: 1;
`;
const Tile = styled.View<ITheme>`
  border-radius: 10px;
  margin: 10px;
  padding: 20px;
  background-color: ${(props: any) => props.theme.cardColor};
  align-items: center;
  border: 1px solid;
  height: 170px;
`;

const ChapterText = styled.Text`
  margin-top: 11%;
  color: ${(props: any) => props.theme.textColor};
  font-size: 28px;
  font-family: "K-Gothic";
`;

const CharaImg = styled.Image`
  position: absolute;
  left: 35%;
  bottom: 0;
  width: 70px;
  height: 120px;
`;
const NikuImg = styled.Image`
  position: absolute;
  top: 1%;
  left: 24%;
  width: 110px;
  height: 80px;
`;
const TaberuImg = styled.Image`
  position: absolute;
  bottom: -11%;
  right: 0;
  width: 100px;
  height: 100px;
  z-index: -1;
`;
const MeigenText = styled.Text`
  font-family: "K-Gothic";
  font-size: 18px;
`;

const AutherText = styled(MeigenText)`
  position: absolute;
  bottom: 15%;
  left: 5%;
`;
const Home: React.FC<NativeStackScreenProps<any, "Home">> = ({
  navigation,
}) => {
  const [meigen, setMeigen] = useState<string>("");
  const [auther, setAuther] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          onPress={() => navigation.navigate("Setting")}
          name="settings-sharp"
          size={26}
          color="#ecf0f1"
        />
      ),
      headerLeft: () => (
        <MaterialIcons
          onPress={() =>
            navigation.navigate("Web", {
              title: "이벤트",
              uri: "https://clear-index-f4b.notion.site/75e54a1703d2415ab4431861a1c60471",
            })
          }
          name="event-available"
          size={26}
          color="#ecf0f1"
        />
      ),
    });
  }, []);

  useEffect(() => {
    //redux-persit + asyncstorage 변경 예정
    AsyncStorage.getItem("VIEWED", (err: unknown, result: any) => {
      dispatch(setChapter(JSON.parse(result)));
    });
    fetch("https://meigen.doodlenote.net/api/json.php")
      .then((res) => res.json())
      .then((res) => {
        setMeigen(res[0].meigen);
        setAuther(res[0].auther);
      });
  }, []);
  const { isChapter } = useSelector((state: any) => state.Kanji);
  const renderGridItem = (itemData: IData) => {
    return (
      <TileWrap
        onPress={() => {
          if (itemData.item.title !== "単語") {
            navigation.navigate("Chapter", {
              title: itemData.item.title,
              chapter: itemData.item.chapter,
            });
          } else {
            navigation.navigate("MyWord");
          }
        }}
      >
        {isChapter &&
        isChapter.lenth !== 0 &&
        isChapter[0] === itemData.item.title ? (
          <Tile>
            <CharaImg source={require("../assets/image/chara.png")} />
            <NikuImg source={require("../assets/image/niku2.png")} />
            <ChapterText>{itemData.item.title}</ChapterText>
          </Tile>
        ) : (
          <Tile>
            <CharaImg source={require("../assets/image/chara.png")} />
            <NikuImg source={require("../assets/image/niku.png")} />
            <ChapterText>{itemData.item.title}</ChapterText>
          </Tile>
        )}
      </TileWrap>
    );
  };
  return (
    <Wrapper>
      <Header>
        <MeigenText>
          {meigen.slice(0, 60)}
          {meigen.length > 60 && "..."}
        </MeigenText>
        <AutherText>-{auther}-</AutherText>
        <TaberuImg source={require("../assets/image/taberu.png")} />
      </Header>
      <Contents>
        <FlatList
          data={CATEGORIES}
          renderItem={renderGridItem}
          keyExtractor={(item) => item.title + ""}
          numColumns={2}
        />
      </Contents>
      <AddBanner />
    </Wrapper>
  );
};

export default Home;
