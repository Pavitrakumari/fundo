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
display(){/**display() method to show & hide the card based on click of close button */
  this.expression1=false;
this.expression2=true;
}
color(event){
  if(event){
    this.colorChange=event;
    
    console.log(this.colorChange);
      }
}
close(){/**method that need to perform while clicking the close button */
  this.expression1=true;
this.expression2=false;
// }
// click(){
  /**The innerHTML property sets or returns the HTML content (inner HTML) of an element. */
  this.title=document.getElementById('title').innerHTML;
  this.note=document.getElementById('note').innerHTML;
  /**document.getElementById() method returns the element of specified id */
  console.log(this.title);
  console.log(this.note);
  console.log(this.pinned);
  this.clicked=!this.clicked;
  var body={
    "title":this.title,
    "description":this.note,/**attributes to call the api */
    "labelIdList":"",
    "checklist":"",
    "isPined":this.pinned,
    "color":""
    }
    body.color=this.colorChange;
    console.log(this.colorChange);
    
this.httpService.postpassword("notes/addnotes",body,this.token).subscribe( /**registers handlers for events emitted by this instance */
  data=>{
    console.log("successfull add notes",data);/**if success then display the data */
    this.onNewEntryAdded.emit();
  },error=>{
    console.log("Error", error);/**if there exists error then display the error */
  });
  
  this.colorChange="#ffffff"
}




}
