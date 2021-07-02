import * as React from "react";
import { View, Text, Button, TextInput } from "react-native";
import firebase from "firebase";
const Register = ({ navigation }) => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    name: "",
  });
  // when user click this button  ,send request to firebase server ,save  this user info to your account firebase ,
  //   the firebase  has response some data for you , take that data to your project render .
  const onSignUp = () => {
    const { email, password, name } = formData;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email,
          });
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <View>
      <TextInput
        placeholder="name"
        onChangeText={(value) => setFormData({ ...formData, name: value })}
      />
      <TextInput
        placeholder="email"
        onChangeText={(value) => setFormData({ ...formData, email: value })}
      />
      <TextInput
        placeholder="password"
        //   秘密输入 用在密码上
        secureTextEntry={true}
        onChangeText={(value) => setFormData({ ...formData, password: value })}
      />

      <Button title="SignUp" onPress={onSignUp} />
    </View>
  );
};

export default Register;
