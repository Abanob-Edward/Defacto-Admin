import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from '../../../Models/icategory';
import { CategoryService } from '../../../services/category.service';

import { FormsModule } from '@angular/forms';
import { SubCategory } from '../../../Models/sub-category';
import { CommonModule, Location } from '@angular/common';
@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css'
})
export class UpdateCategoryComponent implements OnInit {
  successMessage: string = '';


  category: ICategory = {
    id: 0,
    name: '',
    subCategory: null,
    description: null,
    categoryImage: null,
    ar_Name: null,
    ar_Description: null,
    image: null
  };

  constructor(
    private location: Location,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const navigation = this.router.lastSuccessfulNavigation;
    if (navigation && navigation.extras.state) {
      this.category = navigation.extras.state['category'];
      if (this.category.image) {
        this.setOldImageData(this.category.image);
        this.url = 'data:image/png;base64,' + this.category.image;
      }
    }
  }
  url: string = '';
  oldImageData: string = "'data:image/png;base64,' + category.image";

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.url = e.target.result;
        this.category.categoryImage = file;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
    else {
      this.url = this.oldImageData;
      this.cdr.detectChanges();

    }
  }

  setOldImageData(imageData: string) {
    this.oldImageData = imageData;
  }

  updateCategory() {
    const formData: FormData = new FormData();
    formData.append('id', this.category.id.toString());
    formData.append('name', this.category.name);
    formData.append('subCategory', this.category.subCategory?.toString() ?? '');
    formData.append('description', this.category.description ?? '');
    formData.append('ar_Name', this.category.ar_Name ?? '');
    formData.append('ar_Description', this.category.ar_Description ?? '');
    formData.append('image', this.category.image ?? '');
    if (this.category.categoryImage) {
      formData.append('categoryImage', this.category.categoryImage, this.category.categoryImage.name);
    }

    this.categoryService.updateCategory(this.category.id, formData).subscribe({
      next: (response) => {
        // console.log(response);
        // this.router.navigateByUrl(`/GetAllCategories`);
        // this.successMessage = 'Category Updated successfully!';
        // // Display an alert to the user
        // window.alert(this.successMessage);
      },
      error: (error) => {
        this.successMessage = 'Category Updated successfully!';
        this.router.navigateByUrl(`/GetAllCategories`).then(() => {
          window.alert(this.successMessage);
        }).catch(error => {
          console.error('Navigation failed', error);
        });
      }
    });
  }


  getSubCategories(): { name: string; value: number }[] {
    return Object.keys(SubCategory)
      .filter(key => isNaN(Number(key))) // Filter out numeric keys
      .map(key => ({ name: key, value: SubCategory[key as keyof typeof SubCategory] }));
  }

  goBack() {
    this.location.back();
  }

}