import { Platform } from "react-native";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
const AddBanner = () => {
  const unitId =
    Platform.OS === "ios"
      ? "ca-app-pub-8661339697648826/6832218222" //ios unitId
      : "ca-app-pub-8661339697648826/9913477448"; // android unitId
  return <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.FULL_BANNER} />;
};

export default AddBanner;
