import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { searchUsers } from "../../redux/auth/API";
require("firebase/firestore");

const Search = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  const getUsers = async (search) => {
    const res = await searchUsers(search);
    setUsers(res);
  };

  return (
    <View>
      <TextInput
        onChangeText={(value) => {
          getUsers(value);
        }}
        placeholder="Search some user "
      />
      <FlatList
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Profile", {
                  uid: item.id,
                })
              }
            >
              <Text style={{ width: 100, height: 20 }}> name: {item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Search;
