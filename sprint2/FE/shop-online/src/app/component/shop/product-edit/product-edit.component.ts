import {Component, Inject, OnInit} from '@angular/core';
import {Product} from '../../../model/product';
import {Category} from '../../../model/category';
import {Customer} from '../../../model/customer';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {ProductService} from '../../../service/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CategoryService} from '../../../service/category.service';
import {AuthService} from '../../../service/user/auth.service';
import {CustomerService} from '../../../service/customer.service';
import {formatDate} from '@angular/common';
import {finalize} from 'rxjs/operators';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  formCreate: FormGroup;
  product: Product;
  categories: Category[] = [];
  selectedImage: any;
  imgSrc = '../assets/img/no-image.jpg';
  id: number;
  imgUpdate = '';

  constructor(@Inject(AngularFireStorage) private storage: AngularFireStorage,
              private productService: ProductService,
              private toastr: ToastrService,
              private router: Router,
              private categoryService: CategoryService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(value => {
      if (value != null) {
        this.getProductById(value.get('id'));
      } else {
        this.getProductById(this.id);
      }
    });
    this.formCreate = new FormGroup({
      id: new FormControl(''),
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
    this.getProductById(this.id);
    // console.log(this.getProductById(this.id));
    // console.log(this.product.image + 'aaaaaaaaaaaaaaa');
  }

  getProductById(id) {
    this.productService.findProductById(id).subscribe((value: Product) => {
      console.log(value);
      this.imgUpdate = value.image;
      console.log('image =' + value.image);
      this.formCreate.patchValue(value);
    });
  }

  createProduct() {
    const productEdit: Product = this.formCreate.value;

    if (this.selectedImage == null) {
      this.productService.editProducts(productEdit).subscribe(value => {
        this.router.navigateByUrl('/shop').then(() => {
          this.toastr.success('S???a th??nh c??ng');
        });
      });
    } else {
      this.product = this.formCreate.value;
      const nameImg = ProductEditComponent.getCurrentDateTime() + this.selectedImage.name;
      const fileRef = this.storage.ref(nameImg);
      this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.product.image = url;
            this.productService.editProducts(this.product).subscribe(value => {
              this.router.navigateByUrl('/shop').then(() => {
                this.toastr.success('S???a th??nh c??ng!');
              });
            });
          });
        })
      ).subscribe();
    }
  }

  getAllCategory() {
    this.categoryService.getAllCategories().subscribe(value => {
      this.categories = value;
      console.log(this.categories);
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

  static getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  compareCategory(c1: Category, c2: Category) {
    if (c1 != null && c2 != null) {
      return c1.id == c2.id;
    }
  }
}
