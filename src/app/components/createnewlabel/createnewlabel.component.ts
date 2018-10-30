/************************************************************************************************
*  Execution       :   1. default node         cmd> createnewlabel.ts 
*        
*  Purpose         : To create, 
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
import { Component, OnInit,Inject,Input,Output,EventEmitter, ViewChild,ElementRef } from '@angular/core';
import {MatDialog,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HttpService } from '../../services/http.service';
/**A componenet can be reused throughout the application & even in other applications */
@Component({
  selector: 'app-createnewlabel',
  templateUrl: './createnewlabel.component.html',
  styleUrls: ['./createnewlabel.component.css']
})
export class CreatenewlabelComponent implements OnInit {
public labelarray=[];
// public token=localStorage.getItem('token')
  constructor(public dialogRef: MatDialogRef<CreatenewlabelComponent>,
@Inject(MAT_DIALOG_DATA) public data: any,public httpservice:HttpService) {}
@ViewChild('myDiv') myDiv:ElementRef;
/**it is a interface */
/**OnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. */
ngOnInit() {
  this.getLabels();
}
editClick;
editable;
editLabel;
editId;
editDoneIcon;
editDiv;
public editclick=false;
public  token=localStorage.getItem('token')
onClose():void{
  this.dialogRef.close();
  this.addLabel();
  this.getLabels();
}
public label;
changeText=false
addLabel(){
  // console.log(this.myDiv.nativeElement.innerHTML);
  this.httpservice.postdeletecard("noteLabels",{
    "label":this.label,
    "isDeleted":false,
    "userId":localStorage.getItem('userId')
  },this.token).subscribe(response=>{
    console.log("success in createpostlabel",response)
  },
  error=>{
    console.log("error in create/add postlabel",error)
  })
}
getLabels(){
  this.httpservice.getcard("noteLabels/getNoteLabelList",this.token).subscribe(
    response=>{
      this.labelarray=[];
      console.log(response['data'].details);
      for(var i=0;i<(response['data'].details).length;i++){
        if(response['data'].details[i].isDeleted == false){
        this.labelarray.push(response['data'].details[i])}
      }
      console.log(this.labelarray,"Label array printing successsss");
    }),
    error=>{
      console.log("error in get LABELS",error);
    }
  
}
delete(labelid){
  console.log(labelid)
  this.httpservice.deletedata("noteLabels/"+labelid+"/deleteNoteLabel")
  .subscribe(response=>{
    console.log("success in delete",response);
    this.getLabels();
  },error=>{
    console.log("erroe in deelete",error);
  })
}
edit(label){
  this.editClick=true;
  this.editId=label.id;
  this.editLabel=label.label;
  this.editDoneIcon=false;
  this.editable=true;
  console.log(this.editClick)
 }
editDone(label){
  this.editDoneIcon = true;
  this.editClick=false;
  this.editable=false;
   var url = "noteLabels/" + label.id +"/updateNoteLabel"
  this.httpservice.postdeletecard(url,{
    "label": this.myDiv.nativeElement.innerHTML,
    "isDeleted": false,
    "id":label.id,
    "userId":localStorage.getItem('userId')
  },localStorage.getItem('token')).subscribe(response=>{
    console.log("success in edit labell ..........",response)
    this.getLabels();
  }),error=>{
    console.log("error in edit label...........",error)
  }
}





}
