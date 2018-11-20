import { Component, OnInit ,Input,OnDestroy,Output,EventEmitter} from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { NoteService } from '../../core/services/http/note/note.service';
import { Notes } from '../../core/models/notes';
import { LoggerService } from '../../core/services/logger/logger.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss']
})
export class RemindersComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  token;
  @Output() removeremindevent = new EventEmitter<any>();

  temp2=[];
  list:Notes[]=[]

  constructor(private noteService:NoteService,public httpService:HttpService) { }
  sortedItems :any
    ngOnInit() {
    this.getReminder();
  }
  reminder(event) {
    this.getReminder();
  }


  getReminder() {
    try{
    this.token = localStorage.getItem('token');/**get the token from the local storage */

    this.noteService.getcard()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
        LoggerService.log("success in get reminders ",data);
  this.list= data['data'].data
        for(var i = 0; i <this.list.length; i++){
          this.temp2.push(this.list[i]);
          // this.sortedItems=temp2;
          this.sortedItems = this.temp2.sort((a: any, b: any) =>
          new Date(a.reminder).getTime() - new Date(b.reminder).getTime()
      );
  
          this.removeremindevent.emit();

        }
      })
    error => {
      LoggerService.log("error in get reminders",error)
    }
  }
  catch(error){
    LoggerService.log(error)
  }
}
ngOnDestroy() {
  this.destroy$.next(true);
  // Now let's also unsubscribe from the subject itself:
  this.destroy$.unsubscribe();
}
}
