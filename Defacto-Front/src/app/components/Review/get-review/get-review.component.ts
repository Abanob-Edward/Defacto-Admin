import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../../services/review.service';
import { ApiReview } from '../../../Models/api-review';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-review.component.html',
  styleUrl: './get-review.component.css'
})
export class GetReviewComponent implements OnInit {
  reviewResponse!: ApiReview;
  constructor(private reviewService: ReviewService) { }


  ngOnInit(): void {
    this.loadallReviews();
 }
  loadReviews(pro_id: number): void {
    this.reviewService.getReviews(pro_id).subscribe(data => {
      this.reviewResponse = data;
    });
  }

  
  loadallReviews(): void {
    this.reviewService.getallReviews().subscribe(data => {
      this.reviewResponse = data;
    });
  }


}
