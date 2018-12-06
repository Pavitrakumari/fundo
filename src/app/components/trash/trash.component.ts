/************************************************************************************************
*  Execution       :   1. default node         cmd> trash.ts 
*        
*  Purpose         : To move the deleted cards to trash
* 
*  Description    
* 
*  @file           : trash.ts
*  @overview       : To move the deleted cards to trash
*  @module         : trash.ts - This is optional if expeclictly its an npm or local package
*  @author         : Pavitrakumari <pavithra.korapati@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
import { Component, OnInit,OnDestroy } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { NoteService } from '../../core/services/http/note/note.service';
import { Notes } from '../../core/models/notes';
import { LoggerService } from '../../core/services/logger/logger.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  token = localStorage.getItem('token');
  myData = [];
  name = 'trash';
  list:Notes[]=[]
  loading: boolean;
  constructor(private noteService:NoteService,public httpService: HttpService) { }
  ngOnInit() {
    this.getcard();
  }
  getcard() {
    this.loading=true;

    this.noteService.getcard()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      /**hitting the api by passing the url & token*/
      this.list=data['data'].data
      this.myData = data['data'].data.reverse();/**reverse() method in typescript to display the data in reverse order */
      this.myData = [];
      for (let i = 0; i < this.list.length - 1; i++) {
        if (this.list[i].isDeleted == true) {
          this.myData.push(this.list[i]);
        }
      }
      this.loading=false;

    })
  

  }
  carddel(event) {
    this.getcard();

  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}

