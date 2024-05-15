"use client";

import { useEffect, useState } from "react";
import { NewsComponent, NewsForm } from "./components";
import "./globals.css";
import { listenToNewsList } from "./db";
import { News } from "./models";

export default function Home() {
  const [newsList, setNewsList] = useState<News[]>();

  const handleNewsData = (querySnapshot: { docs: any[] }) => {
    const newsData: News[] = querySnapshot.docs.map((doc) => {
      const { author, title, body, timestamp } = doc.data();
      return new News(author, title, body, timestamp.toDate());
    });
    setNewsList(newsData);
  };

  useEffect(() => {
    const unsubscribe = listenToNewsList(handleNewsData);
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <div>
        {newsList && (
          <>
            {newsList.length > 0 && <h1>News</h1>}

            {newsList.map((news: News, i) => (
              <NewsComponent key={i} news={news} />
            ))}
          </>
        )}
      </div>
      <div className="news-form">
        <NewsForm />
      </div>
    </div>
  );
}
