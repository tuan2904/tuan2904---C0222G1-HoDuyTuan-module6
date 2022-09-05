import {Component, OnInit} from '@angular/core';
import {DrinkService} from '../../service/drink.service';
import {Drink} from '../../model/drink';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-list-drink',
  templateUrl: './list-drink.component.html',
  styleUrls: ['./list-drink.component.css']
})
export class ListDrinkComponent implements OnInit {
  drink: Drink[];
  maSanPham = '';
  drinks: Drink;

  constructor(private drinkService: DrinkService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getDrink();
  }

  getDrink() {
    this.drinkService.getAllDrink().subscribe(value => {
      this.drink = value;
    });
  }

  getInfoDrink(drinks: Drink) {
    this.drinks = drinks;
    this.maSanPham = drinks.maSanPham;
  }

  delete() {
    this.drinkService.delete(this.drinks.id).subscribe(res => {
      console.log(this.drinks.id);
      this.getDrink();
      this.toastr.success('Xóa thành công', 'Sách');
    });
  }
}
