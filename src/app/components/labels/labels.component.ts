import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../core/services/http/http.service';
import { NoteService } from '../../core/services/http/note/note.service';
import { Notes } from '../../core/models/notes';
import { LoggerService } from '../../core/services/logger/logger.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  token;
  labelName;
  arraynewdata = [];
  temp;
  list:Notes[]=[]

  constructor(private noteService:NoteService,public httpService: HttpService, public route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      LoggerService.log("params",params);
      if (params) {
        this.labelName = params.id;
        this.getCard();
      }
    })
  }
  ngOnInit() {
    this.getCard();
  }
  getCard() {
    this.token = localStorage.getItem('token');/**get the token from the local storage */
    this.noteService.getcard()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      /**hitting the api by passing the url & token */
      this.arraynewdata = [];
      LoggerService.log("get cards list successfull", data);
      this.list=data['data'].data
      this.temp = this.list.reverse();/**reverse() method in typescript to display the data in reverse order */
      // console.log(this.temp);
      this.arraynewdata = [];/**Reinitializing the array so that data gets updated */
      for (var i = 0; i < this.list.length; i++)/**for loop to go through all cards*/ {
        if (this.list[i].isDeleted == false && this.list[i].isArchived == false)/**if cards are not deleted  */ {
          for (let index = 0; index < this.list[i].noteLabels.length; index++) {
            if (this.list[i].noteLabels[index].label == this.labelName) {
              this.arraynewdata.push(this.list[i]);/**then push those cards into the array */
            }
          }
        }
      }
      LoggerService.log( "array of new data",this.arraynewdata);/**display new array*/
    }),
      error => {/**if error occurs then display the error */
        LoggerService.log("error", error);
      }
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
