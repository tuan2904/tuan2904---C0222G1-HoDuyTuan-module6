import {Component, OnInit} from '@angular/core';
import {Drink} from '../../model/drink';
import {FoodCreateComponent} from '../food-create/food-create.component';
import {FoodService} from '../../service/food.service';
import {Food} from '../../model/food';
import {ToastrService} from 'ngx-toastr';
import {error} from '@angular/compiler/src/util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit {
  foods: Food[];
  food: Food;
  maSanPham = '';

  constructor(private foodService: FoodService,
              private toastr: ToastrService,
              private route: Router) {
  }

  ngOnInit(): void {
    this.getDrink();
  }

  getDrink() {
    this.foodService.getAllFood().subscribe(value => {
      this.foods = value;
    });
  }

  getInfoDrink(food: Food) {
    this.food = food;
    this.maSanPham = food.maSanPham;
  }

  delete() {
    this.foodService.delete(this.food.id).subscribe(res => {
      console.log(this.food.id);
      this.getDrink();
      this.toastr.success('Xóa thành công', 'Bánh');
    });
  }
}
