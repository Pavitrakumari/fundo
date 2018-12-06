/************************************************************************************************
*  Execution       :   1. default node         cmd> dialog.ts 
*        
*  Purpose         : To popup the dialog box when clicked on the notes 
* 
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
import { Component, Output, EventEmitter, OnInit, Inject, Input,OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { HttpService } from '../../core/services/http/http.service';
import { MatSnackBar } from '@angular/material';
import { LoggerService } from '../../core/services/logger/logger.service';
import { DataService } from '../../core/services/data/data.service';
import { NoteService } from '../../core/services/http/note/note.service';
import { Notes, Checklists } from '../../core/models/notes';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DialogcollaboratorComponent } from '../dialogcollaborator/dialogcollaborator.component';

/**A componenet can be reused throughout the application & even in other applications */
export interface DialogData {
  "title": String,
  "description": String,
  // "notesIdList":[],
  "color": String
}
/**To use components in other modules , we have to export them */
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit ,OnDestroy{
  destroy$: Subject<boolean> = new Subject<boolean>();

  public title;
  public note;
  public tempArray=[];
  public newList;
  list:Checklists[]=[]
  list2:Notes[]=[]
  collaborators=[];
  public newData:any={}
  public modifiedCheckList;
  public bgcolor=this.data.color;
  selectarray1 = [];
  selectarray2 = [];
  public id;
  color;
  collab=false;
collabReq=[];
  noteid={'isArchived':false}
  public checklist=false;
  public noteLabels;
  constructor(
    public dialog: MatDialog,
    private noteService:NoteService,
    public dialogRef: MatDialogRef<DialogComponent>,
    public dataService: DataService, public httpService: HttpService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    this.dataService.currentMessage2.subscribe(message => {
      console.log(message);
      if (message) {
        this.updateevent.emit();
        this.pavitra.emit();

      }
    })
  }
  @Output() pavitra = new EventEmitter<any>();

  @Input() reminders;
  @Output() updateevent = new EventEmitter<any>();
  // @Output() pavitra = new EventEmitter<boolean>();

  @Output() eventOne = new EventEmitter<boolean>();
  onNoClick(): void {
    this.dialogRef.close();
  }
  pinunpin(event) {/**callback will be invoked &data associated with the event will be given to us via $event property */
    this.pavitra.emit();
  }
  
  /**it is a interface */
  /**OnInit is a lifecycle hook that is called after Angular has initialized
   *  all data-bound properties of a directive. */
ngOnInit() {
  // this.updateNotes();

  // for(let i=0 ;i<this.data['collaborators'].length;i++){
  //   this.collaborators.push(this.data['collaborators'][i]);
    
  //   }

  this.pavitra.emit();

  // LoggerService.log(this.data['noteLabels'], "maaaa");
    this.selectarray1 = this.data['noteLabels'];
    this.selectarray2 = this.data['reminder'];
    this.color = this.data['color'];
    if (this.data['noteCheckLists'].length>0){
      // LoggerService.log(this.data['noteCheckLists'],"update check lists in dialog for checking............");
      this.checklist=true;
    }
    this.tempArray=this.data['noteCheckLists'];
  }
  more(label) {
    this.selectarray1.push(label);
    this.pavitra.emit();

  }
  close() {
    this.updateNotes();
    this.pavitra.emit();
    this.updateevent.emit();


  }
  // pinunpin(event) {/**callback will be invoked &data associated with the event will be given to us via $event property */
  //   // this.pavitra.emit();
  // }
  updateNotes() {
    
    if(this.checklist==false){
      // LoggerService.log(this.data['id']);
      let id = this.data['id']
    /**The innerHTML property sets or returns the HTML content (inner HTML) of an element. */
    this.title = document.getElementById('title').innerHTML;
    this.note = document.getElementById('note').innerHTML;
    /**document.getElementById() method returns the element of specified id */
    var body = {
      "noteId": [id],/**attributes to be passed to change the color of notes */
      "title": this.title,
      "description": this.note,
      "reminder":this.array,
      "collaberators":this.collaborators
    }
// console.log("bodyyyyyy updatee  ",body);

    this.noteService.updatenotes(body)
    // .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      console.log("success in normal update",data);
      this.updateevent.emit();

      this.snackBar.open("update change success", "success", {/**snackbar to display the result */
        duration: 10000,/**duaration of the snackbar to be opened */
      })
      // this.updateevent.emit();
     
    })
    
  }
  else{/**if add note is for checklist,then it executes the else part */
    let apiData={/**Attributes to be passed for hitting the api */
      "itemName": this.modifiedCheckList.itemName,
      "status":this.modifiedCheckList.status
    }
    // this.color=#ffffff;
    // let url = this.url+"notes/" + id + "/checklist/" + modifiedid + "/update";

    this.noteService.postUpdateChecklist(this.data['id'], this.modifiedCheckList.id ,
    JSON.stringify(apiData))
    .pipe(takeUntil(this.destroy$))
    .subscribe(response => {
      LoggerService.log("else part.......................",response);
    })
    
  }
}
editing(editedList,event){
    if(event.code=="Enter"){
    this.modifiedCheckList=editedList;
    this.updateNotes();
    }
    }
    public array=[]
    
