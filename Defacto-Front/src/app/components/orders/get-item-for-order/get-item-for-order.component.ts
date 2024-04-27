import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../../Models/iorder';
import { OrderService } from '../../../services/order.service';
import { CommonModule } from '@angular/common';
import { OrderStatus } from '../../../Models/order-status';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-get-item-for-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-item-for-order.component.html',
  styleUrl: './get-item-for-order.component.css'
})
export class GetItemForOrderComponent implements OnInit {
  orderId!: number;
  items = 10;
  pageNo = 1;
  orderItems: IOrder | null = null;

  constructor(
    private location: Location,
    private orderService: OrderService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.orderId = +params['id'];
      this.fetchOrderItems();
    });
  }

  fetchOrderItems(): void {
    this.orderService.getItemsForOrder(this.orderId, this.items, this.pageNo).subscribe({
      next: (data) => {
        this.orderItems = data;
      },
      error: (error) => {
        console.error('Error fetching order items:', error);
      }
    });
  }

  goBack() {
    this.location.back();
  }
}