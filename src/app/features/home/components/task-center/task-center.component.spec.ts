import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCenterComponent } from './task-center.component';

describe('TaskCenterComponent', () => {
  let component: TaskCenterComponent;
  let fixture: ComponentFixture<TaskCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskCenterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
