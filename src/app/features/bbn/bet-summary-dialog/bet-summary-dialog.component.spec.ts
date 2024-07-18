import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetSummaryDialogComponent } from './bet-summary-dialog.component';

describe('BetSummaryDialogComponent', () => {
  let component: BetSummaryDialogComponent;
  let fixture: ComponentFixture<BetSummaryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BetSummaryDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetSummaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
