import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Picker } from "react-native";
import { connect } from "react-redux";
import {AddToGallery} from './../resources-store/action';


function CategoryComponent(props) {
  const [selectedImage, setSelectedImage] = useState({});

  useEffect(() => {
    setSelectedImage(props.selectedImage);
  }, [props.selectedImage]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 10 }}>
        <Image
          source={{
            uri: "data:image/jpeg;base64," + selectedImage?.data,
          }}
          style={{ width: 340, height: 320 }}
        />
         <Picker
            selectedValue={selectedImage?.category}
            style={{ height: 50, width: 150, alignSelf: 'center' }}
            onValueChange={(itemValue, itemIndex) => setSelectedImage({category:itemValue, data:selectedImage?.data })}
          >
            <Picker.Item label="Landscape" value="landscape" />
            <Picker.Item label="Abstract" value="abstract" />
        </Picker>
      </View>
      <TouchableOpacity onPress={() => {
            props?.AddToGallery(selectedImage);
            props.navigation.pop()
          }} style={{  width: 250,
            height: 60,
            borderRadius: 20,
            backgroundColor: "#008CBA",
            alignSelf: "center",
            justifyContent: "center",
            borderRadius: 4,
            marginTop: 'auto',
            marginBottom: 12,
            }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 15,
            color: "#fff"
          }}
        >
          Save Image
        </Text>
      </TouchableOpacity>
    </View>
  );
}

CategoryComponent["navigationOptions"] = (screenProps) => ({
  title: "Select category",
});

const mapStateToProps = (state) => ({
  selectedImage: state.ImagePickerReducer.selectedImage,
});

const mapDispatchToProps = (dispatch) => ({
    AddToGallery: (data)  => dispatch(AddToGallery(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryComponent);
