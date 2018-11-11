import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropImageComponent } from './cropimage.component';

describe('CropimageComponent', () => {
  let component: CropImageComponent;
  let fixture: ComponentFixture<CropImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
