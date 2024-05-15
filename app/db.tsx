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
import { Dispatch, SetStateAction } from "react";
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

export const listenToNewList = (
  setNewsList: Dispatch<SetStateAction<News[] | undefined>>,
  globalHolder: { firstRequest: boolean }
) => {
  const newsQuery = query(
    collection(db, "firebase-demo"),
    orderBy("timestamp", "desc"),
    limit(3)
  );
  onSnapshot(
    newsQuery,
    (querySnapshot) => {
      if (
        !globalHolder.firstRequest &&
        !querySnapshot.metadata.hasPendingWrites
      ) {
        return;
      }
      const newsData: News[] = [];
      querySnapshot.forEach((doc) => {
        const { author, title, body, timestamp } = doc.data();
        newsData.push(new News(author, title, body, timestamp));
      });
      setNewsList(newsData);
      globalHolder.firstRequest = false;
    },
    (error) => {
      console.log(error);
    }
  );
};
