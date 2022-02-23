/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  useColorScheme,
  View,
} from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { store, persistor }  from './app/src/redux-store/store';
import ImagePickerComponent from './app/src/components/index';


const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View style={{flex:1}}>
    <Provider store={store}>
       <PersistGate persistor={persistor}>
           <ImagePickerComponent></ImagePickerComponent>
       </PersistGate>
     </Provider>
   </View>
  );
};


export default App;
