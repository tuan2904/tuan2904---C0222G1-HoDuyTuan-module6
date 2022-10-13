import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../../model/product';
import {Category} from '../../../model/category';
import {AngularFireStorage} from '@angular/fire/storage';
import {ProductService} from '../../../service/product.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {CategoryService} from '../../../service/category.service';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-shop-create',
  templateUrl: './shop-create.component.html',
  styleUrls: ['./shop-create.component.css']
})
export class ShopCreateComponent implements OnInit {
  nameProduct = '';
  size: number;
  totalElements: number;
  totalItems: any;
  totalPages: any;
  products: Product[] = [];
  formCreate: FormGroup;
  product: Product;
  categories: Category[] = [];
  selectedImage: any;
  imgSrc = '../assets/img/no-image.jpg';
  page = 0;

  constructor(@Inject(AngularFireStorage) private storage: AngularFireStorage,
              private productService: ProductService,
              private toastr: ToastrService,
              private router: Router,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.formCreate = new FormGroup({
      name: new FormControl(''),
      releaseTime: new FormControl(''),
      manufactureTime: new FormControl(''),
      manufacturer: new FormControl(''),
      price: new FormControl(''),
      warranty: new FormControl(''),
      quantity: new FormControl(''),
      image: new FormControl(''),
      category: new FormControl(''),
    });
    this.getAllCategory();
    this.getAllProduct();
  }

  getAllProduct() {
    this.productService.getAllPageProducts(this.page).subscribe((value: any) => {
      this.size = value.size * this.page;
      this.products = value.content;
      if (this.products != null) {
        if (this.products.length !== null) {
          this.products = value.content;
          this.totalItems = value.totalElements;
          this.totalPages = value.totalPages;
        }
      }
    }, error => {
      console.log(error);
      this.router.navigateByUrl('/404');
    });
  }

  createProduct() {
    if (this.formCreate.valid) {
      this.product = this.formCreate.value;
      const nameImg = ShopCreateComponent.getCurrentDateTime() + this.selectedImage.name;
      const fileRef = this.storage.ref(nameImg);
      this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.product.image = url;
            this.productService.createNewProduct(this.product).subscribe(value => {
              this.getAllProduct();
              this.router.navigateByUrl('/shop').then(() => {
                this.toastr.success('Thêm mới thành công!');
              });
            });
          });
        })
      ).subscribe();
    } else {
      this.toastr.error('Tạo mới không thành công');
    }
  }

  getAllCategory() {
    this.categoryService.getAllCategories().subscribe(value => {
      this.categories = value;
    });
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (o: any) => this.imgSrc = o.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = '';
      this.selectedImage = null;
    }
  }

  private static getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

}
