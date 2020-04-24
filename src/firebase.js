import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'



var firebaseConfig = {
    apiKey: "AIzaSyCU3u9kF2f76nBybQx5Vv8YpnC5rA2J2BQ",
    authDomain: "react-slack-chat-app-f6915.firebaseapp.com",
    databaseURL: "https://react-slack-chat-app-f6915.firebaseio.com",
    projectId: "react-slack-chat-app-f6915",
    storageBucket: "react-slack-chat-app-f6915.appspot.com",
    messagingSenderId: "534901209532",
    appId: "1:534901209532:web:22bbb04039a6fb31f893b9",
    measurementId: "G-3HRMQEPD2R"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  export default firebase;