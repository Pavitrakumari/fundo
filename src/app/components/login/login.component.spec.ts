/**component has imports , decorator & class */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    });
    it('Form should be valid '),async(()=>{
    expect(component.model1.email.toEqual('pavitra@gmail.com'));
    expect(component.model1.password.toEqual('pavitra123'));
    expect(component.model1.email).toBeTruthy();
    expect(component.model1.password).toBeTruthy();
  })
  it('Invalid Form'),async(()=>{
    expect(component.model1.email.toEqual(''));
    expect(component.model1.password.toEqual(''));
    expect(component.model1.email).toBeFalsy();
    expect(component.model1.password).toBeFalsy();
    })
    
});
