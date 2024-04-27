import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllSizeComponent } from './get-all-size.component';

describe('GetAllSizeComponent', () => {
  let component: GetAllSizeComponent;
  let fixture: ComponentFixture<GetAllSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllSizeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetAllSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
