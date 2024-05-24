import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Button,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Camera } from "expo-camera";
import { shareAsync } from "expo-sharing";
import { useRouter } from "expo-router";
import * as MediaLibrary from "expo-media-library";

const takePick = () => {
  let cameraRef = useRef();
  const [photo, setPhoto] = useState();
  const [hasCameraPermission, sethasCameraPermission] = useState();
  const [hasMediaLibraryPermission, sethasMediaLibraryPermission] = useState();
  const router = useRouter();

  /* check camera and media permissions of your device */
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      sethasCameraPermission(cameraPermission.status === "granted");
      sethasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  });
  if (hasCameraPermission === undefined) {
    return <Text>Requesting permission</Text>;
  } else if (!hasCameraPermission) {
    return <Text>Persmission for camera not granted!</Text>;
  }
  /* take picture function using built in functions!! */
  const takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };
    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };
  if (photo) {
    /* share picture to others mideas or apps! */
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };
    /* save picture to midea libraray or gallary!*/
    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    return (
      <SafeAreaView>
        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        <Button title="share" onPress={sharePic} />
        {hasMediaLibraryPermission ? (
          <Button title="save" onPress={savePhoto} />
        ) : undefined}
        <Button title="Discard" onPress={() => setPhoto(undefined)} />
        <Button title="GOBack" onPress={() => router.push("/(tabs)/home")} />
      </SafeAreaView>
    );
  }

  return (
    <Camera className="flex-1 justify-center items-center " ref={cameraRef}>
      <View className="flex-1 justify-self-end items-end">
        <Button title="TakePic" onPress={takePic} />
      </View>
      <StatusBar style="auto" />
    </Camera>
  );
};
const styles = StyleSheet.create({
  preview: {
    alignSelf: "stretch",
    flex: -1,
  },
});
export default takePick;
