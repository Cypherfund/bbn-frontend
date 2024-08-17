import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeToMicrotaskComponent } from './welcome-to-microtask.component';

describe('WelcomeToMicrotaskComponent', () => {
  let component: WelcomeToMicrotaskComponent;
  let fixture: ComponentFixture<WelcomeToMicrotaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WelcomeToMicrotaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeToMicrotaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
