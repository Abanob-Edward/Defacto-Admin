import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IProduct } from '../../../Models/iproduct';
import { CategoryService } from '../../../services/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiProductsService } from '../../../services/api-products.service';
import { Location } from '@angular/common';
import { Gender } from '../../../Models/gender';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit {
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
  categories: any[] = [];
  selectedGender: Gender | null = null;

  constructor(
    private location: Location,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private productsService: ApiProductsService,
    private categoryService: CategoryService // Assuming you have a CategoryService
  ) { }

  selectedImageUrl1: string | null = null;
  selectedImageUrl2: string | null = null;
  selectedImageUrl3: string | null = null;
  selectedImageUrl4: string | null = null;


  selectedFile1: File | null = null;
  selectedFile2: File | null = null;
  selectedFile3: File | null = null;
  selectedFile4: File | null = null;

  onFileSelected(event: any, imageNumber: number) {
    const file = (event.target as HTMLInputElement).files?.[0] ?? null;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        switch (imageNumber) {
          case 1:
            this.selectedImageUrl1 = e.target.result;
            this.selectedFile1 = file;
            break;
          case 2:
            this.selectedImageUrl2 = e.target.result;
            this.selectedFile2 = file;
            break;
          case 3:
            this.selectedImageUrl3 = e.target.result;
            this.selectedFile3 = file;
            break;
          case 4:
            this.selectedImageUrl4 = e.target.result;
            this.selectedFile4 = file;
            break;
        }
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }


  ngOnInit(): void {
    const navigation = this.router.lastSuccessfulNavigation;
    if (navigation && navigation.extras.state) {
       this.product = navigation.extras.state['product'];
       this.setImageUrls();
    }
    this.getAllCategories();
   }

  getAllCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    });
  }

  setImageUrls() {
    this.selectedImageUrl1 = this.product.productImage1 ? 'data:image/png;base64,' + this.product.productImage1 : null;
    this.selectedImageUrl2 = this.product.productImage2 ? 'data:image/png;base64,' + this.product.productImage2 : null;
    this.selectedImageUrl3 = this.product.productImage3 ? 'data:image/png;base64,' + this.product.productImage3 : null;
    this.selectedImageUrl4 = this.product.productImage4 ? 'data:image/png;base64,' + this.product.productImage4 : null;
  }


  updateProduct(): void {
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

    // Append the image files directly
    if (this.selectedFile1) {
      formData.append('productImage1', this.selectedFile1, this.selectedFile1.name);
    }
    if (this.selectedFile2) {
      formData.append('productImage2', this.selectedFile2, this.selectedFile2.name);
    }
    if (this.selectedFile3) {
      formData.append('productImage3', this.selectedFile3, this.selectedFile3.name);
    }
    if (this.selectedFile4) {
      formData.append('productImage4', this.selectedFile4, this.selectedFile4.name);
    }

    this.productsService.updateProduct(this.product.id, formData).subscribe({
      next: (response) => {
        console.log('Product updated successfully');
        this.router.navigate(['/GetAllProducts']);
      },
      error: (error) => {
        // Handle error
        console.error('Error updating product', error);
      }
    });
  }


  getGender(): { name: string; value: number | null }[] {
    return Object.keys(Gender)
      .filter(key => isNaN(Number(key)))
      .map(key => ({ name: key, value: Gender[key as keyof typeof Gender] }));
  }

  goBack() {
    this.location.back();
  }




}