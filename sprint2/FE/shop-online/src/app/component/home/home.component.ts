import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../service/product.service';
import {CategoryService} from '../../service/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../service/user/auth.service';
import {ToastrService} from 'ngx-toastr';
import {ReloadService} from '../../service/user/reload.service';
import {Product} from '../../model/product';
import {Category} from '../../model/category';
import {Subscription} from 'rxjs';
import {ProductOrder} from '../../model/product-order';
import {Customer} from '../../model/customer';
import {CartService} from '../../service/cart.service';
import {CustomerService} from '../../service/customer.service';
declare var $: any;

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
  loginStatus: any;
  page = 0;
  customer: Customer;
  private subscription: Subscription;
  private messageReceive: any;
  infoStatus = true;

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private router: Router,
              private route: ActivatedRoute,
              private auth: AuthService,
              private toastr: ToastrService,
              private activatedRoute: ActivatedRoute,
              private reload: ReloadService,
              private cartService: CartService,
              private customerService: CustomerService) {
    this.subscription = this.reload.getUpdate().subscribe(message => {
      this.messageReceive = message;
    });
  }

  ngOnInit(): void {
    this.auth.checkLogin().subscribe(value => {
      this.loginStatus = value;
      if (value) {
        this.auth.getRoles().subscribe(resp => {
          this.getRole(resp);
          this.getCustomerByUsername(resp.username);
        }, () => {
        });
      }
    }, () => {
    });
    this.getAllProduct();
    this.getAllCategory();
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
    this.productService.getProducts().subscribe((value: any) => {
      this.products = value;
    }, error => {
      console.log(error);
      this.router.navigateByUrl('/404');
    });
  }

  getAllCategory() {
    this.categoryService.getAllCategories().subscribe((value: any) => {
      this.categories = value;
    }, () => {
    });
  }

  findAllByCategory(id: number) {
    this.productService.findAllByCategory(id).subscribe((value: any) => {
      this.products = value.content;
    }, error => {
      this.router.navigateByUrl('/404');
    });
  }

  addToCart(product: Product) {
    const productOrder: ProductOrder = {
      customer: this.customer,
      product,
      quantity: 1
    };
    this.cartService.addOrder(productOrder).subscribe((po: ProductOrder) => {
      this.toastr.success('Th??m th??nh c??ng s???n ph???m ' + po.product.name);
      this.sendMessage();
    }, error => {
      if (error.error.message == 'quantity') {
        this.toastr.warning('B???n ???? th??m v?????t qu?? s??? l?????ng s???n ph???m!');
      }
    });
  }

  getCustomerByUsername(username: string) {
    this.customerService.getCustomerByUsername(username).subscribe((value: Customer) => {
      this.customer = value;
      if (value == null) {
        this.infoStatus = false;
      } else {
        this.infoStatus = true;
      }
    });
  }

  addToCartMessage() {
    this.toastr.warning('Vui l??ng ????ng nh???p ????? th???c hi???n ch???c n??ng n??y!');
  }

  sendMessage(): void {
    this.reload.sendUpdate('Reload list');
  }
}
