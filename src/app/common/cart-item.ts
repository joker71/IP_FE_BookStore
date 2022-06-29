import { Book } from './book';

export class CartItem {
    id: number;
    name: string;
    imageUrl: string;
    unitPrice: number;
    quantity: number;

    constructor(book: Book){
        this.id = book.book_id;
        this.name = book.title;
        this.imageUrl = book.img;
        this.unitPrice = book.price;
        this.quantity = 1
    }
}
