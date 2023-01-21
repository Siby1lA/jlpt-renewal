import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";

const Chapter: React.FC<NativeStackScreenProps<any, "Chapter">> = () => {
  return (
    <View>
      <Text>챕터</Text>
    </View>
  );
};

export default Chapter;
