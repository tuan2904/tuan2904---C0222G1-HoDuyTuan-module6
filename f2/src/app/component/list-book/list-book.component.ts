import {Component, OnInit} from '@angular/core';
import {BookService} from '../../service/book.service';
import {Book} from '../../model/book';
import {Booktype} from '../../model/booktype';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {
  page = 1;
  totalItems: any;
  itemsPerPage = 8;
  book: Book[];
  bookType: Booktype[];
  books: Book;
  maSanPham = '';

  constructor(private bookService: BookService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getBook();
    this.getAllBookType();
  }

  getInfoBook(book: Book) {
    this.books = book;
    this.maSanPham = book.maSanPham;
  }

  getBook() {
    this.bookService.getAllBook().subscribe(value => {
      this.book = value;
    });
  }

  getAllBookType() {
    this.bookService.getAllBookType().subscribe(value => {
      this.bookType = value;
      console.log(value);
    });
  }

  delete() {
    this.bookService.delete(this.books.id).subscribe(res => {
      console.log(this.books.id);
      this.getBook();
      this.toastr.success('Xóa thành công', 'Sách');
    });
  }
}
