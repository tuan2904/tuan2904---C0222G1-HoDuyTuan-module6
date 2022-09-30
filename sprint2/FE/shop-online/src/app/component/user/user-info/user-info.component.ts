import {Component, OnInit} from '@angular/core';
import {Customer} from "../../../model/customer";
import {ProductOrder} from "../../../model/product-order";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../service/product.service";
import {AuthService} from "../../../service/user/auth.service";
import {CustomerService} from "../../../service/customer.service";
import {ToastrService} from "ngx-toastr";
import {CategoryService} from "../../../service/category.service";
import {ReloadService} from "../../../service/user/reload.service";
import {CartService} from "../../../service/cart.service";
import {FormControl, FormGroup} from "@angular/forms";
import {AppUser} from "../../../model/app-user";

declare var $: any;

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  public role: string;
  public username: string = '';
  public loginStatus: any;
  customer: Customer;
  productOrders: ProductOrder[] = [];
  currentPage: number = 0;
  totalPages: number = 0;

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private authService: AuthService,
              private customerService: CustomerService,
              private router: Router,
              private toastrService: ToastrService) {
    this.authService.checkLogin().subscribe(value => {
      this.loginStatus = value;
      if (value) {
        this.authService.getRoles().subscribe(resp => {
          this.getCustomerByUsername(resp.username);
          this.getRole(resp);
        }, error => {
        });
      }
    }, error => {
    });
  }

  getRole(value: any) {
    if (this.isAdmin(value.grantList)) {
      this.role = 'ROLE_ADMIN';
    } else if (this.isUser(value.grantList)) {
      this.role = 'ROLE_USER';
    }
    this.username = value.username;
  }

  isAdmin(grantList: string[]): boolean {
    return grantList.some(value => {
      return value === 'ROLE_ADMIN';
    });
  }

  isUser(grantList: string[]): boolean {
    return grantList.some(value => {
      return value === 'ROLE_USER';
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  getCustomerByUsername(username: string) {
    this.customerService.getCustomerByUsername(username).subscribe(value => {
      this.getOrdersByCustomer(this.currentPage, value);
      this.customer = value;
      if (value == null) {
        this.router.navigateByUrl('/checkout').then(() => {
          this.toastrService.warning('Có vẻ như bạn chưa cập nhật thông tin. Vui lòng cập nhật thông tin!');
        });
      }
    });
  }

  getOrdersByCustomer(page: number, customer: Customer) {
    this.productService.getOrdersByCustomer( customer).subscribe(value => {
      if (value != null) {
        this.productOrders = value.content;
        this.totalPages = value.totalPages;
      }
    });
  }

  closeModal(id: number) {
    $('#exampleModalCenter' + id).modal('hide');
  }

  goPrevious() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
    this.getOrdersByCustomer(this.currentPage, this.customer);
  }

  goNext() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
    }
    this.getOrdersByCustomer(this.currentPage, this.customer);
  }
}
