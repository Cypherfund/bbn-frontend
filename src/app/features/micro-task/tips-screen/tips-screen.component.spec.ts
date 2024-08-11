import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsScreenComponent } from './tips-screen.component';

describe('TipsScreenComponent', () => {
  let component: TipsScreenComponent;
  let fixture: ComponentFixture<TipsScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TipsScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
