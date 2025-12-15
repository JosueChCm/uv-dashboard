import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBGE0jQ2XTxm-ZEQKPQ0NPPwiUJP7CDnrs",
  authDomain: "uv-monitor-web.firebaseapp.com",
  databaseURL: "https://uv-monitor-web-default-rtdb.firebaseio.com",
  projectId: "uv-monitor-web",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
