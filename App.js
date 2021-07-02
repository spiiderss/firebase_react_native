import { StatusBar } from "expo-status-bar";

//react pakage
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// firebase
import firebase from "firebase";
// redux
import store from "./redux/store";
import { Provider } from "react-redux";
// file import
import Main from "./components/Main";
import Add from "./components/main/Add";
import Landing from "./components/auth/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Save from "./components/main/Save";

const Stack = createStackNavigator();
const firebaseConfig = {
  apiKey: "AIzaSyCWpsAkNapHOlqmgqHSvwJggoxVBPcPrdc",
  authDomain: "instagram-project-a88d7.firebaseapp.com",
  projectId: "instagram-project-a88d7",
  storageBucket: "instagram-project-a88d7.appspot.com",
  messagingSenderId: "982628519714",
  appId: "1:982628519714:web:e2cabefb3bfc659f85df7b",
  measurementId: "G-RSG14T741D",
};
//if not app in firebase and also you has a firebase config  this file is your google firebase api keys , just initialization a
// firebase in this .
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      loaded: false,
    };
  }
  // 判断用户是否登录
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>Loading</Text>
        </View>
      );
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={Landing} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Add" component={Add} />
            <Stack.Screen name="Save" component={Save} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
