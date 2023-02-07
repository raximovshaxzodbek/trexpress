import { parseCookies } from "nookies";

importScripts("https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js");

const cookie = parseCookies();
let config = null;

if (cookie?.settings) {
  config = JSON.parse(cookie?.settings);
}

firebase.initializeApp({
  apiKey: config?.api_key ? config?.api_key : process.env.MAP_KEY,
  authDomain: config?.auth_domain
    ? config?.auth_domain
    : "seven-24e24.firebaseapp.com",
  projectId: "seven-24e24",
  storageBucket: config?.project_id
    ? config?.project_id
    : "seven-24e24.appspot.com",
  messagingSenderId: config?.messaging_sender_id
    ? config?.messaging_sender_id
    : "441406141376",
  appId: config?.app_id
    ? config?.app_id
    : "1:441406141376:web:bd1ed882452464f2040e25",
  measurementId: config?.measurement_id
    ? config?.measurement_id
    : "G-B784929WE4",
});
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
