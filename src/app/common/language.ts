export class Language {
  language_id: number
  language_code: string
  language_name: string
  constructor(
    language_id: number,
    language_code: string,
    language_name: string,
  ) {
    this.language_id= language_id;
    this.language_name= language_name;
    this.language_code= language_code;
  }
}
