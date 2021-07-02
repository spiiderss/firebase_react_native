import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Image,
  ScrollView,
} from "react-native";

import {
  fetchUserFollowingPosts,
  fetchUserData,
} from "../../redux/auth/userAPI";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase";
const Feed = ({ navigation }) => {
  const users = useSelector((state) => state.user.users);
  const userLoaded = useSelector((state) => state.user.userLoaded);
  const time = 1;
  const dispatch = useDispatch();
  useEffect(() => {
    fetchUserData(dispatch, firebase.auth().currentUser.uid, users);
    fetchUserFollowingPosts(dispatch, firebase.auth().currentUser.uid);
  }, []);

  return (
    <View>
      {/* <Button
        title="feedUserInfo"
        onPress={() => {
          fetchUserData(dispatch, firebase.auth().currentUser.uid, users);
        }}
      />
      <Button
        title="feedUserPosts"
        onPress={() => {
          fetchUserData(dispatch, firebase.auth().currentUser.uid, users);
          fetchUserFollowingPosts(dispatch, firebase.auth().currentUser.uid);
        }}
      /> */}
      <View>
        <Text>{users[0]?.name}</Text>
        <Text>{users[0]?.email}</Text>

        {users.length >= 1 && (
          <FlatList
            numColumns={1}
            horizontal={false}
            data={users[0].posts}
            renderItem={({ item }) => {
              console.log(item);
              return (
                <ScrollView>
                  <Text>{item.title}</Text>
                  <Image source={{ uri: item.uri }} style={styles.image} />
                  <Text
                    onPress={() =>
                      navigation.navigate("comment", {
                        uid: item.uid,
                      })
                    }
                  >
                    View comments...
                  </Text>
                </ScrollView>
              );
            }}
          />
        )}
      </View>
    </View>
  );
};

export default Feed;

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
    aspectRatio: 1 / 2,
    width: 300,
    height: 300,
  },
  imageContainer: {
    flex: 1 / 3,
    justifyContent: "center",
  },
});
