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
//config?.api_key ? config?.api_key : process.env.MAP_KEY
const firebaseConfig = {
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
