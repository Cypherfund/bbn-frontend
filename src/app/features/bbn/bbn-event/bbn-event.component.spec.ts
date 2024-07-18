import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BbnEventComponent } from './bbn-event.component';

describe('BbnEventComponent', () => {
  let component: BbnEventComponent;
  let fixture: ComponentFixture<BbnEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BbnEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BbnEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
