import firebase from "firebase";
import { users_data_state_change, user_Post_change } from "./userSlice";
export const fetchUserData = (dispatch, uid, users) => {
  const found = users.some((item) => item.uid === uid);
  if (!found) {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          let user = snapshot.data();
          user.uid = snapshot.id;
          dispatch(users_data_state_change(user));
        }
      });
  }
};

export const fetchUserFollowingPosts = (dispatch, uid) => {
  firebase
    .firestore()
    .collection("posts")
    .doc(uid)
    .collection("userPosts")
    .orderBy("creation", "asc")
    .get()
    .then((snapshot) => {
      const uid = snapshot.docs[0].ref.path.split("/")[1];
      let posts = snapshot.docs.map((item) => {
        const { title, uri } = item.data();
        const id = item.id;
        return { id, title, uri };
      });
      dispatch(user_Post_change({ posts, uid }));
    });
};
