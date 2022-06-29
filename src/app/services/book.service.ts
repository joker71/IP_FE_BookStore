import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../common/book';
import { BookCategory } from '../common/book-category';
import { createRequestOption } from './reques-utils';
type EntityResponseType = HttpResponse<Book>;
type EntityArrayResponseType = HttpResponse<Book[]>;
@Injectable({
  providedIn: 'root'
})
export class BookService {

  private rousourceUrl = "http://localhost:5000/book/";

  constructor(protected http: HttpClient) {
  }

  create(book: Book): Observable<EntityResponseType> {
    return this.http.post<Book>(this.rousourceUrl + 'post', book, {observe: 'response'});
  }

  searchBooks(key:string, req: any){
    const opition = createRequestOption(req);
    return this.http.get<Book[]>(this.rousourceUrl + 'search', {params: opition, headers: {key: key},observe: 'response'})
  }
  query(req: any): Observable<EntityArrayResponseType>
  {
    const opition = createRequestOption(req);
    return this.http.get<Book[]>(this.rousourceUrl + 'get', {params: opition, observe: 'response'})
  }
  queryByCatalogue(id: number,req: any): Observable<EntityArrayResponseType>
  {
    const opition = createRequestOption(req);
    return this.http.get<Book[]>(this.rousourceUrl + `catalogue/${id}`, {params: opition, observe: 'response'})
  }

  update(group: Book): Observable<EntityResponseType> {
    return this.http.put<Book>(this.rousourceUrl + 'put', group, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<Book>(`${this.rousourceUrl}/get/${id}`, {observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.put(`${this.rousourceUrl}delete/${id}`, null,{observe: 'response'});
  }
  getBookCategories(): Observable<any>{
    return this.http.get('http://localhost:5000/catalogue/get', {observe: 'response'})
  }

}

interface GetResponseBooks{
  _embedded: {
    books: Book[];
  },
  page: {
    //cureent page
    size: number,
    //total number of records in database
    totalElements: number,
    //total number of pages, starts from 0 index
    totalPages: number,
    //current page
    number: number
  }
}

interface GetResponseBookCategory{
  _embedded: {
    bookCateogry: BookCategory[];
  }
}
