import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Text } from "react-native";
import BottomTab from "../components/BottomTab";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducer";
import { IUser } from "../redux/reducer/UserReducer";
import auth from "@react-native-firebase/auth";
import { setUserInfo } from "../redux/actions/UserAction";
import {
  login,
  logout,
  getProfile as getKakaoProfile,
} from "@react-native-seoul/kakao-login";
const Mypage: React.FC<NativeStackScreenProps<ParamListBase, "Mypage">> = ({
  route,
  navigation,
}) => {
  const { userInfo }: IUser = useSelector((state: RootState) => state.User);
  const [initializing, setInitializing] = useState(true);
  const dispatch = useDispatch();

  // 유저 로그인 상태 확인
  const onAuthStateChanged = (user: object | null) => {
    if (user) {
      dispatch(setUserInfo(user));
    } else {
      // user가 null이면 현재 로그인 안한 상태이다.
    }
    if (initializing) setInitializing(false);
  };

  // 로그아웃
  const onAuthLogOut = () => {
    // 카카오 로그아웃
    const signOutWithKakao = async (): Promise<void> => {
      try {
        const message = await logout();
      } catch (err) {
        console.error("signOut error", err);
      }
    };
    // 파이어 베이스 로그아웃
    auth()
      .signOut()
      .then(() =>
        dispatch(setUserInfo({ displayName: "", email: "", photoURL: "" }))
      );
  };

  // 카카오 로그인
  const onAuthLogIn = async (): Promise<void> => {
    try {
      const token = await login();
      // console.log(JSON.stringify(token));
      getProfile();
    } catch (err) {
      console.error("login err", err);
    }
  };

  // 유저 프로필 가져오기
  const getProfile = async (): Promise<void> => {
    try {
      const profile = await getKakaoProfile();
      const userInfoData = JSON.parse(JSON.stringify(profile));
      const { email, id, nickname } = userInfoData;
      auth()
        .signInWithEmailAndPassword(email, nickname + id)
        .then(() => {
          // 성공
        });
    } catch (err) {
      console.error("signOut error", err);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  // if (initializing) return <Text>로딩</Text>;

  return (
    <>
      <Text>마이 페이지</Text>
      {userInfo.email === "" ? (
        <Text onPress={() => onAuthLogIn()}>로그인</Text>
      ) : (
        <Text onPress={() => onAuthLogOut()}>로그아웃</Text>
      )}
      <Text>{userInfo.email}</Text>
      <BottomTab />
    </>
  );
};

export default Mypage;
