/************************************************************************************************
*  Execution       :   1. default node         cmd> notescard.ts 
*        
*  Purpose         : To add the cards down & display the collection of cards after the click of close button
* 
*  Description    
* 
*  @file           : notescard.js
*  @overview       : To add the cards down & display the collection of cards after the click of close button
*  @module         : notescard.ts - This is optional if expeclictly it's an npm or local package
*  @author         : Pavitrakumari <pavithra.korapati@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
/**component has imports , decorator & class */
import { Component, Input, EventEmitter, OnInit, Output,OnDestroy } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { MatDialog} from '@angular/material';
import {Notes} from '../../core/models/notes'
import { DialogComponent } from '../dialog/dialog.component';
import { DataService } from '../../core/services/data/data.service';
import { LoggerService } from '../../core/services/logger/logger.service';
import { NoteService } from '../../core/services/http/note/note.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DialogcollaboratorComponent } from '../dialogcollaborator/dialogcollaborator.component';
/**A componenet can be reused throughout the application & even in other applications */
@Component({
  selector: 'app-notescard',/**A string value which represents the component on browser at execution time */
  templateUrl: './notescard.component.html',/**External templating process to define html tags in component */
  styleUrls: ['./notescard.component.scss']/**It is used to provide style of components */
})
/**To use components in other modules , we have to export them */
export class NotescardComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  /**To be able to use our output we need to import & bind a new instance of the event emitter to it */
  @Output() noteevent = new EventEmitter<any>();
  @Output() colorevent = new EventEmitter<any>();
  @Output() archiveevent = new EventEmitter<any>();
  @Output() unarchiveevent = new EventEmitter<any>();
  @Output() pavitra = new EventEmitter<any>();
  @Output() updateevent = new EventEmitter<any>();
  @Output() remm = new EventEmitter<any>();
  
  @Output() testreminder = new EventEmitter<any>();

  @Output() newPin = new EventEmitter<any>();
  @Output() state = new EventEmitter<any>();
  @Output() deleted = new EventEmitter<any>();
  @Input() name;
  @Input() string;
  @Input() length;
  @Input() myData;
  collaborators=[];
  condition = true;
  @Input() searchInput;
   list:Notes[]=[];
  constructor(private noteService:NoteService,public httpService: HttpService, 
    public dialog: MatDialog, public dataService: DataService) {
    this.dataService.currentMessage2.subscribe(message => {
      console.log(message);
      if (message) {
        this.updateevent.emit();
      }
    }),
      this.dataService.currentMessage3.subscribe(data => {
        this.condition = data;
      })
  }
  checkicon = [];
  /**Input and Output are two decorators in Angular responsible for communication between two components*/
  /**myData is a varaible */
  /**it is a interface */
  /**OnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. */
  ngOnInit() {


   }
  receive(event) {/**callback will be invoked &data associated with the event will be given to us via $event property */
    this.noteevent.emit();
  }
  public checked=false;
  color(event) {/**callback will be invoked &data associated with the event will be given to us via $event property */
    this.colorevent.emit();
    this.pavitra.emit();
  }
  archive(event) {/**callback will be invoked &data associated with the event will be given to us via $event property */
    this.archiveevent.emit();
  }
  reminder(event) {
    /**callback will be invoked &data associated with the event will be given to us via $event property */
   if(event){

   
    this.remm.emit(event);
    this.pavitra.emit();
   }
    // this.testreminder.emit(event)
  }

  unarchive(event) {/**callback will be invoked &data associated with the event will be given to us via $event property */
    this.unarchiveevent.emit();
    this.pavitra.emit();

  }
  pinunpin(event) {/**callback will be invoked &data associated with the event will be given to us via $event property */
    this.pavitra.emit();
  }
  funclabel(event){
    this.dataService.labelChange(event);
    this.pavitra.emit();

  }
  trash(event) {
    this.pavitra.emit();

    this.deleted.emit();
  }
public todaydate=new Date();
public tomorrow=new Date(this.todaydate.getFullYear(), this.todaydate.getMonth(), this.todaydate.getDate() + 1)
checkReminder(date){/**function */
  let savedReminder=new Date().getTime();
  let value=new Date(date).getTime();
  if(value > savedReminder){
return true;
  }
  else 
  return false;
}
openDialog(dialogdata): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '550px',/**width of the dialog box */
      // height:'350px',
      data: dialogdata,/**paramaeter that we are passing */
      panelClass: 'myapp-no-padding-dialog'/**to change the padding in dialog box */
    });
     dialogRef.componentInstance.eventOne.subscribe((data) => {
      this.updateevent.emit();
      this.pavitra.emit();
  })
  dialogRef.afterClosed().subscribe(result => {
      this.updateevent.emit();/**emit an event to the parent */
      this.pavitra.emit();
    });
  }
removelabel(label,note) {/**passing the label id & note id */
try {
      this.noteService.postAddLabelnotesRemove(label,note,{})
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {/**using the observabel subscribe using callbackk */
          this.updateevent.emit();/**emit an event to the parent */
          this.pavitra.emit();

        })
        
    }
catch (error) {
      console.log(error);
    }
  }
  removereminder(noteid) {
try{
  let body={
      "noteIdList":[noteid],

    }
    this.noteService.postRemoveReminders( body)
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
        this.updateevent.emit();
        // this.pavitra.emit();
      })
    
  }
catch(error){
  LoggerService.log(error)
}}

  getReminder() {
try{
    this.noteService.getreminders()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
        // this.updateevent.emit();
        this.remm.emit();
        this.pavitra.emit();

      })
    
  }
catch(error){
    LoggerService.log(error)
  }
}
  public modifiedCheckList
  checkBox(checklist,index) {

    if (checklist.status == "open") {
      checklist.status = "close"
    }
    else {
      checklist.status = "open"
    }
    this.modifiedCheckList = checklist;
    this.updatelist(index);
  }
  updatelist(id){
try{
  let checklistData = {
      "itemName": this.modifiedCheckList.itemName,
      "status": this.modifiedCheckList.status
    }
    this.noteService.postUpdateChecklist(id,this.modifiedCheckList.id ,JSON.stringify(checklistData))
    .pipe(takeUntil(this.destroy$))
    .subscribe(response => {
      this.pavitra.emit();
})
    
  }
catch(error){
    LoggerService.log(error);
  }
}
open(note){
  this.dialog.open(DialogcollaboratorComponent, {/**open dialog  */
   width: '500px',
   data:note,
   height:'auto',
    panelClass: 'myapp-no-padding-dialog' 
});}
ngOnDestroy() {
  this.destroy$.next(true);
  // Now let's also unsubscribe from the subject itself:
  this.destroy$.unsubscribe();
}
}



