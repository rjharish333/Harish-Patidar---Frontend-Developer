import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSilce from './slices/authSlice'
import rocketSlice from './slices/rocketSlice';

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
  }

  const rootReducer = combineReducers({
    userAuth: authSilce,
    spacex: rocketSlice
})

  const persistedReducer = persistReducer(persistConfig, rootReducer)

// store for application
export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
})

export const persistor = persistStore(store)