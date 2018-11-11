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
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { Router } from '@angular/router';

import { error } from '@angular/compiler/src/util';
import { LoggerService } from '../../core/services/logger/logger.service';
/**A componenet can be reused throughout the application & even in other applications */
@Component({
  selector: 'app-notes',/**A string value which represents the component on browser at execution time */
  templateUrl: './notes.component.html',/**External templating process to define html tags in component */
  styleUrls: ['./notes.component.css']/**It is used to provide style of components */
})
/**To use components in other modules , we have to export them */
export class NotesComponent implements OnInit {
  colorChange = "#ffffff";
  expression1 = true;
  expression2 = false;
  expression3 = true;
  labelarray;
  public check=false;
  public status="open"
  public dataArrayApi=[];
  public isChecked=false;

  selectarray1 = [];
  data;
  noteid={'isArchived':false}
  dataarray = [];
  selectarray2 = [];
  public title;
  
  public note;
  public pinned = false;
  token = localStorage.getItem('token');/**get the token from localstorage */
  adding: boolean;
  constructor(public httpService: HttpService, public router: Router) { }
  public clicked = false;
  /**Input and Output are two decorators in Angular responsible for communication between two components*/
  @Output() onNewEntryAdded = new EventEmitter();
  /**EventEmitter:creates an instance of this class that can delliver events  */
  ngOnInit() {
    /**it is a interface */
    /**OnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. */
  }
  public body:any={}
  public isPinned = false;
public isArchived=false;
  show: boolean = true;
  display() {/**display() method to show & hide the card based on click of close button */
    this.expression1 = false;
    this.expression2 = true;
  }
  color(event) {
    if (event) {/**if event occurs then change the color */
      this.colorChange = event;
      console.log(this.colorChange);
    }
  }
  close1(){
    this.dataarray=[];
  }
  close() {/**method that need to perform while clicking the close button */
    this.expression1 = true;
    this.expression2 = false;
this.enter(event);
    this.selectarray2 = [];
    // this.dataarray[0]=[];
    /**The innerHTML property sets or returns the HTML content (inner HTML) of an element. */
    try {
      this.title = document.getElementById('title').innerHTML;/**innerHTML property setys or returns HTML content of an element */
      /**document.getElementById() method returns the element of specified id */
      console.log(this.title);
      console.log(this.note);
      console.log(this.pinned);
      console.log(this.selectarray1, "selecttttt");
if(this.expression3 == true ){
  this.note = document.getElementById('note').innerHTML;/**returns an element of specified id */

console.log("madavi checklist");

 this.body = {
        "title": this.title,
        "description": this.note,/**attributes to call the api */
        "labelIdList": JSON.stringify(this.selectarray1),
        "checklist": "",
        "isPined": "",
        "color": ""
      }
    }
    else{
      console.log("else................................... part");
      console.log(this.dataarray,"data array of checklists................");
      
      for(var i=0;i<this.dataarray.length;i++){
        if(this.dataarray[i].isChecked == true)
        {
          console.log(this.dataarray[i],"data array in checklists for loop");
          
         this.status="close"
        }
        var apiObj={
          "itemName":this.dataarray[i].data,
          "status":this.status
        }
        this.dataArrayApi.push(apiObj)
        this.status="open"

      }
      console.log(this.dataArrayApi,"data arrayapiiiiiiiiii");
      console.log("executing   VIJAY WARDADA checklistt.............");

      this.body={
        "title": this.title,
        "checklist":JSON.stringify(this.dataArrayApi),
        "isPined": this.isPinned,
        "color": "",
        "isArchived": this.isArchived,
        "labelIdList": JSON.stringify(this.selectarray1)
       }
    }
    
      this.body.color = this.colorChange;
      console.log(this.colorChange);
      if (this.title != "") 
{
console.log("executing PRANEE checklistt.............");

      this.httpService.postpassword("notes/addnotes", this.body, this.token).subscribe( /**registers handlers for events emitted by this instance */
        data => {
          LoggerService.log("successfull add notes bujji ", data);/**if success then display the data */
          this.selectarray1 = [];
          this.expression3 = true;

          this.selectarray2 = [];
          this.dataArrayApi=[];
          this.dataarray=[];
          this.adding=false;
          this.onNewEntryAdded.emit();
          this.close1();

          this.colorChange = "#ffffff";

        }, error => {
          console.log("Error", error);/**if there exists error then display the error */
        });

      }







      }
    catch (error) {
      console.log(error);
    }
  }
  getLabels1() {
    this.httpService.getcard("noteLabels/getNoteLabelList", this.token)
      .subscribe(response => {
        this.labelarray = [];
        console.log(response['data'].details);
        for (var i = 0; i < (response['data'].details).length; i++) {
          if (response['data'].details[i].isDeleted == false) {
            this.labelarray.push(response['data'].details[i])
          }
        }
        LoggerService.log('Label array printing success bujji soo sweet of you'
        ,this.labelarray);

      }),
      error => {
        console.log("error in get LABELS", error);
      }
  }
  clickFunc(temp) {
    if (!this.selectarray2.some((data) => data == temp.label)) {
      this.selectarray1.push(temp.id);
      this.selectarray2.push(temp.label);
    }
    else {
      const index = this.selectarray2.indexOf(temp.label, 0);
      if (index > -1) {
        this.selectarray2.splice(index, 1);
      }
    }
  }
  // public data;
  // public i=0;
  // public adding=false;
  public addCheck=false;
 
  public i = 0;
  enter(event) {
    if(this.data!=""){
      this.adding=true;
    }
    else{
      this.adding=false;
    }
    this.i++;
    this.isChecked=this.addCheck

    if (this.data != null && event.code=="Enter") {
      console.log(event, "keydown");
      var obj = {
        "index": this.i,
        "data": this.data,
        "isChecked":this.isChecked


      }
      this.dataarray.push(obj);
      console.log(this.dataarray,"data array in enter functionn...............");
      
      this.data=null;
      this.adding=false;
      this.isChecked=false;
        this.addCheck = false;
      }
  }
  ondelete(deletedObj) {
    console.log("ondelete function runnig");
    for (var i = 0; i < this.dataarray.length; i++) {
      if (deletedObj.index == this.dataarray[i].index) {
        this.dataarray.splice(i, 1);
        break;
      }
    }
    console.log(this.dataarray);
  }
}