import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { News } from "./models";

const firebaseConfig = {
  projectId: "onlylive-99f42",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const saveNews = async (news: News) => {
  addDoc(
    collection(db, "firebase-demo"),
    Object.assign({}, news)
  ).then((docRef) => console.log("Document written with ID: ", docRef.id));
};

export const listenToNewsList = (handleNewsData: any) => {
  const newsQuery = query(
    collection(db, "firebase-demo"),
    orderBy("timestamp", "desc"),
    limit(3)
  );
  const unsubscribe = onSnapshot(newsQuery, handleNewsData, (error: any) => {
    console.log(error);
  });
  return unsubscribe;
};
