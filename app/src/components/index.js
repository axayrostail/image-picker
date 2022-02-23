// App.js
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import ImagePicker, {
  showImagePicker,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";
import {connect} from 'react-redux';

import {LoadDefaultImages} from './../resources-store/action';

function ImagePickerComponent(props) {
  const [resourcePath, setResourcePath] = useState({});

  useEffect(() => {
   props.LoadDefaultImages();
  }, [])

  useEffect(() => {
    console.log('>>>>>>> ', props.images);

  }, [props.images])

  // Launch Camera
  const cameraLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    launchCamera(options, (res) => {
      console.log("Response = ", res);
      if (res.didCancel) {
        console.log("User cancelled image picker");
      } else if (res.error) {
        console.log("ImagePicker Error: ", res.error);
      } else if (res.customButton) {
        console.log("User tapped custom button: ", res.customButton);
        alert(res.customButton);
      } else {
        const source = { uri: res.uri };
        console.log("response", JSON.stringify(res));
        this.setState({
          filePath: res,
          fileData: res.data,
          fileUri: res.uri,
        });
      }
    });
  };

  const imageGalleryLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    launchImageLibrary(options, (res) => {
      console.log("Response = ", res);
      if (res.didCancel) {
        console.log("User cancelled image picker");
      } else if (res.error) {
        console.log("ImagePicker Error: ", res.error);
      } else if (res.customButton) {
        console.log("User tapped custom button: ", res.customButton);
        alert(res.customButton);
      } else {
        const source = { uri: res.uri };
        console.log("response", JSON.stringify(res));
        this.setState({
          filePath: res,
          fileData: res.data,
          fileUri: res.uri,
        });
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Image
          source={{
            uri: "data:image/jpeg;base64," + resourcePath.data,
          }}
          style={{ width: 100, height: 100 }}
        />
        <Image
          source={{ uri: resourcePath.uri }}
          style={{ width: 200, height: 200 }}
        />
        <Text style={{ alignItems: "center" }}>{resourcePath.uri}</Text>
        <TouchableOpacity onPress={() => cameraLaunch()} style={styles.button}>
          <Text style={styles.buttonText}>Launch Camera Directly</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => launchImageLibrary()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Launch Image Gallery Directly</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  button: {
    width: 250,
    height: 60,
    backgroundColor: "#3740ff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    marginBottom: 12,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 15,
    color: "#fff",
  },
});

const mapStateToProps = (state) => ({
  images: {...state.ImagePickerReducer.images},
})

const mapDispatchToProps = (dispatch) => ({
  LoadDefaultImages: ()  => dispatch(LoadDefaultImages()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImagePickerComponent);
