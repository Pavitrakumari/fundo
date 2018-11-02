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
import { Component,Output,EventEmitter, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpService } from '../../services/http.service'
import { MatSnackBar } from '@angular/material';
import { DataService } from '../../services/data.service';
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
  selectarray1=[];
  selectarray2=[];
  public id;
  public noteLabels;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,public dataService:DataService, public httpService: HttpService, public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

      this.dataService.currentMessage2.subscribe(message=>{
        console.log(message);
        if(message){
          this.updateevent.emit();
        }
        
        // this.searchInput=message;
      })
      

     }
    @Output() updateevent= new EventEmitter<any>();
    @Output() eventOne= new EventEmitter<boolean>();

  onNoClick(): void {
    this.dialogRef.close();
  }
  token = localStorage.getItem('token');/**get the token from local storage */
  /**it is a interface */
  /**OnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. */
  ngOnInit() {
console.log(this.data['noteLabels'],"maaaa");
this.selectarray1=this.data['noteLabels'];

  }
  more(label){
    this.selectarray1.push(label);
  }
  close() {
    this.updateNotes();/**calling the update method after entering the data & closing the card */
  }
  updateNotes() {
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
      // "noteLabels":''
    }
    this.httpService.postpassword("notes/updateNotes", body, this.token).subscribe(data => {
      console.log("update changes successfully", data);/**if no errors then display the data */
      this.snackBar.open("update change success", "success", {/**snackbar to display the result */
        duration: 10000,/**duaration of the snackbar to be opened */
      });
    }),
    error => {
      console.log("error in update", error);/**if error exists then display the error */
      this.snackBar.open("update change failed", "error", {/**snackbar to display the result */
        duration: 10000,
      });
    }
  }
removelabel(label,note){/**passing the label id & note id */
    try{
  console.log(note,label);/**displaying the id's */
  this.httpService.postdeletecard("notes/"+note+"/addLabelToNotes/"+label.id+"/remove",null,this.token)
    .subscribe(data=>{/**using the observabel subscribe using callbackk */
  console.log("success in remove label",data);/**if success then display the result */
this.eventOne.emit(true); 
const index=this.selectarray1.indexOf(label,0) ;
if(index>-1){
  this.selectarray1.splice(index,1);
}
    }),
    this.updateevent.emit();
    error=>{/**if error exists */
      console.log("error in remove",error);/**then display the error */
    }}
    catch(error){
      console.log(error);
    }
  }
  

}
