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
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';

import { Component,Input,Output,EventEmitter, OnInit } from '@angular/core';
import{HttpService} from '../../services/http.service'
import {MatSnackBar} from '@angular/material';
import { AddlabelComponent } from '../addlabel/addlabel.component';
/**A componenet can be reused throughout the application & even in other applications */

@Component({
  selector: 'app-moreicon',/**A string value which represents the component on browser at execution time */
  templateUrl: './moreicon.component.html',/**External templating process to define html tags in component */
  styleUrls: ['./moreicon.component.css']/**It is used to provide style of components */
})
export class MoreiconComponent implements OnInit {
  public labelarray=[];
  public search:any = '';
  clicklist=false;
  disabled = false;
notearray=[];
isChecked;
  token=localStorage.getItem('token');
  @Output() moreevent = new EventEmitter<any>();
    @Output() checkevent = new EventEmitter<any>();

/**Input and Output are two decorators in Angular responsible for communication between two components*/

@Input() arrayofnotes:any
  constructor(public dialog: MatDialog,public httpService: HttpService,public snackBar: MatSnackBar) { }
ngOnInit() {
  // this.getLabels();
// console.log("pavii");
// console.log(this.arrayofnotes);
// console.log(this.arrayofnotes.noteLabels);

}
deletecard(){/**method to delete the cards */
try{
  console.log("pichii");
  
  console.log(this.arrayofnotes);
  var model={
    "isDeleted":true,/**attributes to be passed to hit the api trashNotes */
    "noteIdList":[this.arrayofnotes.id]
  }/**hitting the api by passing the url & token */

  this.httpService.postdeletecard("notes/trashNotes",model,this.token).subscribe(data=>{
    console.log("deleted card successfully",data);/**if error doesnot exist the display the result */
    this.snackBar.open("successfully deleted notes", "deleted", {
      duration:10000,
    });
    this.moreevent.emit();/**to emit an event to the parent */
  })}
catch(error){
    console.log(error);
    
  }
}
addlabel() 
{/**addlabel() method to open the add-label dialog box when it is clicked */
  this.dialog.open(AddlabelComponent, {/**open dialog  */
    width: '550px',
    height:'auto',
    panelClass: 'myapp-no-padding-dialog'
  });
}

getLabels1()
{
  this.httpService.getcard("noteLabels/getNoteLabelList",this.token)
  .subscribe(response=>{
      this.labelarray=[];
      console.log(response['data'].details);
      for(var i=0;i<(response['data'].details).length;i++)
      {
        if(response['data'].details[i].isDeleted == false)
        {
               this.labelarray.push(response['data'].details[i])
        }
      }
      console.log(this.labelarray,"Label array printing success");
    }),
    error=>{
      console.log("error in get LABELS",error);
    }
}

/**getLabels() method to get the labels */
getLabels()

{
  console.log(this.arrayofnotes.noteLabels);
  console.log("hellyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
  
  this.notearray=this.arrayofnotes.noteLabels;
  this.httpService.getcard("noteLabels/getNoteLabelList",this.token)
  .subscribe(response=>{
      this.labelarray=[];
      console.log(response['data'].details);
      for(var i=0;i<(response['data'].details).length;i++)
      {
        if(response['data'].details[i].isDeleted == false)
        {
               this.labelarray.push(response['data'].details[i])
        }
      }
      console.log(this.labelarray,"label array after pushingggg");
      
      for(var i=0;i<this.labelarray.length;i++)
      {
      for(var j=0;j<this.notearray.length;j++)
      {
          if(this.labelarray[i].id == this.notearray[j].id)
          {
               this.labelarray[i].isChecked=true;
               console.log(this.labelarray[i].isChecked,"ischecked became true");
          }
          console.log("noooooooooooooooooooooooooooooooooooooooooo");
          
      }
    }
      
      console.log(this.labelarray,"Label array printing success");
    }),
    error=>{
      console.log("error in get LABELS",error);
    }
}


getlabellist(label){/**adding labels to notes */
try{
  console.log("selected label is : ",label.isChecked);
  console.log([this.arrayofnotes['id']]);
  console.log(label);
  var url="notes/"+[this.arrayofnotes['id']]+"/addLabelToNotes/"+label+"/add";/**setting the url path */
  {
    console.log("add function .......");
    /**hitting the api by passing the url & token & empty body*/
    this.httpService.postdeletecard(url,{},this.token).subscribe(data=>{/** In angular subscribe is used with Observable*/
      console.log("success in get label list",data);/**if success then display the data */
      this.moreevent.emit();/**to emit an event to the parent */
    }),
    error=>{/**if error exists then display the errror */
  console.log("error in get label list",error);
}}}
catch(error){

  console.log(error);
  
}
}
}
