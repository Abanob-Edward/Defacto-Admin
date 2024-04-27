import { Component, OnInit } from '@angular/core';
import { ApiIsize } from '../../../Models/api-isize';
import { SizeService } from '../../../services/size.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get-all-size',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-all-size.component.html',
  styleUrl: './get-all-size.component.css',
})
export class GetAllSizeComponent implements OnInit {
  sizes: ApiIsize['entities'] = [];

  constructor(private sizeService: SizeService) {}

  ngOnInit(): void {
    this.sizeService.getAllSizes().subscribe(
      (data) => {
        this.sizes = data.entities;
      },
      (error) => {
        console.error('Error fetching sizes:', error);
      }
    );
  }
  deleteSize(sizeId: number): void {
    this.sizeService.deleteColor(sizeId).subscribe(
      (response) => {
        console.log('Color deleted successfully:', response);
        window.location.reload();
      },
      (error) => {
        console.error('Error deleting color:', error);
      }
    );
  }
}
