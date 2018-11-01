/************************************************************************************************
*  Execution       :   1. default node         cmd> notes.ts 
*        
*  Purpose         : To display small card & hiddencards & change color when clicked 
* 
*  Description    
* 
*  @file           : notes.ts
*  @overview       : To display small card & hiddencards & change color when clicked
*  @module         : notes.ts - This is optional if expeclictly its an npm or local package
*  @author         : Pavitrakumari <pavithra.korapati@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
/**component has imports , decorator & class */
import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service'
import {  Router } from '@angular/router';
/**A componenet can be reused throughout the application & even in other applications */
@Component({
  selector: 'app-notes',/**A string value which represents the component on browser at execution time */
  templateUrl: './notes.component.html',/**External templating process to define html tags in component */
  styleUrls: ['./notes.component.css']/**It is used to provide style of components */
})

/**To use components in other modules , we have to export them */
export class NotesComponent implements OnInit {
  colorChange="#ffffff";
  expression1=true;
expression2=false;
expression3=true;
labelarray;
selectarray1=[];
selectarray2=[];
public title;
public note;
public pinned=false;
token=localStorage.getItem('token');/**get the token from localstorage */
constructor(public httpService: HttpService,public router:Router) { }
public clicked=false;
/**Input and Output are two decorators in Angular responsible for communication between two components*/
@Output() onNewEntryAdded = new EventEmitter();
/**EventEmitter:creates an instance of this class that can delliver events  */
  ngOnInit() {
/**it is a interface */
/**OnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. */
}
show: boolean = true;

display(){/**display() method to show & hide the card based on click of close button */
  this.expression1=false;
this.expression2=true;

}
color(event){
  if(event){/**if event occurs then change the color */
    this.colorChange=event;
    console.log(this.colorChange);
   }
}
close(){/**method that need to perform while clicking the close button */
  this.expression1=true;
this.expression2=false;
this.expression3=true;
this.selectarray2=[];

// }
// click(){
  /**The innerHTML property sets or returns the HTML content (inner HTML) of an element. */
try{
  this.title=document.getElementById('title').innerHTML;/**innerHTML property setys or returns HTML content of an element */
  this.note=document.getElementById('note').innerHTML;/**returns an element of specified id */
  /**document.getElementById() method returns the element of specified id */
  console.log(this.title);
  console.log(this.note);
  console.log(this.pinned);
  var body={
    "title":this.title,
    "description":this.note,/**attributes to call the api */
    "labelIdList":JSON.stringify(this.selectarray1),
    "checklist":"",
    "isPined":this.pinned,
    "color":""
    }
    body.color=this.colorChange;
    console.log(this.colorChange);
    this.httpService.postpassword("notes/addnotes",body,this.token).subscribe( /**registers handlers for events emitted by this instance */
      data=>{
        console.log("successfull add notes",data);/**if success then display the data */
        this.selectarray1=[];
        this.selectarray2=[];
        this.onNewEntryAdded.emit();
        this.colorChange="#ffffff"
     
      },error=>{
        console.log("Error", error);/**if there exists error then display the error */
      });
      
    }
  catch(error){
      console.log(error);
      
    }
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
clickFunc(temp){
  if (!this.selectarray2.some((data) => data == temp.label))
  {
    this.selectarray1.push(temp.id);
  this.selectarray2.push(temp.label);
  }
  else{
  
  const index = this.selectarray2.indexOf(temp.label, 0);
  if (index > -1) {
    this.selectarray2.splice(index, 1);
  }
    }
   
  }
  

}