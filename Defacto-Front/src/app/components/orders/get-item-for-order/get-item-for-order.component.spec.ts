import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetItemForOrderComponent } from './get-item-for-order.component';

describe('GetItemForOrderComponent', () => {
  let component: GetItemForOrderComponent;
  let fixture: ComponentFixture<GetItemForOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetItemForOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetItemForOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
