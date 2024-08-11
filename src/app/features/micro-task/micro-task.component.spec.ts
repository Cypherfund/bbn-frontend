import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroTaskComponent } from './micro-task.component';

describe('MicroTaskComponent', () => {
  let component: MicroTaskComponent;
  let fixture: ComponentFixture<MicroTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MicroTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MicroTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
