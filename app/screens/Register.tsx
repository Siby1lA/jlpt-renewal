import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  login,
  logout,
  getProfile as getKakaoProfile,
  unlink,
} from "@react-native-seoul/kakao-login";
import styled from "styled-components/native";
import LottieView from "lottie-react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";

const Wrap = styled.View`
  background-color: ${(props) => props.theme.bgColor};
  position: relative;
`;

const ContentWrap = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
`;

const ContentText = styled.Text`
  margin-top: 25%;
  text-align: center;
  font-size: 22px;
  color: ${(props) => props.theme.wordColor};
  font-weight: 600;
`;
const ContentSubText = styled.Text`
  margin-top: 10px;
  text-align: center;
  font-size: 22px;
  color: ${(props) => props.theme.wordColor};
  font-weight: 600;
`;

const BtnWrap = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20%;
  width: 100%;
`;

const KaKaoBtn = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  background-color: #fedc3f;
  height: 30%;
  border-radius: 10px;
`;

const SkipBtn = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  background-color: #dfe4ea;
  height: 30%;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 10%;
`;
const SkipText = styled.Text`
  color: ${(props) => props.theme.wordColor};
  font-weight: 600;
`;
const KaKaoText = styled.Text`
  color: ${(props) => props.theme.wordColor};
  font-weight: 600;
`;
const KaKaoLogo = styled.Image`
  position: absolute;
  left: 0;
  margin-left: 10px;
  width: 40px;
  height: 40px;
`;
const Register: React.FC<NativeStackScreenProps<ParamListBase, "Register">> = ({
  route,
  navigation,
}) => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // ????????? ?????????
  const signInWithKakao = async (): Promise<void> => {
    try {
      const token = await login();
      // console.log(JSON.stringify(token));
      getProfile();
    } catch (err) {
      console.error("login err", err);
    }
  };
  // ????????? ????????????
  const signOutWithKakao = async (): Promise<void> => {
    try {
      const message = await logout();
    } catch (err) {
      console.error("signOut error", err);
    }
  };

  // ?????? ????????? ????????????
  const getProfile = async (): Promise<void> => {
    try {
      const profile = await getKakaoProfile();
      const userInfoData = JSON.parse(JSON.stringify(profile));
      const { email, id, nickname } = userInfoData;
      auth()
        .createUserWithEmailAndPassword(email, nickname + id)
        .then(() => {
          // console.log("??????????????????");
          navigation.replace("Home");
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            // ?????? ??????????????? ??????, ????????? ?????????.
            auth()
              .signInWithEmailAndPassword(email, nickname + id)
              .then(() => {
                navigation.replace("Home");
              });
          }
          if (error.code === "auth/invalid-email") {
            console.log("That email address is invalid!");
          }
          console.error(error);
        });
    } catch (err) {
      console.error("signOut error", err);
    }
  };

  // ?????? ??????
  const unlinkKakao = async (): Promise<void> => {
    try {
      const message = await unlink();
    } catch (err) {
      console.error("signOut error", err);
    }
  };
  return (
    <Wrap>
      <ContentWrap>
        <LottieView
          style={{
            width: "90%",
            position: "absolute",
            top: 15,
            right: 0,
          }}
          source={require("../assets/lottie/registerCat.json")}
          autoPlay
          loop
        />
        <ContentText>???????????? ?????? ?????? ???????????????</ContentText>
        <ContentSubText>???????????? ?????? ??? ?????? ???????????? ?????????</ContentSubText>
      </ContentWrap>
      <BtnWrap>
        <KaKaoBtn
          onPress={() => {
            signInWithKakao();
          }}
        >
          <KaKaoLogo source={require("../assets/image/kakaoLogo.png")} />
          <KaKaoText>????????? ?????????</KaKaoText>
        </KaKaoBtn>
        <SkipBtn onPress={() => navigation.replace("Home")}>
          <MaterialCommunityIcons
            style={{ position: "absolute", left: 0, marginLeft: 16 }}
            name="exit-run"
            size={25}
            color="black"
          />
          <SkipText>????????? ????????????</SkipText>
        </SkipBtn>
      </BtnWrap>
      {/* <BottomTab /> */}
    </Wrap>
  );
};

export default Register;
