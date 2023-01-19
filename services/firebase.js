import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { store } from "../redux/store";
import { setChats, setMessages } from "../redux/slices/chat";
import { toast } from "react-toastify";
import { parseCookies } from "nookies";

const cookie = parseCookies();
let config = null;

if (cookie?.settings) {
  config = JSON.parse(cookie?.settings);
}

const firebaseConfig = {
  apiKey: config?.api_key ? config?.api_key : process.env.MAP_KEY,
  authDomain: config?.auth_domain
    ? config?.auth_domain
    : "goshops-7c405.firebaseapp.com",
  projectId: "goshops-7c405",
  storageBucket: config?.project_id
    ? config?.project_id
    : "goshops-7c405.appspot.com",
  messagingSenderId: config?.messaging_sender_id
    ? config?.messaging_sender_id
    : "732738074097",
  appId: config?.app_id
    ? config?.app_id
    : "1:732738074097:web:de58947609d53efc6fc050",
  measurementId: config?.measurement_id
    ? config?.measurement_id
    : "G-SK0FJ6BCPH",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export { app as default };
export const db = getFirestore(app);

onSnapshot(
  query(collection(db, "messages"), orderBy("created_at", "asc")),
  (querySnapshot) => {
    const messages = querySnapshot.docs.map((x) => ({
      id: x.id,
      ...x.data(),
      created_at: String(new Date(x.data().created_at?.seconds * 1000)),
    }));
    store.dispatch(setMessages(messages));
  }
);
onSnapshot(
  query(collection(db, "chats"), orderBy("created_at", "asc")),
  (querySnapshot) => {
    const chats = querySnapshot.docs.map((x) => ({
      id: x.id,
      ...x.data(),
      created_at: String(new Date(x.data().created_at?.seconds * 1000)),
    }));
    store.dispatch(setChats(chats));
  }
);

export async function sendMessage(payload) {
  try {
    await addDoc(collection(db, "messages"), {
      ...payload,
      created_at: serverTimestamp(),
    });
  } catch (error) {
    toast.error(error);
  }
}

export async function createChat(payload) {
  try {
    await addDoc(collection(db, "chats"), {
      ...payload,
      created_at: serverTimestamp(),
    });
  } catch (error) {
    toast.error(error);
  }
}
