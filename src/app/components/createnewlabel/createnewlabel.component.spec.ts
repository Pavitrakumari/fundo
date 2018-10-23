import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatenewlabelComponent } from './createnewlabel.component';

describe('CreatenewlabelComponent', () => {
  let component: CreatenewlabelComponent;
  let fixture: ComponentFixture<CreatenewlabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatenewlabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatenewlabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
