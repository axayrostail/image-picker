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
import { ScrollView } from "react-navigation";
import {connect} from 'react-redux';

import {LoadDefaultImages, SaveNewImage} from './../resources-store/action';

function ImagePickerComponent(props) {
  const [resourcePath, setResourcePath] = useState({});
  const [captureImages, setCaptureImages] = useState([]);


  useEffect(() => {
   props.LoadDefaultImages();
  }, [])

  useEffect(() => {
    console.log('setCaptureImages ', props.images)
    setCaptureImages(props.images);

  }, [props.images])

  // Launch Camera
  const cameraLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
      includeBase64: true
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
        setCaptureImages({
          filePath: res.assets[0],
          fileData: res.assets[0].data,
          fileUri: res.assets[0].uri,
          data: res.assets[0].base64
        });
        props.SaveNewImage({category: 'Landscape', data: res.assets[0].base64})
        props.navigation.navigate('CategoryComponent');
      }
    });
  };

  const imageGalleryLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
      includeBase64: true
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
        setCaptureImages({
          filePath: res.assets[0],
          fileData: res.assets[0].data,
          fileUri: res.assets[0].uri,
          data: res.assets[0].base64
        });
        props.SaveNewImage({category: 'Landscape', data: res.assets[0].base64})
        props.navigation.navigate('CategoryComponent');
      }
    });
  };

 console.log('componetn >>>> ', captureImages)
  return (
      <View style={styles.container}>
        <ScrollView>
        <View style={{flex: 1, justifyContent: 'space-between', flexWrap: 'wrap', flexDirection: 'row'}}>
        {captureImages&& captureImages.length ? captureImages?.map((img, i) => 
          <View style={{padding: 10}} key={i}>
            <Image
              source={{
                uri: "data:image/jpeg;base64," + img?.data,
              }}
              style={{ width: 150, height: 120 }}
            />
            <Text style={{alignSelf: 'center'}}>{img?.category}</Text>
          </View>) : null}
        </View>
        </ScrollView>
        <View style={{alignSelf: 'center'}}>
        <TouchableOpacity onPress={() => cameraLaunch()} style={styles.button}>
          <Text style={styles.buttonText}>Launch Camera Directly</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => imageGalleryLaunch()}
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
    padding: 10,
    backgroundColor: "#fff",
  },
  button: {
    width: 250,
    height: 60,
    borderRadius: 20,
    backgroundColor: "#008CBA",
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

ImagePickerComponent['navigationOptions'] = screenProps => ({
  header: null,
})

const mapStateToProps = (state) => ({
  images: state.ImagePickerReducer.images,
})

const mapDispatchToProps = (dispatch) => ({
  LoadDefaultImages: ()  => dispatch(LoadDefaultImages()),
  SaveNewImage: (data) => dispatch(SaveNewImage(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ImagePickerComponent);
