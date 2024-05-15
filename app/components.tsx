"use client";

import { useState } from "react";
import "./globals.css";
import { saveNews } from "./db";
import { News } from "./models";

export function NewsComponent(props: any) {
  const news = props.news;
  return (
    <div className="news-item">
      <div className="news-author">{news.author}</div>
      <div className="news-timestamp">
        {news.timestamp.toLocaleDateString("en-US")}
      </div>
      <div className="news-title">{news.title}</div>
      <div className="news-body">{news.body}</div>
    </div>
  );
}

export function NewsForm(props: any) {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const resetForm = () => {
    setAuthor("");
    setTitle("");
    setBody("");
  };

  const onSubmit = () => {
    if (!author || !title || !body) {
      return;
    }
    const timestamp = new Date();
    const news = new News(author, title, body, timestamp);
    saveNews(news).then(resetForm);
  };

  return (
    <form
      onSubmit={() => {
        return false;
      }}
    >
      <h1>Post a News</h1>
      <span>Author</span>
      <input
        value={author}
        autoComplete="on"
        placeholder="Author"
        name="author"
        required
        onChange={(event) => {
          setAuthor(event.currentTarget.value);
        }}
      />
      <br />
      <span>Title</span>
      <input
        value={title}
        autoComplete="on"
        placeholder="Write your new title here"
        name="title"
        required
        onChange={(event) => {
          setTitle(event.currentTarget.value);
        }}
      />
      <br />
      <span>Body</span>
      <textarea
        value={body}
        autoComplete="on"
        placeholder="Write your new body here"
        name="body"
        required
        onChange={(event) => {
          setBody(event.currentTarget.value);
        }}
      />
      <br />
      <button onClick={onSubmit}>Submit</button>
    </form>
  );
}
