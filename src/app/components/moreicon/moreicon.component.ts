/************************************************************************************************
*  Execution       :   1. default node         cmd> moreicon.ts 
*        
*  Purpose         : To include the moreicon into the notes cards & perform delete operation
* 
*  Description    
* 
*  @file           : moreicon.js
*  @overview       : To include the moreicon into the notes cards & perform delete operation
*  @module         : moreicon.ts - This is optional if expeclictly its an npm or local package
*  @author         : Pavitrakumari <pavithra.korapati@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
/**component has imports , decorator & class */
import { MatDialog } from '@angular/material';
import { Component, Input, Output, EventEmitter, OnInit ,OnDestroy} from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { MatSnackBar } from '@angular/material';
import { AddlabelComponent } from '../addlabel/addlabel.component';
import { DeleteComponent } from '../delete/delete.component';
import { NoteService } from '../../core/services/http/note/note.service';
import { Notes, Label } from '../../core/models/notes';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

/**A componenet can be reused throughout the application & even in other applications */
@Component({
  selector: 'app-moreicon',
  /**A string value which represents the component on browser at execution time */
  templateUrl: './moreicon.component.html',
  /**External templating process to define html tags in component */
  styleUrls: ['./moreicon.component.scss']
  /**It is used to provide style of components */
})
export class MoreiconComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  public labelarray = [];
  selectarray1 = [];
  selectarray2 = [];
  public search: any = '';
  clicklist = false;
  model;
  disabled = false;
  notearray = [];
  isChecked;
  @Output() moreevent = new EventEmitter<any>();
  @Output() updateevent = new EventEmitter<any>();
  @Output() delevent = new EventEmitter<any>();
  @Output() checkevent = new EventEmitter<any>();
  /**Input and Output are two decorators in Angular responsible for communication between two components*/
  @Input() name;
  @Input() arrayofnotes;
  @Input() array;

  list:Label[]=[]
  list1:Label[]=[]
  constructor(private noteService:NoteService,public dialog: MatDialog, public httpService: HttpService, public snackBar: MatSnackBar) { }
  ngOnInit() { 
    console.log(this.arrayofnotes,"moreeeee");

  }
  deletecard() {/**method to delete the cards */
    try {
      console.log("pichii");
      console.log(this.arrayofnotes);
      let model = {
        "isDeleted": true,/**attributes to be passed to hit the api trashNotes */
        "noteIdList": [this.arrayofnotes]
      }/**hitting the api by passing the url & token */
      this.noteService.postTrashnotes( model)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        console.log("deleted card successfully", data);/**if error doesnot exist the display the result */
        this.snackBar.open("successfully deleted notes", "deleted", {
          duration: 10000,
        });
        this.moreevent.emit();/**to emit an event to the parent */
      })
    }
    catch (error) {
      console.log(error);
    }
  }
  restore() {/**method to delete the cards */
    try {
      console.log("pichii");
      console.log(this.arrayofnotes);
      let model = {
        "isDeleted": false,/**attributes to be passed to hit the api trashNotes */
        "noteIdList": [this.arrayofnotes]
      }/**hitting the api by passing the url & token */
      this.noteService.postTrashnotes( model)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        console.log("deleted card successfully", data);/**if error doesnot exist the display the result */
        this.snackBar.open("successfully deleted notes", "deleted", {
          duration: 10000,
        });
        this.delevent.emit();/**to emit an event to the parent */
      })
    }
    catch (error) {
      console.log(error);
    }
  }

  addlabel() {/**addlabel() method to open the add-label dialog box when it is clicked */
    this.dialog.open(AddlabelComponent, {/**open dialog  */
      width: '550px',
      height: 'auto',
      panelClass: 'myapp-no-padding-dialog'
    });
  }
  getLabels1() {
    this.noteService.getlabels()
      .subscribe(response => {
        this.labelarray = [];
        this.list1=response['data'].details
        console.log(this.list1);
        for (let i = 0; i < (this.list1).length; i++) {
          if (this.list1[i].isDeleted == false) {
            this.labelarray.push(this.list1[i])
          }
        }
        console.log(this.labelarray, "Label array printing success");
      }),
      error => {
        console.log("error in get LABELS", error);
      }
  }
  /**getLabels() method to get the labels */
  getLabels() {
    console.log(this.arrayofnotes.noteLabels);
    console.log("hellyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
    this.notearray = this.arrayofnotes.noteLabels;
    this.noteService.getlabels()
    .pipe(takeUntil(this.destroy$))
    .subscribe(response => {
        this.labelarray = [];
        this.list=response['data'].details
        console.log(this.list);
        for (let i = 0; i < (this.list).length; i++) {
          if (this.list[i].isDeleted == false) {
            this.labelarray.push(this.list[i])
          }
        }
        console.log(this.labelarray, "label array after pushingggg");

        for (let i = 0; i < this.labelarray.length; i++) {
          for (let j = 0; j < this.notearray.length; j++) {
            if (this.labelarray[i].id == this.notearray[j].id) {
              this.labelarray[i].isChecked = true;
              console.log(this.labelarray[i].isChecked, "ischecked became true");
            }
            console.log("noooooooooooooooooooooooooooooooooooooooooo");
          }
        }
        console.log(this.labelarray, "Label array printing success");
      }),
      error => {
        console.log("error in get LABELS", error);
      }
  }
  getlabellist(label) {/**adding labels to notes */
    try {
      console.log("selected label is : ", label);
      console.log([this.arrayofnotes['id']]);
      console.log(label);
      /**setting the url path */
      {
        console.log("add function .......");
        let noteDetails = {
          "label": "string",
          "isDeleted": false,
          "userId": "string"

        }/**hitting the api by passing the url & token & empty body*/
      // let url = "notes/" + [this.arrayofnotes['id']] + "/addLabelToNotes/" + label + "/add";
        this.noteService.postAddLabelnotesAdd([this.arrayofnotes],label, noteDetails)
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => {
          /** In angular subscribe is used with Observable*/
          console.log("success in get label list", data);/**if success then display the data */
          this.moreevent.emit(label);/**to emit an event to the parent */
          this.updateevent.emit();/**emit an event to the parent */
        }),
          error => {/**if error exists then display the errror */
            console.log("error in get label list", error);
          }
      }
    }
    catch (error) {
      console.log(error);
    }
  }
  clickFunc(temp) {
    if (!this.selectarray2.some((data) => data == temp.label)) {
  
      this.selectarray1.push(temp.id);
      this.selectarray2.push(temp.label);
      this.getlabellist(temp);
    }
    else {
      const index = this.selectarray2.indexOf(temp.label, 0);
      if (index > -1) {
        this.selectarray2.splice(index, 1);
      }
    }
  }
  func(labelOption){
    console.log(this.arrayofnotes);
    
    if (this.arrayofnotes.noteLabels.some((data) => data.label == labelOption.label)) {
    return true;
    }
    else {

     return false;
  }
  }

  trashforever() {/**method to delete the cards permanently from the trash */
    const dialogRef = this.dialog.open(DeleteComponent, {/**open the dialogref */
      width: '500px',
      panelClass: 'myapp-no-paddding-dialog',
      data: { name: 'trash' }/**assigning the data with name as trash */
    });
    dialogRef.afterClosed().subscribe(data => {
      console.log('The dialog was closed');
      if (data) {/**if data exists then */
        this.model = {/**passing the model attributes */
          "isDeleted": true,
          "noteIdList": [this.arrayofnotes]/**passing the noteidlist from the cards */
        }
        console.log(this.model, "model in trash");/**display the model */
        this.noteService.postDeleteForeverNotes( this.model)
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => {
          console.log(data, "success in trash");/**success in trash */
          this.delevent.emit();/**emit the event to */
          this.snackBar.open("note deleted  permanently", "trash", {
            duration: 10000,
          });
        }),
          error => {
            console.log(error, "error in trashing");
          }
      }
    });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
