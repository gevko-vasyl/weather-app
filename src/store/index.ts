import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { Action } from 'redux';
import thunk from 'redux-thunk';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { appReducer } from './slice/appSlice';

const persistConfig = {
  key: 'cities',
  storage,
  blacklist: ['cityDetails', 'error', 'loading'],
};

const persistAppReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
  reducer: persistAppReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;

export type AppDispatch = typeof store.dispatch;
