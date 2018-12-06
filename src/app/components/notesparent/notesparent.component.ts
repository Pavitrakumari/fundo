/************************************************************************************************
*  Execution       :   1. default node         cmd> notesparent.ts 
*        
*  Purpose         : To create,add,update & delete the notes 
* 
*  Description    
* 
*  @file           : notesparent.js
*  @overview       : To create,add,update & delete the notes
*  @module         : notesparent.ts - This is optional if expeclictly its an npm or local package
*  @author         : Pavitrakumari <pavithra.korapati@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
/**component has imports , decorator & class */
import { Component, OnInit,OnDestroy } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { NoteService } from '../../core/services/http/note/note.service';
import { Notes } from '../../core/models/notes';
import { LoggerService } from '../../core/services/logger/logger.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

/**A componenet can be reused throughout the application & even in other applications */
@Component({
  selector: 'app-notesparent',/**A string value which represents the component on browser at execution time */
  templateUrl: './notesparent.component.html',/**External templating process to define html tags in component */
  styleUrls: ['./notesparent.component.scss']/**It is used to provide style of components */
})
/**To use components in other modules , we have to export them */
export class NotesparentComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
loading;
  token;
  temp = [];
  arraynewdata = [];
  pinarraay=[];
  // list:Notes[]=[];
  list:Notes[]=[]

  constructor(private noteService:NoteService,public httpService: HttpService) { }
  /**it is a interface */
  /**OnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. */
  ngOnInit() {
    this.getCard();/**calling the getCard() to get the cards & display automatically when the component loads */
    this.getpincards();
console.log("checking notes parent................");

  }
  delete() {
    if (event) {
      this.getCard();
    }
  }
  get(event){
    if(event){
      this.getCard();
    }
  }
  getCard() {
this.loading=true;
    this.noteService.getcard()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      this.loading=false;
      this.list=data['data'].data
      this.temp = this.list.reverse();/**reverse() method in typescript to display the data in reverse order */
      // console.log(this.temp);
      this.arraynewdata = [];/**Reinitializing the array so that data gets updated */
      for (let i = 0; i < this.list.length; i++)/**for loop to go through all cards*/ {
        if (this.list[i].isDeleted == false && 
          this.list[i].isArchived == false &&
          this.list[i].isPined == false)/**if cards are not deleted  */ {
          this.arraynewdata.push(this.list[i]);/**then push those cards into the array */
        }
      }
    })
      
    }
  
getpincards(){

  this.noteService.getcard()
  .pipe(takeUntil(this.destroy$))
  .subscribe(data=>{
    this.pinarraay=[];
    for (let i = 0; i < this.list.length; i++){
      if(this.list[i].isPined == true){
        this.pinarraay.push(this.list[i]);
      }
    }
    
  })

}
pinNew(){
  if(event){
  this.getCard();
  this.getpincards();
  }
}
ngOnDestroy() {
  this.destroy$.next(true);
  // Now let's also unsubscribe from the subject itself:
  this.destroy$.unsubscribe();
}
}
