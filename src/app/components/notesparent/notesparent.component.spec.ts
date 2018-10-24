import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesparentComponent } from './notesparent.component';

describe('NotesparentComponent', () => {
  let component: NotesparentComponent;
  let fixture: ComponentFixture<NotesparentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesparentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesparentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
