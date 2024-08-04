import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyFollowersComponent } from './buy-followers.component';

describe('BuyFollowersComponent', () => {
  let component: BuyFollowersComponent;
  let fixture: ComponentFixture<BuyFollowersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuyFollowersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyFollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
