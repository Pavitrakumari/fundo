import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import{HttpService} from '../../services/http.service'
import {MatSnackBar} from '@angular/material';

export interface DialogData {
  "title":String,
  "description":String,
  "notesIdList":[],
  "color":String

}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  public title;
  public note;
  public id;
  
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,public httpService: HttpService,public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }
    token=localStorage.getItem('token');

  
  ngOnInit() {
    
  }
  close(){
    this.updateNotes();
  }
updateNotes(){
  console.log(this.data['id']);
var id=this.data['id']
  this.title=document.getElementById('title').innerHTML;
  this.note=document.getElementById('note').innerHTML;

  var body={
    "noteId":[id],
  "title":this.title,
  "description":this.note

}
this.httpService.postpassword("notes/updateNotes",body,this.token).subscribe(data=>{
  console.log("update changes successfully",data);
  this.snackBar.open("update change success", "success", {/**snackbar to display the result */
    duration:10000,
  });
}),
error=>{
  console.log("error in update",error);
  this.snackBar.open("update change failed", "error", {/**snackbar to display the result */
    duration:10000,
  });
}

  
}
}
