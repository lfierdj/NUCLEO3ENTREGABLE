import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import {getDatabase} from 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyC5iYKeG52JfNzHoZgFaWf2u1J8uu65gKk",
    authDomain: "entregablenucleo3.firebaseapp.com",
    databaseURL: "https://entregablenucleo3-default-rtdb.firebaseio.com",
    projectId: "entregablenucleo3",
    storageBucket: "entregablenucleo3.appspot.com",
    messagingSenderId: "154822710646",
    appId: "1:154822710646:web:b0e48d91df0c9a402a9657",
    measurementId: "G-VNYBN0Y152"
  };
  

const firebase = initializeApp(firebaseConfig);
export const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const database= getDatabase(firebase);