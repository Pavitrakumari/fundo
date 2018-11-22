/************************************************************************************************
*  Execution       :   1. default node         cmd> createnewlabel.ts 
*        
*  Purpose         : To create, 
*  Description    
* 
*  @file           : dialog.ts
*  @overview       : To popup the dialog box when clicked on the notes
*  @module         : dialog.ts - This is optional if expeclictly its an npm or local package
*  @author         : Pavitrakumari <pavithra.korapati@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
/**component has imports , decorator & class */
import { Component, OnInit, Inject, Input,OnDestroy, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpService } from '../../core/services/http/http.service';
import { DataService } from '../../core/services/data/data.service';
import { NoteService } from '../../core/services/http/note/note.service';
import { Notes } from '../../core/models/notes';
import { LoggerService } from '../../core/services/logger/logger.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

/**A componenet can be reused throughout the application & even in other applications */
@Component({
  selector: 'app-createnewlabel',
  templateUrl: './createnewlabel.component.html',
  styleUrls: ['./createnewlabel.component.scss']
})
export class CreatenewlabelComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
 
  public labelarray = [];
  list:Notes[]=[]

  constructor(private noteService:NoteService,public dialogRef:
     MatDialogRef<CreatenewlabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public httpservice: HttpService, public dataService: DataService) {
  }
  @Output() updateevent = new EventEmitter<any>();
  @ViewChild('myDiv') myDiv: ElementRef;
  /**it is a interface */
  /**OnInit is a lifecycle hook that is called after Angular has initialized all 
   * data-bound properties of a directive. */
  ngOnInit() {
    this.getLabels();
  }
  public search: any = '';
  editClick;
  editable;
  editLabel;
  editId;
  editDoneIcon;
  editDiv;
  public editclick = false;
 
  onClose(): void {
    this.dialogRef.close();
  }
  clear() {
    this.label = '';
  }
  done() {
    this.addLabel();
    this.getLabels();
    this.clear();
  }
  public label;
  changeText = false
  addLabel() {
try {
  let label = this.label;
      console.log(this.labelarray);
      for (let i = 0; i < this.labelarray.length; i++) {
        if (this.labelarray[i].label == label) {
          alert("duplicate")
          return false;
        }
      }
      this.noteService.postNoteLabels( {
        "label": this.label,
        "isDeleted": false,
        "userId": localStorage.getItem('userId')
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        LoggerService.log("success in createpostlabel", response)
      }),
        error => {
          LoggerService.log("error in create/add postlabel", error)
        }
    }
catch (error) {
  LoggerService.log(error);
    }
  }
  getLabels() {
try {
      this.noteService.getlabels()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.labelarray = [];
          this.list=data['data'].details
          LoggerService.log("data details",this.list);
          for (let i = 0; i < (this.list).length; i++) {
            /**running for loop for the length of the array */
            if (this.list[i].isDeleted == false) {
              /**if label is not deleted then get the labels */
              this.labelarray.push(this.list[i]);
            }/**pushing labels into an array */
          }
          LoggerService.log( "Label array printing successsss",this.labelarray);
          this.updateevent.emit();/**emit an event to the parent */
        }),
        error => {/**if error exists then display the array */
          LoggerService.log("error in get LABELS", error);
        }
    }
catch (error) {
      
      LoggerService.log(error);
    }
  }
  delete(labelid) {/**delete() method to delete the labels from the list */
try {
      LoggerService.log(labelid, "label id");
      this.noteService.deletedata( labelid)
      .pipe(takeUntil(this.destroy$))

        .subscribe(response => {
          /** In angular subscribe is used with Observable*/
          LoggerService.log("success in delete labels ", response);
          /**if success exists then display the success */
          this.dataService.changeMessage2(true)
          this.getLabels();
        }),
        error => {/**if error exists then display the error */
          LoggerService.log("erroe in deelete", error);
        }
    }
catch (error) {
      LoggerService.log(error);
    }
  }
  edit(label) {
    this.editClick = true;
    this.editId = label.id;
    this.editLabel = label.label;
    this.editDoneIcon = false;
    this.editable = true;
    LoggerService.log(this.editClick)
  }
  editlabel(label) {/**editlabel() method to edit the labels */
try {
      this.editDoneIcon = true;
      this.editClick = false;
      this.editable = false;
      this.noteService.postUpdateNotelabel( label.id,
        {
        "label": this.myDiv.nativeElement.innerHTML,
        "isDeleted": false,/**attributes */
        "id": label.id,
        "userId": localStorage.getItem('userId')
      }).pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        LoggerService.log("success in edit labell ..........", response)
        this.dataService.changeMessage2(true)
        this.getLabels();
        this.updateevent.emit();
        /**emit an event to the parent */
      }), error => {
        LoggerService.log("error in edit label...........", error)
      }
    }
catch (error) {
      LoggerService.log(error);
    }
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}