import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../service/product.service';
import {CategoryService} from '../../../service/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../service/user/auth.service';
import {ToastrService} from 'ngx-toastr';
import {ReloadService} from '../../../service/user/reload.service';
import {Product} from '../../../model/product';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {
  products: Product[] = [];
  page = 0;
  nameSearch = '';
  private subscription: Subscription;
  private messageReceived: any;

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private router: Router,
              private route: ActivatedRoute,
              private auth: AuthService,
              private toastr: ToastrService,
              private activatedRoute: ActivatedRoute,
              private reload: ReloadService) {
    this.subscription = this.reload.getUpdate().subscribe(message => {
      this.messageReceived = message;
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(value => {
      if (value.get('name') != null) {
        this.searchByName(value.get('name'));
      } else {
        this.searchByName(this.nameSearch);
      }
    });
  }

  searchByName(name: string) {
    this.productService.findAllByName(this.page, name).subscribe((value: any) => {
      if (value != null) {
        this.products = value.content;
      } else {
        this.products = [];
        this.toastr.error('Không có sản phẩm nào được tìm thấy');
      }
      this.sendMessage();
    }, error => {
      this.router.navigateByUrl('/404');
    }, () => {
      console.log(this.products);
    });
  }

  sendMessage(): void {
    this.reload.sendUpdate('Tải lại danh sách');
  }
}
