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
import { Component, Output, EventEmitter, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpService } from '../../core/services/http/http.service';
import { MatSnackBar } from '@angular/material';
import { DataService } from '../../core/services/data/data.service';
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
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  public title;
  public note;
  public tempArray=[];
  public newList;
  public newData:any={}
  public modifiedCheckList;
  public bgcolor=this.data.color;
  selectarray1 = [];
  selectarray2 = [];
  public id;
  noteid={'isArchived':false}
  public checklist=false;
  public noteLabels;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    public dataService: DataService, public httpService: HttpService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    this.dataService.currentMessage2.subscribe(message => {
      console.log(message);
      if (message) {
        this.updateevent.emit();
      }
    })
  }
  @Output() updateevent = new EventEmitter<any>();
  @Output() eventOne = new EventEmitter<boolean>();
  onNoClick(): void {
    this.dialogRef.close();
  }
  token = localStorage.getItem('token');/**get the token from local storage */
  /**it is a interface */
  /**OnInit is a lifecycle hook that is called after Angular has initialized
   *  all data-bound properties of a directive. */
  ngOnInit() {
    console.log(this.data['noteLabels'], "maaaa");
    this.selectarray1 = this.data['noteLabels'];
    this.selectarray2 = this.data['reminder'];

    if (this.data['noteCheckLists'].length>0){
      console.log(this.data['noteCheckLists'],"update check lists in dialog for checking............");
      
      this.checklist=true;
    }
    this.tempArray=this.data['noteCheckLists'];

console.log(this.selectarray2);
console.log(this.tempArray,"temp araryyyyyy");


  }
  more(label) {
    this.selectarray1.push(label);
  }
  close() {
    this.updateNotes();
    /**calling the update method after entering the data & closing the card */
  }
  updateNotes() {
    if(this.checklist==false){
      console.log(this.data['id']);
    var id = this.data['id']
    /**The innerHTML property sets or returns the HTML content (inner HTML) of an element. */
    this.title = document.getElementById('title').innerHTML;
    this.note = document.getElementById('note').innerHTML;
    /**document.getElementById() method returns the element of specified id */
    var body = {
      "noteId": [id],/**attributes to be passed to change the color of notes */
      "title": this.title,
      "description": this.note,
    }
    this.httpService.postpassword("notes/updateNotes", body, this.token).subscribe(data => {
      console.log("update changes successfully", data);/**if no errors then display the data */
      this.snackBar.open("update change success", "success", {/**snackbar to display the result */
        duration: 10000,/**duaration of the snackbar to be opened */
      });
    })
  }
  else{
    console.log("runnin else.........just .............");
    var apiData={
      "itemName": this.modifiedCheckList.itemName,
      "status":this.modifiedCheckList.status
  }
  var url = "notes/" + this.data['id'] + "/checklist/" + this.modifiedCheckList.id + "/update";
  this.httpService.postdeletecard(url, JSON.stringify(apiData), this.token).subscribe(response => {
    console.log("else part.......................",response);
  }),
  error=>{
    console.log("else paer errorrrrr",error);
    }
 }
error => {
        console.log("error in update", error);/**if error exists then display the error */
        this.snackBar.open("update change failed", "error", {/**snackbar to display the result */
          duration: 10000,
        });
      }
  }
editing(editedList,event){
  console.log(editedList);
    if(event.code=="Enter"){
    this.modifiedCheckList=editedList;
    this.updateNotes();
    }
    }
checkBox(checkList){
    if (checkList.status=="open"){
      checkList.status = "close"
    }
    else{
      checkList.status = "open"
    }
    console.log(checkList);
    this.modifiedCheckList=checkList;
    this.updateNotes();
  }
  public removedList;
  removeList(checklist){
    console.log(checklist)
    this.removedList=checklist;
    this.removeCheckList()
  }
  removeCheckList(){
    var url = "notes/" + this.data['id']+ "/checklist/" + this.removedList.id + "/remove";

    this.httpService.postdeletecard(url,null,this.token).subscribe((response)=>{
      console.log(response);
      for(var i=0;i<this.tempArray.length;i++){
        if(this.tempArray[i].id==this.removedList.id){
          this.tempArray.splice(i,1)
        }
      }
    })
  }
  public adding=false;
  public addCheck=false;
  public status="open"
  addList(event){
    if(this.newList!=""){
      this.adding = true;
    }
   else{
      this.adding = false;
   }
    if (event.code == "Enter") {
      if(this.addCheck==true){
        this.status="close";
      }
      else{
        this.status="open"
      }
      this.newData={
        "itemName":this.newList,
        "status":this.status
      }
      console.log(this.newData,"newwwwwww dataaaaaaaaaaaa");
      
  var url = "notes/" + this.data['id'] + "/checklist/add";

    this.httpService.postdeletecard(url, this.newData, this.token)
    .subscribe(response => {
      console.log(response);
      this.newList=null;
      this.addCheck=false;
      this.adding=false;
      console.log(response['data'].details);
      
      this.tempArray.push(response['data'].details)

      console.log(this.tempArray)

    })
  }
  }

  emit(event){

    this.bgcolor=event
  }
  










  removelabel(label, note) {/**passing the label id & note id */
    try {
      console.log(note, label);/**displaying the id's */
      this.httpService.postdeletecard("notes/" + note + "/addLabelToNotes/" + label.id + "/remove", null, this.token)
        .subscribe(data => {/**using the observabel subscribe using callbackk */
          console.log("success in remove label", data);
          /**if success then display the result */
          this.eventOne.emit(true);
          const index = this.selectarray1.indexOf(label, 0);
          if (index > -1) {
            this.selectarray1.splice(index, 1);
          }
        }),
        this.updateevent.emit();
      error => {/**if error exists */
        console.log("error in remove", error);/**then display the error */
      }
    }
    catch (error) {
      console.log(error);
    }
  }
  removereminder(item,noteid) {
    var body={
      "noteIdList":[noteid],

    }
    this.httpService.postdeletecard('/notes/removeReminderNotes', body,this.token)
      .subscribe(data => {
        console.log("success in remove reminders ",data);
        this.eventOne.emit(true);

        const index = this.selectarray2.indexOf(item,0);
        console.log(item,"pivjiiii");
        
        if (index > -1) {
          this.selectarray2.splice(index, 1);
        }
        this.updateevent.emit();

    })

    error => {
      console.log("error in remove reminders",error)
    }
  }
}
