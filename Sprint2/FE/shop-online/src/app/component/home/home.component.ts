import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../service/product.service';
import {CategoryService} from '../../service/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../service/user/auth.service';
import {ToastrService} from 'ngx-toastr';
import {ReloadService} from '../../service/user/reload.service';
import {Product} from '../../model/product';
import {Category} from '../../model/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  role: string;
  username: string;
  page = 0;

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private router: Router,
              private auth: AuthService,
              private toastr: ToastrService,
              private activatedRoute: ActivatedRoute,
              private reload: ReloadService) {
  }

  ngOnInit(): void {
    this.getAllProduct();
    this.getAllCategory()
  }

  getRole(value: any) {
    if (this.isAdmin(value.grantList)) {
      this.role = 'ADMIN';
    } else if (this.isUser(value.grantList)) {
      this.role = 'USER';
    }
    this.username = value.username;
  }

  isAdmin(grantList: string[]): boolean {
    return grantList.some(value => {
      return value === 'ADMIN';
    });
  }

  isUser(grantList: string[]): boolean {
    return grantList.some(value => {
      return value === 'USER';
    });
  }

  getAllProduct() {
    this.productService.getAllPageProducts(this.page).subscribe((value: any) => {
      this.products = value.content;
    }, error => {
      console.log('error');
      console.log(error);
      this.router.navigateByUrl('/404');
    });
  }
  getAllCategory() {
    this.categoryService.getAllCategories().subscribe((value: any) => {
      this.categories = value;
    }, error => {
      console.log('error');
      console.log(error);
      this.router.navigateByUrl('/404');
    });
  }
}
