import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DrinkService} from '../../service/drink.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-drink',
  templateUrl: './create-drink.component.html',
  styleUrls: ['./create-drink.component.css']
})
export class CreateDrinkComponent implements OnInit {

  formDrink = new FormGroup({
    id: new FormControl(),
    maSanPham: new FormControl('', [Validators.required]),
    tenSanPham: new FormControl('', [Validators.required]),
    donGia: new FormControl('', [Validators.required]),
    tinhTrang: new FormControl('', [Validators.required]),
    ngayNhap: new FormControl('', [Validators.required]),
    xuatXu: new FormControl(),
    loaiNuoc: new FormControl('')
  });

  constructor(private drinkService: DrinkService,
              private toastr: ToastrService,
              private route: Router) {
  }

  ngOnInit(): void {
  }

  submit() {
    this.drinkService.save(this.formDrink.value).subscribe(value => {
      this.toastr.success('Thêm mới thành công');
      this.route.navigateByUrl('/drink-list');
    });
  }
}
