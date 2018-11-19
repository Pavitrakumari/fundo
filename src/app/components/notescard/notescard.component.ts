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
import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { DataService } from '../../core/services/data/data.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { state } from '@angular/animations';
import { LoggerService } from '../../core/services/logger/logger.service';
import { NoteService } from '../../core/services/http/note/note.service';
/**A componenet can be reused throughout the application & even in other applications */
@Component({
  selector: 'app-notescard',/**A string value which represents the component on browser at execution time */
  templateUrl: './notescard.component.html',/**External templating process to define html tags in component */
  styleUrls: ['./notescard.component.scss']/**It is used to provide style of components */
})
/**To use components in other modules , we have to export them */
export class NotescardComponent implements OnInit {
  /**To be able to use our output we need to import & bind a new instance of the event emitter to it */
  @Output() noteevent = new EventEmitter<any>();
  @Output() colorevent = new EventEmitter<any>();
  @Output() archiveevent = new EventEmitter<any>();
  @Output() unarchiveevent = new EventEmitter<any>();
  @Output() updateevent = new EventEmitter<any>();
  @Output() remm = new EventEmitter<any>();
  @Output() newPin = new EventEmitter<any>();
  @Output() state = new EventEmitter<any>();

  @Output() deleted = new EventEmitter<any>();
  @Input() name;
  @Input() string;
  @Input() length;

  // @Inp[ut() pinevent]
  @Input() myData;
  condition = true;
  @Input() searchInput
  token = localStorage.getItem('token')
  constructor(private noteService:NoteService,public httpService: HttpService, public dialog: MatDialog, public dataService: DataService) {
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
  ngOnInit() { }
  receive(event) {/**callback will be invoked &data associated with the event will be given to us via $event property */
    this.noteevent.emit();
  }
  public checked=false;
  color(event) {/**callback will be invoked &data associated with the event will be given to us via $event property */
    this.colorevent.emit();
  }
  archive(event) {/**callback will be invoked &data associated with the event will be given to us via $event property */
    this.archiveevent.emit();
  }
  reminder(event) {/**callback will be invoked &data associated with the event will be given to us via $event property */
    this.remm.emit();
  }

  unarchive(event) {/**callback will be invoked &data associated with the event will be given to us via $event property */
    this.unarchiveevent.emit();
  }
  new(event) {/**callback will be invoked &data associated with the event will be given to us via $event property */
    this.newPin.emit();
  }
  funclabel(event){
    this.dataService.labelChange(event)
  }
  trash(event) {
    this.deleted.emit();
  }
public todaydate=new Date();
public tomorrow=new Date(this.todaydate.getFullYear(), this.todaydate.getMonth(), this.todaydate.getDate() + 1)
checkReminder(date){/**function */
  var savedReminder=new Date().getTime();
  var value=new Date(date).getTime();
  if(value > savedReminder){
return true;
  }
  else false;
}

  openDialog(dialogdata): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '550px',/**width of the dialog box */
      data: dialogdata,/**paramaeter that we are passing */
      panelClass: 'myapp-no-padding-dialog'/**to change the padding in dialog box */
    });
    const sub = dialogRef.componentInstance.eventOne.subscribe((data) => {
      console.log("sub", data);
      this.updateevent.emit();
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.updateevent.emit();/**emit an event to the parent */
    });
  }
  removelabel(label,note) {/**passing the label id & note id */
    try {
      console.log(note,label);/**displaying the id's */
      this.noteService.postdeletecard("notes/" + note + "/addLabelToNotes/" + label + "/remove", null, this.token)
        .subscribe(data => {/**using the observabel subscribe using callbackk */
          console.log("success in remove label", data);/**if success then display the result */
          this.updateevent.emit();/**emit an event to the parent */
        }),
        error => {/**if error exists */
          console.log("error in remove", error);/**then display the error */
        }
    }
    catch (error) {
      console.log(error);
    }
  }
  removereminder(noteid) {
    var body={
      "noteIdList":[noteid],

    }
    this.noteService.postdeletecard('/notes/removeReminderNotes', body,this.token)
      .subscribe(data => {
        console.log("success in remove reminders ",data);
        this.updateevent.emit();
      })
    error => {
      console.log("error in remove reminders",error)
    }
  }

  getReminder() {
    this.noteService.getcard('/notes/getReminderNotesList', this.token)
      .subscribe(data => {
        console.log("success in get reminders ",data);
        // this.updateevent.emit();
        this.remm.emit();
      })
    error => {
      console.log("error in get reminders",error)
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
    console.log(checklist);
    this.modifiedCheckList = checklist;
    this.updatelist(index);
  }
  updatelist(id){
    var checklistData = {
      "itemName": this.modifiedCheckList.itemName,
      "status": this.modifiedCheckList.status
    }
    var url = "notes/" + id + "/checklist/" + this.modifiedCheckList.id + "/update";
    this.noteService.postdeletecard(url, JSON.stringify(checklistData),this.token).subscribe(response => {
      console.log("success in update checklists",response);

    }),
    error=>{
      LoggerService.log("errror in update checklists............",);
      
    }
  }



}



