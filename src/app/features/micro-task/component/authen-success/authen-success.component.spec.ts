import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenSuccessComponent } from './authen-success.component';

describe('AuthenSuccessComponent', () => {
  let component: AuthenSuccessComponent;
  let fixture: ComponentFixture<AuthenSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthenSuccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
