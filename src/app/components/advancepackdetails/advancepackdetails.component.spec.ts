import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancepackdetailsComponent } from './advancepackdetails.component';

describe('AdvancepackdetailsComponent', () => {
  let component: AdvancepackdetailsComponent;
  let fixture: ComponentFixture<AdvancepackdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancepackdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancepackdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
