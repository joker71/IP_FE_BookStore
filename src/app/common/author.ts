export class Author {
  author_id: number
  author_name: string

  constructor(author_id: number,
              author_name: string,) {
    this.author_name =author_name;
    this.author_id = author_id
  }
}
