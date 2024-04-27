import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../services/item.service';
import { ItemWithProductName } from '../../../Models/item-with-product-name';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiProductsService } from '../../../services/api-products.service';

@Component({
  selector: 'app-get-all-items',
  templateUrl: './get-all-items.component.html',
  imports: [RouterLink, CommonModule, FormsModule],
  styleUrls: ['./get-all-items.component.css'],
  standalone: true
})
export class GetAllItemsComponent implements OnInit {
  products: any[] = [];
  itemsWithProductNames: ItemWithProductName[] = [];
  totalItems: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 4;
  Apiproduct: any[] = []
  items: any[] = [];
  constructor(private itemService: ItemService, private apiProductsService: ApiProductsService) { }

  ngOnInit(): void {
    this.getItems(this.currentPage, this.itemsPerPage);
    this.getAllProducts();
  }

  getItems(page: number, itemsPerPage: number): void {
    this.itemService.getAllItemsWithPaging(page, itemsPerPage).subscribe(data => {
      this.items = data.entities;
    });
  }

  getProductTitle(productId: number): string {
    const product = this.products.find(p => p.id === productId);
    return product ? product.title : 'Unknown';
  }

  getAllProducts(): void {
    this.apiProductsService.getAllProducts().subscribe(data => {
      this.products = data.entities;
    });
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getItems(this.currentPage, this.itemsPerPage);
    }
  }

  nextPage(): void {
    this.currentPage++;
    this.getItems(this.currentPage, this.itemsPerPage);
  }

}





