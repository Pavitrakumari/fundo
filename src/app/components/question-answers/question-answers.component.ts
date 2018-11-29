import { Component, OnInit } from '@angular/core';
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
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private route: ActivatedRoute, private notesService: NoteService,
    public router: Router, public quesService: QstnAnsService) { }
  private noteId;
  private noteTitle;
  private noteDescription;
  private noteDetails;
  private checkList = [];
  private noteColor;
  private message;
  private parentId;
  private userName;
  private userDetails;
  private img;
  private replyId;
  private questionAnswerArray;
  private show = true;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.noteId = params['noteid'];
      LoggerService.log('noteDetails', this.noteId);
    });
    this.getNotesQues();

  }
  getNotesQues() {
    this.notesService.getNoteDetail(this.noteId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        LoggerService.log('getNoteDetail', data);

        this.userDetails = data['data']['data'][0].user;
        this.img = environment.profileUrl + this.userDetails.imageUrl;

        this.noteDetails = data['data'].data[0];
        this.noteTitle = this.noteDetails.title;
        this.noteDescription = this.noteDetails.description;
        // this.noteColor=this.noteDetails.color;

        for (var i = 0; i < data['data']['data'][0].noteCheckLists.length; i++) {
          if (data['data']['data'][0].noteCheckLists[i].isDeleted == false) {
            this.checkList.push(data['data']['data'][0].noteCheckLists[i])
          }
        }

        if (this.noteDetails.questionAndAnswerNotes[0] != undefined) {
          this.message = this.noteDetails.questionAndAnswerNotes[0].message;
          this.questionAnswerArray = this.noteDetails.questionAndAnswerNotes;
        }
        if (this.noteDetails.questionAndAnswerNotes != undefined) {
          this.questionAnswerArray = this.noteDetails.questionAndAnswerNotes;

          LoggerService.log('questionArray', this.questionAnswerArray)
        }
      })
  }
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

  askQuestion(questionAsked) {
    var content = {
      'message': questionAsked,
      'notesId': this.noteId
    }
    this.quesService.quesAnsNotes(content).subscribe(data => {
      LoggerService.log('success in adding', data);
      this.message = data['data']['details'].message;

    })

  }
  like(value) {
    LoggerService.log(value);
    var content = {
      'like': true,
    }

    this.quesService.likeQnA(value, content)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        LoggerService.log('success in like', data);
      });

  }
  ratingAnswer(value, event) {

    var content = {
      'rate': event
    }
    this.quesService.rateQnA(value.id, content)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        LoggerService.log('success in rating', data);

      })
  }
  replyAnswer(value) {
    this.show = !this.show;
    this.replyId=value;

  }

  private  content = {
    'message': ''
  }
public replyMessage;
  leaveReply() {
    LoggerService.log(this.content.message);
    LoggerService.log(this.replyId);
 this.content.message=this.replyMessage;
   
    this.quesService.replyQnA(this.replyId, this.content)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        LoggerService.log('success in replying', data);

      })
  }

}