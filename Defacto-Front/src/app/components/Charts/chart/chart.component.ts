import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChartService } from '../../../services/chart.service';
import Chart from 'chart.js/auto';
import { IApiResponse } from '../../../Models/iapi-response';
import { ChartResponce } from '../../../Models/chart-responce';

@Component({
 selector: 'app-chart',
 standalone: true,
 imports: [],
 templateUrl: './chart.component.html',
 styleUrls: ['./chart.component.css']
})
export class ChartComponent  {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
 chartData: any; // This will be updated to a more specific type based on your chart's data structure

 constructor(private chartService: ChartService) { }

 ngOnInit() {
     this.chartService.getAllUsers().subscribe((data: ChartResponce) => {
       const blockedUsers = data.entity.filter(user => user.isBlocked).length;
       const notBlockedUsers = data.entity.filter(user => !user.isBlocked).length;
       this.chartData = {
         labels: ['Blocked Users', 'Not Blocked Users'],
         datasets: [{
           data: [blockedUsers, notBlockedUsers],
           backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)'],
           borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
           borderWidth: 1
         }]
       };

       this.createChart();
     });
 }

 createChart() {
     const ctx = this.chartCanvas.nativeElement.getContext('2d');
     new Chart(ctx, {
       type: 'bar',
       data: this.chartData,
       options: {
         scales: {
           y: {
             beginAtZero: true
           }
         }
       }
     });
 }
}
