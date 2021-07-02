import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

// 照相功能
export default function App({ navigation }) {
  const [hasgalleryPermission, setGalleryPermission] = useState(null);
  const [hasCameraPermission, setCameraPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  // 设置camera ref
  const [camera, setCamera] = useState(null);
  // 存储拍照的照片
  const [image, setImage] = useState(null);
  // 相机和图库的许可
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setCameraPermission(cameraStatus.status === "granted");
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);
  // 拍照功能
  const tackPicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }
  };
  // 选取图片
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (hasCameraPermission === null || hasgalleryPermission === false) {
    return <View />;
  }
  if (hasCameraPermission === false || hasgalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          ratio={{ 1: 1 }}
          type={type}
        />
      </View>
      <Button
        title="Flip Image"
        style={{
          flex: 0.1,
          alignSelf: "flex-end",
          alignItems: "center",
        }}
        // 选择背面和前面相机
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}
      />
      <Button title="Tack Picture" onPress={tackPicture} />
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {/* 点击去往Save页面 */}
      <Button
        title="Save image"
        onPress={() => navigation.navigate("Save", { image })}
      />
      {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
});
