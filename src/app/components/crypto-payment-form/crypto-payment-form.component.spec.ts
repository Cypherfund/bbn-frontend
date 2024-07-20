import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoPaymentFormComponent } from './crypto-payment-form.component';

describe('CryptoPaymentFormComponent', () => {
  let component: CryptoPaymentFormComponent;
  let fixture: ComponentFixture<CryptoPaymentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CryptoPaymentFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CryptoPaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
