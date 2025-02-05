import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikesComponent } from './likes.component';

describe('BuyFollowersComponent', () => {
  let component: LikesComponent;
  let fixture: ComponentFixture<LikesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LikesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
