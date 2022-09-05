import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BookService} from '../../service/book.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {
  isExitsCode = false;

  formBook = new FormGroup({
    id: new FormControl(),
    maSanPham: new FormControl('', [Validators.required]),
    tenSanPham: new FormControl('', [Validators.required]),
    donGia: new FormControl('', [Validators.required]),
    tinhTrang: new FormControl('', [Validators.required]),
    ngayNhap: new FormControl('', [Validators.required]),
    ngayXuatBan: new FormControl(),
    tacGia: new FormControl(),
    loai: new FormControl('')
  });

  constructor(private bookService: BookService,
              private toastr: ToastrService,
              private route: Router) {
  }

  ngOnInit(): void {
  }

  submit() {
    this.bookService.save(this.formBook.value).subscribe(value => {
      this.toastr.success('Thêm mới thành công');
      this.route.navigateByUrl('/list-book');
    });
  }
  checkCode($event: Event) {
    this.bookService.checkCode(String($event)).subscribe(
      value => {
        if (value) {
          this.isExitsCode = true;
        } else {
          this.isExitsCode = false;
        }
      }
    );
  }
}
