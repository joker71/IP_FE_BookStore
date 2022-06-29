import { Component, OnInit } from '@angular/core';
import { Book } from '../../common/book';
import { BookService } from '../../services/book.service';
import { ActivatedRoute } from '@angular/router';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css'],
  providers: [NgbPaginationConfig]
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  //properties for client side paging

  //pageOfItems: Array<Book>;
  //pageSize: number = 5;

  //new properties for server-side paging
  currentPage: number = 1;
  pageSize: number = 5;
  totalRecords: number = 0;

  constructor(private _bookService: BookService,
    private _activatedRoute: ActivatedRoute,
    private _cartService: CartService,
    config: NgbPaginationConfig) {
    config.boundaryLinks = true;
    config.maxSize = 3;
  }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(() => {
      this.listBooks();
    })
  }

  /*client side paging
  pageClick(pageOfItems: Array<Book>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  } */

  listBooks() {
    this.searchMode = this._activatedRoute.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      //do search work
      this.handleSearchBooks();
    } else {
      //display books based on category
      this.handleListBooks();
    }
  }

  handleListBooks() {
    const hasCategoryId: boolean = this._activatedRoute.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this._activatedRoute.snapshot.paramMap.get('id');
      this._bookService.queryByCatalogue(this.currentCategoryId, { page: this.currentPage - 1, size: this.pageSize })
      .subscribe(this.processResult());
    } else {
      this._bookService.query({ page: this.currentPage - 1, size: this.pageSize })
      .subscribe(this.processResult());
    }

    //setting up the page number to 1
    //if user navigates to other category
    if (this.previousCategoryId != this.currentCategoryId) {
      this.currentPage = 1;
    }

    this.previousCategoryId = this.currentCategoryId;


    // this._bookService.queryByCatalogue(this.currentCategoryId, { page: this.currentPage - 1, size: this.pageSize })
    //   .subscribe(this.processResult());
  }

  handleSearchBooks() {
    const keyword: string = this._activatedRoute.snapshot.paramMap.get('keyword');

    this._bookService.searchBooks(keyword,
      { page: this.currentPage - 1, size: this.pageSize })
      .subscribe(this.processResult());
  }

  //client side paging and server side paging
  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.listBooks();
  }

  processResult() {
    return data => {
      let res= data.body;
      this.books = res.content;
      console.log(res)
      this.currentPage = res.pageable.pageNumber + 1;
      this.totalRecords = res.pageable.pageNumber;
      this.pageSize = res.totalElements;
    }
  }

  addToCart(book: Book) {
    console.log(`book name: ${book.title}, and price: ${book.price}`);
    const cartItem = new CartItem(book);
    this._cartService.addToCart(cartItem);
  }

}
