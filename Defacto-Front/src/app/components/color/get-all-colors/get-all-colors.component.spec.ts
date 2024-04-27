import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllColorsComponent } from './get-all-colors.component';

describe('GetAllColorsComponent', () => {
  let component: GetAllColorsComponent;
  let fixture: ComponentFixture<GetAllColorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllColorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetAllColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
