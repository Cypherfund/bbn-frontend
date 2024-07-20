import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalPaymentFormComponent } from './paypal-payment-form.component';

describe('PaypalPaymentFormComponent', () => {
  let component: PaypalPaymentFormComponent;
  let fixture: ComponentFixture<PaypalPaymentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaypalPaymentFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaypalPaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
