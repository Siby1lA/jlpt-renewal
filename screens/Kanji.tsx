import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";

const Kanji: React.FC<NativeStackScreenProps<any, "Kanji">> = () => {
  return (
    <View>
      <Text>한자</Text>
    </View>
  );
};

export default Kanji;
