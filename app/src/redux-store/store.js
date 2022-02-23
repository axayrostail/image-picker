/* global devToolsExtension:false */
import { createLogicMiddleware } from 'redux-logic';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppReducer from './reducers';
import logic from './logic';

const logicMiddleware = createLogicMiddleware(logic);

const middleware = applyMiddleware(
  logicMiddleware
);

const enhancer =
  compose(
    middleware
  );

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['global']
};

const persistedReducer = persistReducer(persistConfig, AppReducer);

export const store = createStore(persistedReducer, enhancer);

export const persistor = persistStore(store);


