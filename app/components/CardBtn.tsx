import styled from "styled-components/native";
import {
  setHiragana,
  setImi,
  setReibun,
  setReset,
} from "../redux/actions/TriggerAction";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { useDispatch, useSelector } from "react-redux";
const Navi = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 10px;
  padding-bottom: 20px;
  margin-bottom: 5%;
`;

const Btn = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;
const NaviText = styled.Text`
  font-size: 14px;
  margin-top: 5px;
  color: #27272a;
`;
const CardBtn = () => {
  const { isHiragana, isImi, isReibun, isReset } = useSelector(
    (state: any) => state.Trigger
  );
  const dispatch = useDispatch();
  return (
    <Navi>
      <Btn
        onPress={() =>
          isHiragana
            ? dispatch(setHiragana(false))
            : dispatch(setHiragana(true))
        }
      >
        <MaterialCommunityIcons
          name="syllabary-hiragana"
          size={30}
          color={"#27272a"}
        />
        <NaviText>히라가나</NaviText>
      </Btn>
      <Btn
        onPress={() =>
          isImi ? dispatch(setImi(false)) : dispatch(setImi(true))
        }
      >
        <MaterialCommunityIcons
          name="lightbulb-on-outline"
          size={30}
          color={"#27272a"}
        />
        <NaviText>의미</NaviText>
      </Btn>
      <Btn
        onPress={() =>
          isReibun ? dispatch(setReibun(false)) : dispatch(setReibun(true))
        }
      >
        <FontAwesome name="language" size={30} color={"#27272a"} />
        <NaviText>예문</NaviText>
      </Btn>
      <Btn
        onPress={() =>
          isReset ? dispatch(setReset(false)) : dispatch(setReset(true))
        }
      >
        <AntDesign name="retweet" size={30} color={"#27272a"} />
        <NaviText>리셋</NaviText>
      </Btn>
    </Navi>
  );
};

export default CardBtn;