reminderevent(event)  {
      var flag=false,index;
       this.array=[];
       if(event)
       {
           flag=true;
           index=1;
           this.array.push(event);
          }
         if(flag==true){
              this.array.splice(index,1)
    }
  }

checkBox(checkList){
    if (checkList.status=="open"){
      checkList.status = "close"
    }
    else{
      checkList.status = "open"
    }
    this.modifiedCheckList=checkList;
    this.updateNotes();
  }
  public removedList;
  removeList(checklist){/**method to remove the check lists */
    this.removedList=checklist;/**move them into the remove list */
    this.removeCheckList()/**calling the removechecklist function */
  }
  removeCheckList(){/**function to remove the check lists */

  let body={}
    this.noteService.postChecklistRemove(this.data['id'],this.removedList.id ,body)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response)=>{
      LoggerService.log("response",response);
      for(let i=0;i<this.tempArray.length;i++){/**run the for loop for the complete length of the temparray which consists of checklists */
        if(this.tempArray[i].id==this.removedList.id){/**if they are matching  with id's */
          this.tempArray.splice(i,1)/**then splice them from the array */
        }
      }
    })
  
}
  public adding=false;
  public addCheck=false;
  public status="open"
  addList(event){
try{
    if(this.newList!=""){/**if newList[] is not empty then  */
      this.adding = true;/**adding becomes true */
    }
   else{/**else adding becomes false */
      this.adding = false;
   }
    if (event.code == "Enter") {/**if enter is pressed */
      if(this.addCheck==true){/**if addingCheck variable is true */
        this.status="close";/**then status is assigned as close */
      }
      else{/**else status is assigned as open */
        this.status="open"
      }
      this.newData={/**attributes to be passed for  adding the checklists*/
        "itemName":this.newList,
        "status":this.status
      }
      LoggerService.log(this.newData,"newwwwwww dataaaaaaaaaaaa");
      console.log("9603273",this.newData);
      
      this.noteService.postCheckListAdd(this.data['id'], this.newData)
      // .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        LoggerService.log("response",response);
      this.newList=null;
      this.addCheck=false;
      this.adding=false;
      this.list=response['data'].details
      LoggerService.log("response ",response['data'].details);/**push the response into the tempArray */
      this.tempArray.push(response['data'].details)
    })
  }
}
catch(error){
  LoggerService.log(error);
}
}
emit(event){
    this.bgcolor=event
}
  removelabel(label, note) {/**passing the label id & note id */
try {
  LoggerService.log(note, label);/**displaying the id's */
      this.noteService.postAddLabelnotesRemove(label.id ,note, {})
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {/**using the observabel subscribe using callbackk */
          LoggerService.log("success in remove label", data);
          /**if success then display the result */
          this.eventOne.emit(true);
          const index = this.selectarray1.indexOf(label, 0);
          if (index > -1) {
            this.selectarray1.splice(index, 1);
          }
        })
        this.updateevent.emit();
        this.pavitra.emit();

      
    }
catch (error) {
  LoggerService.log(error);
    }
  }
 
  changeColor(event) {

    this.color = event;

  }
removereminder(item,noteid) {/**function to remove reminders */
try{
  let body={/**passing the attributes to the body */
      "noteIdList":[noteid],
    }/**hit the api by passing the parameters url,body,token */
    this.noteService.postRemoveReminders( body)
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
        this.eventOne.emit(true);/**emitting the event */
        const index = this.selectarray2.indexOf(item,0);
        if (index > -1) {/**if index is greater than -1 then remove those index's from the selectarray2 */
          this.selectarray2.splice(index, 1);
        }
        this.updateevent.emit();/**emitting the event */
      })
      
  }
catch(error){/**if error exists then handle the errors*/
  LoggerService.log(error);
}
}
// opencololab(note){
//   this.dialog.open(DialogcollaboratorComponent, {/**open dialog  */
//    width: '500px',
//    maxWidth:'auto',
//    data:note,
//    height:'auto',
//     panelClass: 'myapp-no-padding-dialog' 
// });}

ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
