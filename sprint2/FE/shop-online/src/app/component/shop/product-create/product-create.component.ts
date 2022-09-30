import {Component, OnInit} from '@angular/core';
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/storage";
import {Observable} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../../model/product";
import {formatDate} from "@angular/common";
import {snapshotChanges} from "@angular/fire/database";
import {ProductService} from "../../../service/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {CategoryService} from "../../../service/category.service";
import {Category} from "../../../model/category";
import {environment} from "../../../../environments/environment";
import {AuthService} from "../../../service/user/auth.service";
import {Customer} from "../../../model/customer";
import {CustomerService} from "../../../service/customer.service";

const API_URL = `${environment.apiUrl}`;

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
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

  formCreate = new FormGroup({
    id: new FormControl(),
    name: new FormControl('',[Validators.required]),
    releaseTime: new FormControl('',[Validators.required]),
    manufactureTime: new FormControl('',[Validators.required]),
    manufacturer: new FormControl('',[Validators.required]),
    price: new FormControl('',[Validators.required,Validators.pattern('^[0-9]+$')]),
    warranty: new FormControl('',[Validators.required]),
    quantity: new FormControl('',[Validators.required,Validators.pattern('^[0-9]{1,3}')]),
    image: new FormControl('',[Validators.required]),
    category: new FormGroup({
      id: new FormControl('',[Validators.required])
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
              private customerService: CustomerService) {
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
      if (value != null) {
        console.log(value);
        this.product = value;
      }
    });
  }

  create() {
    const imageUrl = this.getCurrentDateTime() + this.selectedFile.name;
    const filePath = `product/${imageUrl}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(`product/${imageUrl}`, this.selectedFile).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.formCreate.patchValue({imageUrl: url});
          this.productService.createNewProduct(this.formCreate.value).subscribe(
            product => {
              this.product = this.formCreate.value;
              this.router.navigateByUrl('');
              this.toastr.success('Tạo mới thàng công.');
            },
            error => {
                this.toastr.error('Tạo mới thất bại');
            }
          );
        });
      })
    ).subscribe();
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
