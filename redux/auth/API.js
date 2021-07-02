import firebase from "firebase";
import { inc, userPost, addUserFollows, clearUserPosts } from "./authSlice";
// 拿到现在登录的用户的信息{name & email}
export const fetchuser = (dispatch) => {
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then((snapshot) => {
      if (snapshot.exists) {
        dispatch(inc(snapshot.data()));
      } else {
        console.log("user is not exist");
      }
    });
};
// 获取任意uid 的用户的信息
export const fetchAnyUser = (dispatch, uid) => {
  firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .get()
    .then((snapshot) => {
      if (snapshot.exists) {
        dispatch(inc(snapshot.data()));
      } else {
        console.log("user is not exist");
      }
    });
};

// 拿到现有用户发布的照片 {id title and image}
export const fetchUserPosts = (dispatch) => {
  firebase
    .firestore()
    .collection("posts")
    .doc(firebase.auth().currentUser.uid)
    .collection("userPosts")
    .orderBy("creation", "asc")
    .get()
    .then((snapshot) => {
      let posts = snapshot.docs.map((item) => {
        const { title, uri } = item.data();
        const id = item.id;
        return { id, title, uri };
      });
      dispatch(userPost(posts));
    });
};
// 搜索用户
export const searchUsers = (search) => {
  return firebase
    .firestore()
    .collection("users")
    .where("name", "==", search)
    .get()
    .then((snapshot) => {
      let users = snapshot.docs.map((item) => {
        const data = item.data();
        const id = item.id;
        return { id, ...data };
      });
      return users;
    });
};

// 获取用户粉丝
export const fetchFollow = (dispatch) => {
  firebase
    .firestore()
    .collection("follow")
    .doc(firebase.auth().currentUser.uid)
    .collection("userFollows")
    .onSnapshot((snapshot) => {
      let follows = snapshot.docs.map((item) => {
        return item.id;
      });
      dispatch(addUserFollows(follows));
    });
};
// 清除data
export const clearData = (dispatch) => {
  dispatch(clearUserPosts());
};
