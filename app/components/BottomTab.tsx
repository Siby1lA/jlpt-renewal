import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const Navi = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 8%;
  flex-direction: row;
  justify-content: space-around;
  padding: 5px;
  padding-bottom: 20px;
  background-color: ${(props) => props.theme.textColor};
`;

const Btn = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

type RootStackParamList = {
  Home: undefined;
  Board: undefined;
  Setting: undefined;
  Mypage: undefined;
  Register: undefined;
};

const BottomTab = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { name } = route;
  return (
    <Navi>
      <Btn onPress={() => navigation.replace("Home")}>
        <Ionicons
          name={name === "Home" ? "home" : "home-outline"}
          size={24}
          color={"#ecf0f1"}
        />
      </Btn>
      <Btn onPress={() => navigation.replace("Board")}>
        <Ionicons
          name={name === "Board" ? "chatbox" : "chatbox-outline"}
          size={24}
          color={"#ecf0f1"}
        />
      </Btn>
      <Btn onPress={() => navigation.replace("Mypage")}>
        <Ionicons
          name={name === "Mypage" ? "person" : "person-outline"}
          size={24}
          color={"#ecf0f1"}
        />
      </Btn>
      <Btn onPress={() => navigation.replace("Register")}>
        <Ionicons
          name={name === "Mypage" ? "person" : "person-outline"}
          size={24}
          color={"#ecf0f1"}
        />
      </Btn>
    </Navi>
  );
};

export default BottomTab;
