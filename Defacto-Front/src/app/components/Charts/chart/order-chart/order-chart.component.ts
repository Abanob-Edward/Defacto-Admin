import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChartService } from '../../../../services/chart.service';
import { ChartResponce } from '../../../../Models/chart-responce';
import { Chart } from 'chart.js';



@Component({
 selector: 'app-order-chart',
 standalone: true,
 imports: [],
 templateUrl: './order-chart.component.html',
 styleUrl: './order-chart.component.css'
})
export class OrderChartComponent implements OnInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  @ViewChild('usersChartCanvas') usersChartCanvas!: ElementRef;
  @ViewChild('productChartCanvas') productChartCanvas!: ElementRef;

 chartData: any;
 usersChartData: any;
 constructor(private chartService: ChartService) { }

 ngOnInit() {
    this.chartService.getOrders(10, 1).subscribe((data: any) => {
      const currentMonthOrders = this.filterOrdersByCurrentMonth(data.entities);
      this.chartData = this.prepareChartData(currentMonthOrders);
      this.createChart();
    });

    this.chartService.getAllUsers().subscribe((data: ChartResponce) => {
      const blockedUsers = data.entity.filter(user => user.isBlocked).length;
      const notBlockedUsers = data.entity.filter(user => !user.isBlocked).length;
      this.usersChartData = {
        labels: ['Blocked Users', 'Not Blocked Users'],
        datasets: [{
           label: 'User Status',
           data: [blockedUsers, notBlockedUsers],
           backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)'],
           borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
           borderWidth: 1
        }]
       };


      this.createUserChart();
    });

    this.chartService.getProductsByCategoryID(1, 12).subscribe(data => {
      const productsCount = data.entities.length;
      this.createProductChart(productsCount);
    });
 }

 filterOrdersByCurrentMonth(orders: any[]): any[] {
    const currentMonth = new Date().getMonth();
    return orders.filter(order => new Date(order.dateTime).getMonth() === currentMonth);
 }

 prepareChartData(currentMonthOrders: any[]): any {
    const ordersCount = currentMonthOrders.length;
    const currentMonth = new Date().toLocaleString('default', { month: 'long' }); // Get the current month name
    return {
      labels: [currentMonth],
      datasets: [{
        label: 'Orders per Current Month',
        data: [ordersCount],
        backgroundColor: 'rgba(115, 128, 192, 0.5)',
        borderColor: 'rgba(125, 192, 122, 1)',
        borderWidth: 2
      }]
    };
 }

 createChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    new Chart(ctx, {
       type: 'line', // Set the chart type to line
       data: {
         labels: this.chartData.labels,
         datasets: [{
           label: 'Orders At Current Month',
           data: this.chartData.datasets[0].data,
           backgroundColor: 'rgba(115, 192, 192, 0.2)',
           borderColor: 'rgba(75, 192, 192, 1)',
           borderWidth: 2
         }]
       },
       options: {
         responsive: true,
         plugins: {
           legend: {
             position: 'top',
           },
           title: {
             display: true,
             text: 'Orders per Month'
           }
         }
       }
    });
  }



  createUserChart() {
    const ctx = this.usersChartCanvas.nativeElement.getContext('2d');
    new Chart(ctx, {
       type: 'bar',
       data: this.usersChartData,
       options: {
         plugins: {
           title: {
             display: true,
             text: 'User Status'
           }
         },
         scales: {
           y: {
             beginAtZero: true
           }
         }
       }
    });
  }

  createProductChart(productsCount: number) {
    const ctx = this.productChartCanvas.nativeElement.getContext('2d');
    new Chart(ctx, {
       type: 'doughnut',
       data: {
         labels: ['Products'],
         datasets: [{
           label: 'Number of Products',
           data: [productsCount],
           backgroundColor: [
             'rgba(0,99, 132, 0.7)', // Red with transparency
             'rgba(0, 0, 0, 0.7)', // Blue with transparency
             'rgba(0, 206, 86, 0.7)', // Yellow with transparency
             'rgba(0, 0, 0, 0.7)' // Green with transparency
           ],
           borderColor: [
             'rgba(0, 99, 132, 1)', // Red
             'rgba(0, 162, 235, 1)', // Blue
             'rgba(0, 206, 86, 1)', // Yellow
             'rgba(0, 192, 192, 1)' // Green
           ],
           borderWidth: 1
         }]
       },
       options: {
         responsive: true,
         plugins: {
           legend: {
             position: 'top',
           },
           title: {
             display: true,
             text: 'Number of Products'
           }
         },
         layout: {
           padding: {
             left: 10,
             right: 10,
             top: 10,
             bottom: 10
           }
         }
       }
    });
  }



}
