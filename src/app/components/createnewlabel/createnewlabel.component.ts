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
import { Component, OnInit,Inject,Input,Output,EventEmitter, ViewChild,ElementRef } from '@angular/core';
import {MatDialog,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HttpService } from '../../services/http.service';
import { DataService } from '../../services/data.service';
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
@Inject(MAT_DIALOG_DATA) public data: any,public httpservice:HttpService,public dataService:DataService) {
}
@Output() updateevent= new EventEmitter<any>();

@ViewChild('myDiv') myDiv:ElementRef;
/**it is a interface */
/**OnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. */
ngOnInit() {
  this.getLabels();
}
public search:any = '';

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
  // this.addLabel();
  // this.getLabels();
}
clear(){
  this.label='';
}
done(){
  this.addLabel();
  this.getLabels();
  this.clear();
}
public label;
changeText=false
addLabel(){
try{
var label=this.label;
  console.log(this.labelarray);
  
for(var i=0;i<this.labelarray.length;i++){
  if(this.labelarray[i].label==label){
    alert("duplicate")
return false;
  }
}

  this.httpservice.postdeletecard("noteLabels",{
    "label":this.label,
    "isDeleted":false,
    "userId":localStorage.getItem('userId')
  },this.token).subscribe(response=>{
    console.log("success in createpostlabel",response)
  }),
error=>{
    console.log("error in create/add postlabel",error)
  }}
  catch(error){
    console.log(error);
    
  }
}
getLabels(){
try{
  this.httpservice.getcard("noteLabels/getNoteLabelList",this.token).subscribe(
    data=>{
      this.labelarray=[];
      console.log(data['data'].details);
      for(var i=0;i<(data['data'].details).length;i++){/**running for loop for the length of the array */
        if(data['data'].details[i].isDeleted == false){/**if label is not deleted then get the labels */
        this.labelarray.push(data['data'].details[i])}/**pushing labels into an array */
      }
      console.log(this.labelarray,"Label array printing successsss");
      this.updateevent.emit();/**emit an event to the parent */

    }),
    error=>{/**if error exists then display the array */
      console.log("error in get LABELS",error);
    }
  }
catch(error){
    console.log(error);
    
  }
  
}
delete(labelid){/**delete() method to delete the labels from the list */
try{
  console.log(labelid)
  this.httpservice.deletedata("noteLabels/"+labelid+"/deleteNoteLabel")/**calling the api by passing url,token,labelid */
  .subscribe(response=>{/** In angular subscribe is used with Observable*/

    console.log("success in delete",response);/**if success exists then display the success */
    this.dataService.changeMessage2(true)
    this.getLabels();

  }),error=>{/**if error exists then display the error */
    console.log("erroe in deelete",error);
  }}
catch(error){
    console.log(error);
    
  }
}
edit(label){
  this.editClick=true;
  this.editId=label.id;
  this.editLabel=label.label;
  this.editDoneIcon=false;
  this.editable=true;
  console.log(this.editClick)
 }
editlabel(label){/**editlabel() method to edit the labels */
try{
  this.editDoneIcon = true;
  this.editClick=false;
  this.editable=false;
   var url = "noteLabels/" + label.id +"/updateNoteLabel"/**setting the url */
  this.httpservice.postdeletecard(url,{/**calling the api by passing url,token,labelid */
    "label": this.myDiv.nativeElement.innerHTML,
    "isDeleted": false,/**attributes */
    "id":label.id,
    "userId":localStorage.getItem('userId')
  },localStorage.getItem('token')).subscribe(response=>{
    console.log("success in edit labell ..........",response)
    this.dataService.changeMessage2(true)
    this.getLabels();
    this.updateevent.emit();/**emit an event to the parent */
}),error=>{
    console.log("error in edit label...........",error)
  }
}
catch(error){
  console.log(error);
}}}