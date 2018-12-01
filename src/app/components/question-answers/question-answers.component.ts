/************************************************************************************************
*  Execution       :   1. default node         cmd> QuestionAnswersComponent.ts 
*        
*  Purpose         : To ask a question & replying a question
* 
*  Description    
* 
*  @file           : QuestionAnswersComponent.js
*  @overview       : To ask a question ,like , rate & replying a question
*  @module         : QuestionAnswersComponent.ts - This is optional if expeclictly it's an npm or local package
*  @author         : Pavitrakumari <pavithra.korapati@gmail.com>
*  @since          : 28-11-2018
*
*************************************************************************************************/
/**component has imports , decorator & class */
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NoteService } from '../../core/services/http/note/note.service';
import { LoggerService } from '../../core/services/logger/logger.service';
import { error } from 'util';
import { environment } from '../../../environments/environment';
import { QstnAnsService } from '../../core/services/http/qstnAns/qstn-ans.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-question-answers',
  templateUrl: './question-answers.component.html',
  styleUrls: ['./question-answers.component.scss']
})
export class QuestionAnswersComponent implements OnInit {
  @ViewChild('replyMessage') public replyMessageRef:ElementRef;
  @ViewChild('questionAsked') public questionAskedRef:ElementRef;

  destroy$: Subject<boolean> = new Subject<boolean>();
  value: number;
  avgRate: number;

  constructor(private route: ActivatedRoute, private notesService: NoteService,
  public router: Router, public quesService: QstnAnsService) { }
  private noteId;
  private Title;
  private Description;
  private details;
  private checkList = [];
  private noteColor;
  private message;
  private parentId;
  private userName;
  private userDetails;
  private img;
  private image2;
  private replyId;
  private questionAnswerArray;
  private show = true;
  private hide = true;
  private new=true;
  private rate=0;
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.noteId = params['noteid'];
      LoggerService.log('details', this.noteId);
    });
    this.getNotesQues();
  }
/***********************************getnotes of question method***************************/
getNotesQues() {
    this.notesService.getNoteDetail(this.noteId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        LoggerService.log('getNoteDetail', data);

        this.userDetails = data['data']['data'][0].user;
        this.img = environment.profileUrl;

        this.details = data['data'].data[0];
        this.Title = this.details.title;
        this.Description = this.details.description;
        this.image2 = environment.profileUrl + this.details.questionAndAnswerNotes[0].user.imageUrl;

        // this.noteColor=this.details.color;

        for (var i = 0; i < data['data']['data'][0].noteCheckLists.length; i++) {
          if (data['data']['data'][0].noteCheckLists[i].isDeleted == false) {
            this.checkList.push(data['data']['data'][0].noteCheckLists[i])
          }
        }
        if (this.details.questionAndAnswerNotes[0] != undefined) {
          this.message = this.details.questionAndAnswerNotes[0].message;
          this.questionAnswerArray = this.details.questionAndAnswerNotes;
        }
        if (this.details.questionAndAnswerNotes != undefined) {
          this.questionAnswerArray = this.details.questionAndAnswerNotes;

          LoggerService.log('questionArray', this.questionAnswerArray)
        }
        if(this.details.questionAndAnswerNotes[0]!=undefined){
          if(this.details.questionAndAnswerNotes[0].rate!=undefined){
            this.rate=0;
            for(let i=0;i<this.details.questionAndAnswerNotes[0].rate.length;i++){
              this.rate=(this.rate+this.details.questionAndAnswerNotes[0].rate[i].rate)/(i+1);
            }


          }

        }
      })
  }
/***********************************close() back to notes*********************************/
close() {
    this.router.navigate(['home/notes']);
  }
  questionEnter() {

  }
ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
/***********************************Asking A question***********************************/
askQuestion(questionAsked) {
  console.log("questionAskedRef.....:: ",this.questionAskedRef.nativeElement.innerHTML);
questionAsked=this.questionAskedRef.nativeElement.innerHTML;
    var content = {
      'message': questionAsked,
      'notesId': this.noteId
    }
    this.quesService.quesAnsNotes(content).subscribe(data => {
      LoggerService.log('success in adding', data);
      this.getNotesQues();
      this.message = data['data']['details'].message;
    })
  }
/***********************************Liking A question***********************************/
like(value) {
    LoggerService.log(value);
    var content = {
      'like': true,
    }
    this.quesService.likeQnA(value, content)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        LoggerService.log('success in like', data);
        this.getNotesQues();

      });
    }
/***********************************Rating A question***********************************/
ratingAnswer(value, event) {
    var content = {
      'rate': event
    }
    this.quesService.rateQnA(value.id, content)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        LoggerService.log('success in rating', data);
        this.getNotesQues();
      }),
      error=>{
        LoggerService.log("error in rating",error);
      }
    }
/***********************************Replying A question***********************************/
replyAnswer(value) {
    this.show = !this.show;
    this.replyId=value;
  }
  private  content = {
    'message': ''
  }
  public replyMessage;
reply() {
  console.log("replyMessageTextRef.....:: ",this.replyMessageRef.nativeElement.innerHTML);
  this.replyMessage=this.replyMessageRef.nativeElement.innerHTML;
    LoggerService.log(this.content.message);
    LoggerService.log(this.replyId);
    this.content.message=this.replyMessage;
    this.quesService.replyQnA(this.replyId, this.content)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
    LoggerService.log('success in replying', data);
    this.getNotesQues();

  })
}
averageRating(rateArray) {
  this.value = 0;
  if (rateArray.length != 0) {
  for (let i = 0; i < rateArray.length; i++) {
  this.value =this.value + rateArray[i].rate
  }
  this.avgRate = this.value / rateArray.length;
  return this.avgRate;
  }
  }
  private newreply;
  replyQues(question){
    this.newreply=0;
    for(var i=0;i<this.questionAnswerArray.length;i++){
      if(question.id==this.questionAnswerArray[0].id){
        this.newreply++;
      }
    }
return this.newreply;
  }
}