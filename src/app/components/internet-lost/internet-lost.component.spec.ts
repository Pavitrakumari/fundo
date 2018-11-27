import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternetLostComponent } from './internet-lost.component';

describe('InternetLostComponent', () => {
  let component: InternetLostComponent;
  let fixture: ComponentFixture<InternetLostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternetLostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternetLostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
