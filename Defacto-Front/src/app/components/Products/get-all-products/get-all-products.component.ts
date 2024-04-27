import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiProductsService } from '../../../services/api-products.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-get-all-products',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './get-all-products.component.html',
  styleUrl: './get-all-products.component.css'
})
export class GetAllProductsComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  selectedCategoryId: number | 0 = 0;
  category: any;
  currentPage: number = 1;
  totalPages: number = 0;
  itemsPerPage: number = 4;

  constructor(
    private location: Location,
    private apiProductsService: ApiProductsService,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllProducts(this.currentPage, this.itemsPerPage);
    this.getAllCategories();
  }

  getAllProducts(page: number, itemsPerPage: number): void {
    this.apiProductsService.getAllProductsWithPaging(page, itemsPerPage).subscribe(data => {
      this.products = data.entities;
      this.totalPages = Math.ceil(data.count / itemsPerPage);
    });
  }

  getAllCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    });
  }

  filterByCategory(categoryId: number | 0): void {
    if (categoryId == 0) {
      this.getAllProducts(this.currentPage, this.itemsPerPage);
    } else {
      this.apiProductsService.getProductsByCategoryID(this.currentPage, categoryId, this.itemsPerPage).subscribe(data => {
        this.products = data.entities;
        // this.totalPages = Math.ceil(data.count / this.itemsPerPage);
      });
    }
  }


  Delete(id: number): void {
    this.apiProductsService.SDelete(id).subscribe({
      next: (response) => {
        console.log('Product deleted successfully');
        this.getAllProducts(this.currentPage, this.itemsPerPage);
      },
      error: (err) => {
        console.error('Error in deleting product', err);
      }
    });
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.filterByCategory(this.selectedCategoryId);
    }
  }

  nextPage(): void {
    this.currentPage++;
    this.filterByCategory(this.selectedCategoryId);
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.filterByCategory(this.selectedCategoryId);
  }

  goBack() {
    this.location.back();
  }
}