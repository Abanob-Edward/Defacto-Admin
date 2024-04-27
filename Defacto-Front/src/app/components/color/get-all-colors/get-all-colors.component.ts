import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ColorService } from '../../../services/color.service';
import { ApiColor } from '../../../Models/api-color';

@Component({
  selector: 'app-get-all-colors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-all-colors.component.html',
  styleUrl: './get-all-colors.component.css',
})
export class GetAllColorsComponent implements OnInit {
  constructor(private colorService: ColorService) {}
  colors: ApiColor['entities'] = [];

  ngOnInit(): void {
    this.colorService.getColors().subscribe(
      (data) => {
        this.colors = data.entities;
      },
      (error) => {
        console.error('Error fetching colors:', error);
      }
    );
  }

  deleteColor(colorId: number): void {
    this.colorService.deleteColor(colorId).subscribe(
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
