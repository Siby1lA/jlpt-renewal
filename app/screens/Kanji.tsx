import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { setChapter } from "../redux/actions/KanjiAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import {
  Alert,
  DataDetectorTypes,
  FlatList,
  Modal,
  Pressable,
  ProgressBarAndroidBase,
} from "react-native";
import { setMovePage } from "../redux/actions/TriggerAction";
import { ParamListBase } from "@react-navigation/native";
import { RootState } from "../redux/reducer";
const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.bgColor};
`;
const ModalWrap = styled.View`
  flex: 1;
  position: absolute;
  top: 25%;
  left: 10%;
  width: 80%;
`;
const Box = styled.View`
  border: 1px solid;
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 12px;
  justify-content: center;
  align-items: center;
`;
const BtnWrap = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;
const BtnGo = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 15px;
  border-top-width: 1px;
  border-color: gray;
`;
const BtnCan = styled(BtnGo)`
  border-left-width: 1px;
`;
const FlatListBox = styled.View`
  overflow: hidden;
  justify-content: center;
  align-items: center;
  padding: 30px 0px;
`;

const FlatListText = styled.Text`
  font-family: "K-Gothic";
  margin: 5px;
  font-size: 20px;
`;
const FlatListIndex = styled.Text`
  font-family: "K-Gothic";
  margin: 5px;
`;
const Tile = styled.TouchableOpacity`
  border-radius: 10px;
  margin: 10px;
  padding: 20px;
  background-color: ${(props) => props.theme.cardColor};
  align-items: center;
  border: 1px solid;
`;
const TileRed = styled(Tile)`
  border-radius: 10px;
  margin: 10px;
  padding: 20px;
  background-color: ${(props) => props.theme.cardColor};
  align-items: center;
  border: 1px solid #fc5c65;
`;
const FirstText = styled.Text`
  font-weight: bold;
  font-size: 15px;
`;
const SecondText = styled(FirstText)`
  color: tomato;
`;
const TextInputBox = styled.View`
  border-bottom-width: 1px;
  border-color: gray;
  margin-bottom: 10px;
  width: 10%;
`;
const Input = styled.TextInput`
  font-family: "K-Gothic";
  font-size: 18px;
  text-align: center;
`;
type KanjiScreenParams = {
  id: string;
  page: string;
  title: string;
};

interface KanjiType {
  [key: string]: {
    [key: string]: {
      hurigana: string[];
      imi: string[];
      reibun: string[];
      kanji: string[];
      reibunImi: string[];
      reibunFurigana: string[];
    };
  };
}

const Kanji: React.FC<NativeStackScreenProps<ParamListBase, "Kanji">> = ({
  route,
  navigation,
}) => {
  const { id, title, page } = route.params as KanjiScreenParams;
  const Data: KanjiType = require("../data/data.json");
  const dispatch = useDispatch();
  const { isChapter } = useSelector((state: RootState) => state.Kanji);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [number, onChangeNumber] = useState<string>("");
  const flatRef = useRef<FlatList<DataDetectorTypes>>(null);

  useEffect(() => {
    navigation.setOptions({
      title: `${title} ${page}`,
      headerRight: () => (
        <Ionicons
          onPress={() => {
            setShowMenu(true);
          }}
          name="ios-search"
          size={24}
          color="#ecf0f1"
        />
      ),
    });
    //redux-persit + asyncstorage 변경 예정
    dispatch(setChapter([title, page]));
    AsyncStorage.setItem("VIEWED", JSON.stringify([title, page]));
  }, []);

  useEffect(() => {
    onChangeNumber("");
    setTimeout(() => {
      onChangeNumber("25");
    }, 500);
  }, [showMenu]);

  const viewed =
    isChapter &&
    isChapter.lenth !== 0 &&
    isChapter[0] === title &&
    isChapter[1] === page;
  const renderGridItem = (data: { item: string; index: number }) => {
    return (
      <FlatListBox key={data.item}>
        {Number(number) === data.index + 1 ? (
          <TileRed onPress={() => onChangeNumber(String(data.index + 1))}>
            <FlatListText>{data.item}</FlatListText>
            <FlatListIndex>{data.index + 1}</FlatListIndex>
          </TileRed>
        ) : (
          <Tile onPress={() => onChangeNumber(String(data.index + 1))}>
            <FlatListText>{data.item}</FlatListText>
            <FlatListIndex>{data.index + 1}</FlatListIndex>
          </Tile>
        )}
      </FlatListBox>
    );
  };

  if (flatRef.current && Number(number) - 1 < 50) {
    flatRef.current.scrollToIndex({
      animated: true,
      index: Number(number) - 1 === -1 ? 0 : Number(number) - 1,
    });
  }

  return (
    <Container>
      <Card
        data={Data[title][id]}
        pop={navigation.pop}
        viewed={viewed}
        myword={false}
        title={title}
        page={page}
      />
      <Modal
        onRequestClose={() => setShowMenu(false)}
        animationType={"fade"}
        transparent={true}
        visible={showMenu}
      >
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
          onPress={() => setShowMenu(false)}
        />
        <ModalWrap>
          <Box>
            <FlatList
              ref={flatRef}
              keyExtractor={(item) => item + ""}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={Data[title][id].kanji}
              renderItem={renderGridItem}
              onScrollToIndexFailed={(info) => {
                const wait = new Promise<void>((resolve) =>
                  setTimeout(resolve, 500)
                );
                wait.then(() => {
                  flatRef.current?.scrollToIndex({
                    index: info.index,
                    animated: true,
                  });
                });
              }}
            />
            <TextInputBox>
              <Input
                autoFocus
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={onChangeNumber}
                value={number}
              />
            </TextInputBox>
            <BtnWrap>
              <BtnGo
                onPress={() => {
                  const sendIndex = Number(number) - 1;
                  if (sendIndex < 50) {
                    dispatch(setMovePage(sendIndex));
                    setShowMenu(false);
                  } else {
                    Alert.alert("50이하의 숫자를 입력해주세요");
                  }
                }}
              >
                <FirstText>이동</FirstText>
              </BtnGo>
              <BtnCan onPress={() => setShowMenu(false)}>
                <SecondText>취소</SecondText>
              </BtnCan>
            </BtnWrap>
          </Box>
        </ModalWrap>
      </Modal>
    </Container>
  );
};

export default Kanji;
