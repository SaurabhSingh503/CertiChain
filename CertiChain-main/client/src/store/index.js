import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import offerLetterReducer from './offerLetterSlice';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducerCombined = combineReducers({
  root: rootReducer,
  offerLetter: offerLetterReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducerCombined);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;