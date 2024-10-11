import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducer';
import { composeWithDevTools } from '@redux-devtools/extension';


const store = configureStore({
  reducer: counterReducer,  // Menggunakan rootReducer
  devtools: composeWithDevTools(),  // Mengaktifkan Redux DevTools
});

export default store;
