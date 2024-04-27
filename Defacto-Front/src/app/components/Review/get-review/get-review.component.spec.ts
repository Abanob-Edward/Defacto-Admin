import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetReviewComponent } from './get-review.component';

describe('GetReviewComponent', () => {
  let component: GetReviewComponent;
  let fixture: ComponentFixture<GetReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
