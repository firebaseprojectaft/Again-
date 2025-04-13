// firebaseConfig.js
import { initializeApp } from 'firebase/app';
// TODO: Replace with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoRjw2YOVHIq1uUYJuc-fhEbiP9ykfweI",
  authDomain: "table-23514.firebaseapp.com",
  projectId: "table-23514",
  storageBucket: "table-23514.appspot.com",
  messagingSenderId: "111280711097",
  appId: "1:111280711097:web:7a802ed2d3b4a0ce5b4268",
  // ... other config values
};

const app = initializeApp(firebaseConfig);

// Export the app instance
export { app };
