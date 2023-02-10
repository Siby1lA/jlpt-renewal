import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import Data from "../data/data.json";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { setChapter } from "../redux/actions/KanjiAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CardBtn from "../components/CardBtn";
import { Ionicons } from "@expo/vector-icons";
import CustomMenu from "../components/CustomMenu";
import { Alert, FlatList, Modal, Text, TextInput, View } from "react-native";
import { setMovePage } from "../redux/actions/TriggerAction";
const Container = styled.View`
  flex: 1;
  background-color: ${(props: any) => props.theme.bgColor};
`;
const ModalWrap = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: -1;
`;
const Box = styled.View`
  position: absolute;
  top: 25%;
  left: 10%;
  width: 80%;
  border: 1px solid;
  background-color: ${(props: any) => props.theme.cardColor};
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  z-index: 30;
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
  background-color: ${(props: any) => props.theme.cardColor};
  align-items: center;
  border: 1px solid;
`;
const TileRed = styled(Tile)`
  border-radius: 10px;
  margin: 10px;
  padding: 20px;
  background-color: ${(props: any) => props.theme.cardColor};
  align-items: center;
  border: 1px solid #fc5c65;
`;
const FirstText = styled.Text`
  font-size: 16px;
`;
const SecondText = styled(FirstText)`
  color: tomato;
`;
const TextInputBox = styled.View`
  border-bottom-width: 1px;
  border-color: gray;
  margin-bottom: 10px;
`;
const Input = styled.TextInput`
  font-family: "K-Gothic";
  font-size: 18px;
`;
const Kanji: React.FC<NativeStackScreenProps<any, "Kanji">> = ({
  route,
  navigation,
}) => {
  const { id, title, page }: string | any = route.params;
  const dispatch = useDispatch();
  const { isChapter } = useSelector((state: any) => state.Kanji);
  const [showMenu, setShowMenu] = useState(false);
  const [number, onChangeNumber] = useState("");
  const flatRef = useRef<any>();
  useEffect(() => {
    navigation.setOptions({
      title: `${title} ${page}`,
      headerRight: () => (
        <Ionicons
          onPress={() => {
            setShowMenu(true);
          }}
          name="ios-search"
          size={26}
          color="#ecf0f1"
        />
      ),
    });
    //redux-persit + asyncstorage 변경 예정
    dispatch(setChapter([title, page]));
    AsyncStorage.setItem("VIEWED", JSON.stringify([title, page]));
  }, []);
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
      />
      <CardBtn />
      <Modal animationType={"fade"} transparent={true} visible={showMenu}>
        <ModalWrap>
          <Box>
            <FlatList
              ref={flatRef}
              keyExtractor={(item) => item + ""}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={Data[title][id].kanji}
              renderItem={renderGridItem}
            />
            <TextInputBox>
              <Input
                autoFocus
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={onChangeNumber}
                value={number}
                placeholder="이동할 페이지 번호를 입력해 주세요"
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
