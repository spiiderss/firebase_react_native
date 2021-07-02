import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Profile from "./main/Profiles";
import Feed from "./main/feed";
import {
  fetchuser,
  fetchUserPosts,
  fetchFollow,
  clearData,
} from "../redux/auth/API";
import { fetchUserFollowingPosts, fetchUserData } from "../redux/auth/userAPI";
import Search from "./main/Search";
import firebase from "firebase";
const Empty = () => {
  return null;
};
const time = 1;
const Tab = createMaterialBottomTabNavigator();
function Main() {
  const dispatch = useDispatch();
  // 拿到现在登录的用户的信息 账号和名字
  // const auth = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    clearData(dispatch);
    fetchFollow(dispatch);

    fetchuser(dispatch);
    fetchUserPosts(dispatch);
  }, [time]);
  return (
    <Tab.Navigator initialRouteName="Feed" labeled={false}>
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="AddContainer"
        component={Empty}
        // listen user action, if user click this button ,then navigate to Add screen .
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("Add");
          },
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-box" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("Profile", {
              uid: firebase.auth().currentUser.uid,
            });
          },
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Main;
