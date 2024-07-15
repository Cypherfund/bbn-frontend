import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BbnComponent } from './bbn.component';

describe('BbnComponent', () => {
  let component: BbnComponent;
  let fixture: ComponentFixture<BbnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BbnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BbnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
