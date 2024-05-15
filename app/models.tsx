export class News {
  author: string;
  title: string;
  body: string;
  timestamp: Date;

  constructor(author: string, title: string, body: string, timestamp: Date) {
    this.author = author;
    this.title = title;
    this.body = body;
    this.timestamp = timestamp;
  }
}
