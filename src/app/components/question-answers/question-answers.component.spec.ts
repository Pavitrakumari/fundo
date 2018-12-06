import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAnswersComponent } from './question-answers.component';

describe('QuestionAnswersComponent', () => {
  let component: QuestionAnswersComponent;
  let fixture: ComponentFixture<QuestionAnswersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionAnswersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return true when there is a like by user', () => {
    let content = [{
    like : true,
    userId:localStorage.getItem('userId')
    }]
    let question = {
    like : content
    }
    expect(component.like(question)).toBeTruthy();
    });
    it('should return false when there is a no like by user', () => {
      let content = [{
      like : true,
      userId:"5bdc2ee7bbcc980040a1277f"
      }]
      let question = {
      like : content
      }
      expect(component.like(question)).toBeFalsy();
      });
      it('should return true when there is a rating given by user', () => {
        let rateArray = [{
        rate : 4,
        userId:localStorage.getItem('userId')
        }]
        let question = {
        rate : rateArray,
        event:event
        }
        expect(component.averageRating(question)).toBeTruthy();
        });
        it('should return false when there is  no rating given by user', () => {
          let rateArray = [{
          rate : 3,
          userId:"5bdc2ee7bbcc980040a1277f"
          }]
          let question = {
          rate : rateArray,
          event:event
          }
          expect(component.averageRating(question)).toBeFalsy();
          });
          
      
});
