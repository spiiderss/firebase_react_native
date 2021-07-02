import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchFollow } from "../../redux/auth/API";
import firebase from "firebase";
require("firebase/firestore");
const Profiles = ({ route }) => {
  const [userPost, setUserPost] = useState([]);
  const [user, setUser] = useState(null);
  const [follow, setFollow] = useState(false);
  // 拿取state中的信息
  const currentUser = useSelector((state) => state.auth.currentUser);
  const userFollows = useSelector((state) => state.auth.userFollows);
  const posts = useSelector((state) => state.auth.posts);
  // 如果从main 或者search 导航来的uid === currentuid 就将redux中的 用户的posts设置进profile的user
  // 和 posts中，否则就去用这个新的uid发起一个请求
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(1);
    if (route.params.uid === firebase.auth().currentUser.uid) {
      setUser(currentUser);
      setUserPost(posts);
    } else {
      firebase
        .firestore()
        .collection("users")
        .doc(route.params.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setUser(snapshot.data());
          } else {
            console.log("user is not exist");
          }
        });
      firebase
        .firestore()
        .collection("posts")
        .doc(route.params.uid)
        .collection("userPosts")
        .orderBy("creation", "asc")
        .get()
        .then((snapshot) => {
          let posts = snapshot.docs.map((item) => {
            const { title, uri } = item.data();
            const id = item.id;
            return { id, title, uri };
          });
          setUserPost(posts);
        });
    }
    // 判断当前用户的粉丝列表中是否存在search用户的id 如果有就显示取消关注，否则就显示关注
    if (userFollows.indexOf(route.params.uid) > -1) {
      setFollow(true);
    } else {
      setFollow(false);
    }
  }, [route.params.uid, userFollows]);
  // 登出
  const onLogout = () => {
    firebase.auth().signOut();
  };
  // 关注
  const onFollow = () => {
    firebase
      .firestore()
      .collection("follow")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollows")
      .doc(route.params.uid)
      .set({});
    fetchFollow(dispatch);
  };
  // 取消关注
  const onUnFollow = () => {
    firebase
      .firestore()
      .collection("follow")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollows")
      .doc(route.params.uid)
      .delete();
    setFollow(false);
  };
  if (user === null) {
    return <View />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text>{user?.name}</Text>
        <Text>{user?.email}</Text>
        {route.params.uid !== firebase.auth().currentUser.uid ? (
          follow ? (
            <View>
              <Button title="unfollow" onPress={onUnFollow} />
            </View>
          ) : (
            <View>
              <Button title="follow" onPress={onFollow} />
            </View>
          )
        ) : (
          <Button title="Logout" onPress={onLogout} />
        )}
      </View>
      <View style={styles.containerGallery}>
        {userPost.length >= 1 && (
          <FlatList
            numColumns={3}
            horizontal={false}
            data={userPost}
            renderItem={({ item }) => {
              return (
                <View style={styles.imageContainer}>
                  <Image source={{ uri: item.uri }} style={styles.image} />
                </View>
              );
            }}
          />
        )}
        {userPost.length === 0 && (
          <View>
            <Text>This user is not publish some posts in here</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Profiles;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  containerInfo: {
    margin: 20,
  },
  containerGallery: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    aspectRatio: 1 / 1,
    width: 100,
    height: 100,
  },
  imageContainer: {
    flex: 1 / 3,
    justifyContent: "center",
  },
});
