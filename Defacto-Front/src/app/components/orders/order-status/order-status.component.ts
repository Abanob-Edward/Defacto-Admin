import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { FormsModule } from '@angular/forms';
import { OrderStatus } from '../../../Models/order-status';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-order-status',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './order-status.component.html',
  styleUrl: './order-status.component.css'
})
export class OrderStatusComponent implements OnInit {
  orderId: number = 0;
  status: OrderStatus | undefined;
  OrderStatus = OrderStatus;

  constructor(private location: Location,private orderService: OrderService, private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.orderId = +params['id'];
    });

    this.route.queryParams.subscribe(params => {
      this.status = params['state'];
    });
  }

  getStatusString(status: OrderStatus): string {
    return OrderStatus[status];
  }

  updateOrder(): void {
    if (this.status !== undefined) {
       this.orderService.updateOrderStatus(this.orderId, this.status).subscribe({
         next: (response) => {
        },
         error: (error) => {
          this.router.navigateByUrl(`/getDefactoOrders`);
         }
       });
    }
   }   

  getOrderStatus(): { name: string; value: number }[] {
    return Object.keys(OrderStatus)
      .filter(key => isNaN(Number(key)))
      .map(key => ({ name: key, value: OrderStatus[key as keyof typeof OrderStatus] }));
  }

  goBack() {
    this.location.back();
  }

}
