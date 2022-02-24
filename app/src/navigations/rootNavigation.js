import React from 'react';
import { View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import ImagePickerComponent from '../components/index';
import CategoryComponent from '../components/category';


const RootStack = createStackNavigator(
  {
    ImagePickerComponent,
    CategoryComponent
  },{
    initialRouteName: 'ImagePickerComponent',
  }
);

const App = createAppContainer(RootStack);


const RootComponent = () => (
  <View style={{ flex: 1 }}>
    <App />
  </View>
);

export default RootComponent;

