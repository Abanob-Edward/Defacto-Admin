import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from '../../../Models/iproduct';
import { Location } from '@angular/common';
import { CategoryService } from '../../../services/category.service';
import { FormsModule } from '@angular/forms';
import { ApiProductsService } from '../../../services/api-products.service';
import { Gender } from '../../../Models/gender';


@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  categories: any[] = [];
  // selectedGender: Gender | null = null;

  product: IProduct = {
    id: 0,
    title: '',
    isApproved: false,
    productGender: null,
    categoryId: 0,
    code: '',
    description: '',
    productImage1: null,
    productImage2: null,
    productImage3: null,
    productImage4: null,
    vendorId: 'df97b120-8a95-4d42-8aa2-85da7c94dee2',
    ar_Description: '',
    ar_Title: ''
  };

  constructor(private location: Location, private productsService: ApiProductsService, private router: Router, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  selectedImageUrl1: string | null = null;
  selectedImageUrl2: string | null = null;
  selectedImageUrl3: string | null = null;
  selectedImageUrl4: string | null = null;


  onFileSelected(event: Event, imageNumber: number) {
    const file = (event.target as HTMLInputElement).files?.[0] ?? null;
    if (file) {
      switch (imageNumber) {
        case 1:
          this.product.productImage1 = file;
          this.selectedImageUrl1 = URL.createObjectURL(file);

          break;
        case 2:
          this.product.productImage2 = file;
          this.selectedImageUrl2 = URL.createObjectURL(file);

          break;
        case 3:
          this.product.productImage3 = file;
          this.selectedImageUrl3 = URL.createObjectURL(file);

          break;
        case 4:
          this.product.productImage4 = file;
          this.selectedImageUrl4 = URL.createObjectURL(file);

          break;
      }
    }
  }

  addProduct() {
    const formData: FormData = new FormData();
    formData.append('title', this.product.title);
    formData.append('isApproved', this.product.isApproved.toString());
    formData.append('productGender', this.product.productGender ? this.product.productGender.toString() : '');
    formData.append('categoryId', this.product.categoryId.toString());
    formData.append('code', this.product.code ? this.product.code : '');
    formData.append('description', this.product.description);
    formData.append('vendorId', this.product.vendorId);
    formData.append('ar_Description', this.product.ar_Description);
    formData.append('ar_Title', this.product.ar_Title);

    if (this.product.productImage1) {
      formData.append('productImage1', this.product.productImage1, this.product.productImage1.name);
    }
    if (this.product.productImage2) {
      formData.append('productImage2', this.product.productImage2, this.product.productImage2.name);
    }
    if (this.product.productImage3) {
      formData.append('productImage3', this.product.productImage3, this.product.productImage3.name);
    }
    if (this.product.productImage4) {
      formData.append('productImage4', this.product.productImage4, this.product.productImage4.name);
    }

    this.productsService.createProduct(formData).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigateByUrl(`/GetAllProducts`);
      },
      error: (error) => {
        console.error(error);
        this.router.navigateByUrl(`/GetAllProducts`);
      }
    });
  }
  getAllCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    });
  }

  getGender(): { name: string; value: number }[] {
    return Object.keys(Gender)
      .filter(key => isNaN(Number(key)))
      .map(key => ({ name: key, value: Gender[key as keyof typeof Gender] }));
  }


  goBack() {
    this.location.back();
  }
}