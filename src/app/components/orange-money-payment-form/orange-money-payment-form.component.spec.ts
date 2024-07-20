import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrangeMoneyPaymentFormComponent } from './orange-money-payment-form.component';

describe('MobilePaymentFormComponent', () => {
  let component: OrangeMoneyPaymentFormComponent;
  let fixture: ComponentFixture<OrangeMoneyPaymentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrangeMoneyPaymentFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrangeMoneyPaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
