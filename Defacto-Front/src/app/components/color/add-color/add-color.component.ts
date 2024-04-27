import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorService } from '../../../services/color.service';
import { IColor } from '../../../Models/icolor';
import { Router, RouterLink } from '@angular/router';
import { ApiColor } from '../../../Models/api-color';

@Component({
  selector: 'app-add-color',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './add-color.component.html',
  styleUrl: './add-color.component.css'
})
export class AddColorComponent {
  newColor: IColor = {
    id: 0,
    name: '',
    hex: '',
    rgb: '',
    notActive: false
  };

  constructor(private colorService: ColorService,private router :Router) {}

  addColor(): void {
    this.colorService.createColor(this.newColor).subscribe({
      next: data => {
        this.router.navigate(['/GetAllColors']);

      },
      error: error => {
        console.error('Error adding color:', error);
      }
    });
 }

}
