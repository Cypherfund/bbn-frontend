import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyLikesComponent } from './buy-likes.component';

describe('BuyLikesComponent', () => {
  let component: BuyLikesComponent;
  let fixture: ComponentFixture<BuyLikesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuyLikesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyLikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
