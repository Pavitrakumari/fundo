import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogcollaboratorComponent } from './dialogcollaborator.component';

describe('DialogcollaboratorComponent', () => {
  let component: DialogcollaboratorComponent;
  let fixture: ComponentFixture<DialogcollaboratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogcollaboratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogcollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
