import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardshortcutsComponent } from './keyboardshortcuts.component';

describe('KeyboardshortcutsComponent', () => {
  let component: KeyboardshortcutsComponent;
  let fixture: ComponentFixture<KeyboardshortcutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyboardshortcutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyboardshortcutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
