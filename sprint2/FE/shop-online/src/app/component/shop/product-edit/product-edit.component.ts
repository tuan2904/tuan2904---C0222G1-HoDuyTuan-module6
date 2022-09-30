import {Component, OnInit} from '@angular/core';
import {Product} from "../../../model/product";
import {Category} from "../../../model/category";
import {Customer} from "../../../model/customer";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/storage";
import {ProductService} from "../../../service/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {CategoryService} from "../../../service/category.service";
import {AuthService} from "../../../service/user/auth.service";
import {CustomerService} from "../../../service/customer.service";
import {formatDate} from "@angular/common";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  url: any;
  checkImg: boolean;
  product: Product
  checkImgSize = false;
  msg = '';
  regexImg = false;
  category: Category[];
  role = '';
  idProduct = 0;
  loginStatus: any;
  infoStatus = true;
  username = '';
  customer: Customer;
  page = 0;
  id: number;


  formCreate = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', [Validators.required]),
    releaseTime: new FormControl('', [Validators.required]),
    manufactureTime: new FormControl('', [Validators.required]),
    manufacturer: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    warranty: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{1,3}')]),
    image: new FormControl('', [Validators.required]),
    category: new FormGroup({
      id: new FormControl('', [Validators.required])
    }),
  })

  title = "cloudsSorage";
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;

  constructor(private storage: AngularFireStorage,
              private productService: ProductService,
              private router: Router,
              private toastr: ToastrService,
              private categoryService: CategoryService,
              private route: ActivatedRoute,
              private auth: AuthService,
              private customerService: CustomerService,
  ) {
  }

  ngOnInit() {

    this.route.paramMap.subscribe(value => {
      if (value != null) {
        this.getProductById(value.get('id'));
      } else {
        this.getProductById(this.idProduct);
      }
    });
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
    this.id = Number(this.route.snapshot.params.id);
    this.getAllCategory();
    this.getAllProduct();
    this.getProductById(this.idProduct)
    console.log(" a" + this.getProductById(this.id))
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
      this.product = value.content;
    }, error => {
      console.log(error);
      this.router.navigateByUrl('/404');
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

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US');
  }

  getAllCategory() {
    this.categoryService.getAllCategories().subscribe(value => {
      this.category = value;
      console.log(value)
    })
  }

  getProductById(id) {
    this.productService.findProductById(id).subscribe(value => {
      this.formCreate.patchValue(value);
      console.log(value.releaseTime);
      console.log(value.manufactureTime);
    });
  }


  submit() {
    this.productService.editProducts(this.id, this.formCreate.value).subscribe(value => {
        console.log("aaaaaaaaaaaaaaaaa" + this.formCreate.value)
        this.toastr.success('Sửa thành công');
        this.router.navigateByUrl('/shop');
      },
      error => {
        this.toastr.error('Sửa thất bại');
      });
  }

  checkImage() {
    if (!this.selectedFile || this.selectedFile.name === '') {
      this.checkImg = true;
      return;
    }
  }

  selectFile(event: any) {
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      return;
    }
    if (event.target.files[0].size > 9000000) {
      this.checkImgSize = true;
      return;
    }
    if (!event.target.files[0].name.match('^.*\\.(jpg|JPG)$')) {
      return;
    }
    this.checkImgSize = false;
    this.checkImg = false;

    const mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Only images are supported';
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    // tslint:disable-next-line:variable-name
    reader.onload = (_event) => {
      this.msg = '';
      this.url = reader.result;
      console.log(this.url);
    };
  }

  onFileSelected(event) {
    this.regexImg = false;
    if (event.target.files[0].size > 9000000) {
      return;
    }
    this.selectedFile = event.target.files[0];
    if (!event.target.files[0].name.match('^.*\\.(jpg|JPG)$')) {
      this.regexImg = true;
      return;
    }
    this.formCreate.patchValue({imageUrl: this.selectedFile.name});
  }

}
