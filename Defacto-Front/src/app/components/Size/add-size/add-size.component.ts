import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SizeService } from '../../../services/size.service';
import { ISize } from '../../../Models/isize';

@Component({
  selector: 'app-add-size',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './add-size.component.html',
  styleUrl: './add-size.component.css'
})
export class AddSizeComponent {
  newSize: ISize = {
    id: 0,
    name: '',
    code: '',
    notActive: false
  };

  constructor(private SizeService: SizeService, private router: Router) { }

  addSize(): void {
    this.SizeService.createSize(this.newSize).subscribe({
      next: data => {
        this.router.navigate(['/GetAllSize']);

      },
      error: error => {
        console.error('Error adding color:', error);
      }
    });
 }


}
