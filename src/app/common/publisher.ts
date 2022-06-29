export class Publisher {
  publisher_id: number;
  publisher_name: string;
  constructor(id: number, name: string) {
    this.publisher_name = name;
    this.publisher_id= id;
  }
}
