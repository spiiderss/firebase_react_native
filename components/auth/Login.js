import * as React from "react";
import { View, Text, Button, TextInput } from "react-native";
import firebase from "firebase";
const Login = ({ navigation }) => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  // when user click this button  ,send request to firebase server ,save  this user info to your account firebase ,
  //   the firebase  has response some data for you , take that data to your project render .
  const onLogin = () => {
    const { email, password } = formData;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <View>
      <TextInput
        placeholder="email"
        onChangeText={(value) => setFormData({ ...formData, email: value })}
      />
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        onChangeText={(value) => setFormData({ ...formData, password: value })}
      />

      <Button title="Login" onPress={onLogin} />
    </View>
  );
};

export default Login;
