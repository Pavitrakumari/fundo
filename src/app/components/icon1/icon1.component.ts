/************************************************************************************************
*  Execution       :   1. default node         cmd> icon1.ts 
*        
*  Purpose         : To perform all the operations of the reminder icon 
* 
*  Description    
* 
*  @file           : icon1.js
*  @overview       : To pick date & time from the reminder icon
*  @module         : icon1.ts - This is optional if expeclictly its an npm or local package
*  @author         : Pavitrakumari <pavithra.korapati@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
/**component has imports , decorator & class */
import { Component,Input,OnInit,Output,EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';
import * as _moment from 'moment'; 
import { MatSnackBar } from '@angular/material';
import { HttpService } from '../../core/services/http/http.service';
/**A componenet can be reused throughout the application & even in other applications */

@Component({
    /**A string value which represents the component on browser at execution time */
  selector: 'app-icon1',
    /**External templating process to define html tags in component */
    templateUrl: './icon1.component.html',
    /**It is used to provide style of components */
    styleUrls: ['./icon1.component.scss'],
  
})
/**To use components in other modules , we have to export them */
export class Icon1Component implements OnInit {
remind: any[] = [
    { value: 'morning', viewPeriod: 'Morning', viewTime: '08:00 AM'},
    { value: 'afternoon', viewPeriod: 'Afternoon', viewTime: '01:00 PM' },
    { value: 'evening', viewPeriod: 'Evening', viewTime: '06:00 PM' },
    { value: 'night', viewPeriod: 'Night', viewTime: '09:00 PM'}];

  constructor(public snackBar:MatSnackBar,public httpService:HttpService) { }
  token = localStorage.getItem('token')/**get the token from local storgae */
  @Input() reminders;
  /**@Input decorator tells Angular that this property is public and
   *  available for binding by a parent component*/
  body = {};
  @Output() reminderevent = new EventEmitter<any>()

  reminder(event) {/**callback will be invoked &data associated with the event will be given to us via $event property */
    this.reminderevent.emit();
  }
  ngOnInit() {
}
todayReminder() {
  let currentDate = new Date();
  this.body =
    {
      'noteIdList': [this.reminders.id],
      'reminder': new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 0, 8, 0, 0)
    }
  this.httpService.postdeletecard('/notes/addUpdateReminderNotes', this.body, this.token)
    .subscribe(data => {
      console.log("success in today reminders",data);
      this.reminderevent.emit();
    },
      error => {
        console.log("error in today reminders",error)
      })
}
tomorrowReminder() {
  let currentDate = new Date()
  this.body =
    {
      'noteIdList': [this.reminders.id],
      'reminder': new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 8, 0, 0)
    }
  this.httpService.postdeletecard('/notes/addUpdateReminderNotes', this.body, this.token)
    .subscribe(data => {
      console.log("success in tomorroe reminders",data);
      this.reminderevent.emit();
    },
      error => {
        console.log("error in tomorrow reminders",error)
      })
}
weekReminder() {
  let currentDate = new Date()
  this.body =
    {
      'noteIdList': [this.reminders.id],
      'reminder': new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7, 8, 0, 0)
    }
  this.httpService.postdeletecard('/notes/addUpdateReminderNotes', this.body, this.token)
    .subscribe(data => {
      console.log("success in week reminder",data);
      this.reminderevent.emit();

    },
      error => {
        console.log("error in week reminder",error)
      })
    }
    show = true;
  datePickReminder() {
    this.show = !this.show;
  }
  backPressDatepicker() {
    this.show = true;
  }
  reminderBody={
    "date": new FormControl(new Date()),
    "time":""
  }
  addRemCustom(date,timing){
    timing.match('^[0-2][0-3]:[0-5][0-9]$');
    if(timing=='8:00 AM'){
      this.body = {
        "noteIdList": [this.reminders.id],
        "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, 0, 0, 0)
      }
    }
  else if(timing=='1:00 PM'){

    this.body = {
      "noteIdList": [this.reminders.id],
      "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), 13, 0, 0, 0)
    }
  }
  else if(timing=='6:00 PM'){
    this.body = {
      "noteIdList": [this.reminders.id],
      "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), 18, 0, 0, 0)
    }
  }
  else if(timing=='9:00 PM'){
    this.body = {
      "noteIdList": [this.reminders.id],
      "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), 21, 0, 0, 0)
    }
  }
  else if(timing==this.reminderBody.time){
    var splitTime=this.reminderBody.time.split("",8);
    var hour= Number(splitTime[0]+splitTime[1]);
    var minute= Number(splitTime[3]+splitTime[4]);
    var ampm = (splitTime[6]+splitTime[7]);
   
    if(ampm=='AM' || ampm=='am'){
      this.body = {
        "noteIdList": [this.reminders.id],
        "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute, 0, 0)
      }
    }else if(ampm=='PM' || ampm=='pm'){
      this.body = {
        "noteIdList": [this.reminders.id],
        "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour+12, minute, 0, 0)
      }
    }
  }
  this.httpService.postdeletecard('notes/addUpdateReminderNotes',this.body,this.token).subscribe((result) => {
      
    this.reminderevent.emit()
  })
}}