"use client";

import { useState } from "react";
import { NewsComponent, NewsForm } from "./components";
import "./globals.css";
import { listenToNewList } from "./db";
import { News } from "./models";

export default function Home() {
  const [newsList, setNewsList] = useState<News[]>();
  const [globalHolder, _] = useState({ firstRequest: true });

  listenToNewList(setNewsList, globalHolder);

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
