import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilePaymentFormComponent } from './mobile-payment-form.component';

describe('MobilePaymentFormComponent', () => {
  let component: MobilePaymentFormComponent;
  let fixture: ComponentFixture<MobilePaymentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MobilePaymentFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MobilePaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
