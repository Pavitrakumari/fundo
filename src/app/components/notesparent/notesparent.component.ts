/************************************************************************************************
*  Execution       :   1. default node         cmd> notesparent.ts 
*        
*  Purpose         : To create,add,update & delete the notes 
* 
*  Description    
* 
*  @file           : notesparent.js
*  @overview       : To create,add,update & delete the notes
*  @module         : notesparent.ts - This is optional if expeclictly its an npm or local package
*  @author         : Pavitrakumari <pavithra.korapati@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
/**component has imports , decorator & class */
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service'
/**A componenet can be reused throughout the application & even in other applications */
@Component({
  selector: 'app-notesparent',/**A string value which represents the component on browser at execution time */
  templateUrl: './notesparent.component.html',/**External templating process to define html tags in component */
  styleUrls: ['./notesparent.component.css']/**It is used to provide style of components */
})
/**To use components in other modules , we have to export them */
export class NotesparentComponent implements OnInit {
  token;
  temp = [];
  arraynewdata = [];
  constructor(public httpService: HttpService) { }
  /**it is a interface */
  /**OnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. */
  ngOnInit() {
    this.getCard();/**calling the getCard() to get the cards & display automatically when the component loads */
  }
  delete() {
    if (event) {
      this.getCard();
    }
  }
  getCard() {
    this.token = localStorage.getItem('token');/**get the token from the local storage */
    this.httpService.getcard("notes/getNotesList", this.token).subscribe(data => {
      /**hitting the api by passing the url & token */
      console.log("get cards list successfull", data);
      this.temp = data['data'].data.reverse();/**reverse() method in typescript to display the data in reverse order */
      // console.log(this.temp);
      this.arraynewdata = [];/**Reinitializing the array so that data gets updated */
      for (var i = 0; i < data['data'].data.length; i++)/**for loop to go through all cards*/ {
        if (data['data'].data[i].isDeleted == false && data['data'].data[i].isArchived == false)/**if cards are not deleted  */ {
          this.arraynewdata.push(data['data'].data[i]);/**then push those cards into the array */
        }
      }
      console.log(this.arraynewdata, "array of new data");/**display new array*/
    }),
      error => {/**if error occurs then display the error */
        console.log("error", error);
      }
  }
}
