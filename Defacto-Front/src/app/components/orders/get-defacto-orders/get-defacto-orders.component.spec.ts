import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetDefactoOrdersComponent } from './get-defacto-orders.component';

describe('GetDefactoOrdersComponent', () => {
  let component: GetDefactoOrdersComponent;
  let fixture: ComponentFixture<GetDefactoOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetDefactoOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetDefactoOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
