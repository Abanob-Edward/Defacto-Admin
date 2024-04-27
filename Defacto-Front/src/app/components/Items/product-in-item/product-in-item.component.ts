import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ItemService } from '../../../services/item.service';
import { FormsModule } from '@angular/forms';
import { ApiProductsService } from '../../../services/api-products.service';
import { Location } from '@angular/common';
import { ApiItem } from '../../../Models/api-item';

@Component({
  selector: 'app-product-in-item',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './product-in-item.component.html',
  styleUrl: './product-in-item.component.css'
})
export class ProductInItemComponent implements OnInit {
  pageNumber: number = 1;
  itemsPerPage: number = 2;
  totalPages: number = 1;
  productId!: number;
  items: ApiItem | undefined;
  product: any;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private itemService: ItemService,
    private router: Router,
    private _ApiProductsService: ApiProductsService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      this.loadItems(this.productId, this.itemsPerPage, this.pageNumber);
      this.loadProduct();
    });
  }


  loadItems(productId: number, items: number, pagenumber: number): void {
    // const itemsPerPage = 2;
    // const pageNumber = 1;

    this.itemService.getItemsByProductId(productId, items, pagenumber).subscribe({
      next: items => {
        // this.items = items.entities;
        this.items = items;
        this.totalPages = Math.ceil(items.count / this.itemsPerPage);
      },
      error: error => {
        console.error('Error fetching items', error);
      }
    });
  }

  // loadItems(): void {
  //   // const itemsPerPage = 2;
  //   // const pageNumber = this.pageNumber;

  //   this.itemService.getItemsByProductId(this.productId, this.itemsPerPage, this.pageNumber).subscribe({
  //     next: items => {
  //       this.items = items;
  //       this.totalPages = Math.ceil(items.count / this.itemsPerPage);
  //     },
  //     error: error => {
  //       console.error('Error fetching items', error);
  //     }
  //   });
  // }


  loadProduct(): void {
    this._ApiProductsService.getProductById(this.productId).subscribe({
      next: product => {
        this.product = product.entity;
      },
      error: error => {
        console.error('Error fetching product', error);
      }
    });
  }


  Delete(id: number): void {
    this.itemService.SDelete(id).subscribe({
      next: (response) => {
        console.log('Product deleted successfully');
        this.loadItems(this.productId, this.itemsPerPage, this.pageNumber);
      },
      error: (err) => {
        console.error('Error in deleting product', err);
      }
    });
  }

  // nextPage(): void {
  //   if (this.currentPage < this.totalPages) {
  //     this.currentPage++;
  //     this.loadItems();
  //   }
  // }

  nextPage(): void {
    this.pageNumber++;
    this.loadItems(this.productId, this.itemsPerPage, this.pageNumber);
  }

  previousPage(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.loadItems(this.productId, this.itemsPerPage, this.pageNumber);
    }
  }

  getPageNumbers(): number[] {
    const pageNumbers: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }

  goToPage(pageNumber: number): void {
    this.pageNumber = pageNumber;
    this.loadItems(this.productId, this.itemsPerPage, this.pageNumber);
  }

  isCurrentPage(pageNumber: number): boolean {
    return this.pageNumber === pageNumber;
  }

  goBack() {
    this.location.back();
  }

}
