import React, { useState } from "react";
import { View, TextInput, Image, Text, Button } from "react-native";
import firebase from "firebase";
require("firebase/firebase-storage");
import { useDispatch } from "react-redux";
import { fetchUserPosts } from "../../redux/auth/API";
// 保存照片
const save = ({ route, navigation }) => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const uploadImage = async () => {
    // 对图片发起请求拿到blob资源
    const uri = route.params.image;
    const res = await fetch(uri);
    const blob = await res.blob();
    // 自定义存储库的名字 例如 post / 用户id /随机
    const childPath = `post/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString(36)}/`;
    console.log(childPath);
    // 将blob资源存储入firebase
    const task = firebase.storage().ref().child(childPath).put(blob);

    const taskProgress = (snapshot) => {
      console.log(`transferrd:${snapshot.bytesTransferrd}`);
    };
    const taskComplete = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        // 将照片存入
        savePostData(snapshot);
      });
    };
    const taskError = (snapshot) => {
      console.log(snapshot);
    };
    task.on("state_changed", taskProgress, taskError, taskComplete);
  };
  const savePostData = (uri) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .add({
        uri,
        title,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        navigation.popToTop();
        fetchUserPosts(dispatch);
      });
  };
  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: route.params.image }} style={{ flex: 1 }} />
      <TextInput
        placeholder="Write a caption. . ."
        onChangeText={(value) => {
          setTitle(value);
        }}
      />
      <Button title="Save" onPress={uploadImage} />
    </View>
  );
};

export default save;
