import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {FoodService} from '../../service/food.service';

@Component({
  selector: 'app-food-create',
  templateUrl: './food-create.component.html',
  styleUrls: ['./food-create.component.css']
})
export class FoodCreateComponent implements OnInit {
  formDrink = new FormGroup({
    id: new FormControl(),
    maSanPham: new FormControl('', [Validators.required]),
    tenSanPham: new FormControl('', [Validators.required]),
    donGia: new FormControl('', [Validators.required]),
    tinhTrang: new FormControl('', [Validators.required]),
    ngayNhap: new FormControl('', [Validators.required]),
    xuatXu: new FormControl(),
    loaiBanh: new FormControl('')
  });
  constructor(private toastr: ToastrService,
              private route: Router,
              private foodService: FoodService) { }

  ngOnInit(): void {
  }
  submit() {
    this.foodService.save(this.formDrink.value).subscribe(value => {
      this.toastr.success('Thêm mới thành công');
      this.route.navigateByUrl('/drink-list');
    });
  }

}
