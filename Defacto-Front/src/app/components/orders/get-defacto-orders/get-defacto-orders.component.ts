import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../services/order.service';
import { RouterLink } from '@angular/router';
import { OrderStatus } from '../../../Models/order-status';
import { Location } from '@angular/common';

@Component({
  selector: 'app-get-defacto-orders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './get-defacto-orders.component.html',
  styleUrls: ['./get-defacto-orders.component.css']
})
export class GetDefactoOrdersComponent implements OnInit {
  orders: any
  items = 12;
  pageNo = 1;

  orderId: number = 0;
  status: number = 0;
  constructor(private location: Location, private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders(this.items, this.pageNo).subscribe(response => {
      this.orders = response.entities;
    });
  }

  getStatusName(status: number): string {
    return OrderStatus[status];
  }

  goBack() {
    this.location.back();
  }

}
