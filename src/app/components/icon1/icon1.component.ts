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
import { Component,Input,OnInit,Output,EventEmitter,ViewChild ,OnDestroy} from '@angular/core';
import {FormControl} from '@angular/forms';
import * as _moment from 'moment'; 
import { MatMenu } from '@angular/material';

import { MatSnackBar } from '@angular/material';
import { HttpService } from '../../core/services/http/http.service';
import { NoteService } from '../../core/services/http/note/note.service';
import { LoggerService } from '../../core/services/logger/logger.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

/**A componenet can be reused throughout the application & even in other applications */

@Component({
    /**A string value which represents the component on browser at execution time */
  selector: 'app-icon1',
    /**External templating process to define html tags in component */
    templateUrl: './icon1.component.html',
    /**It is used to provide style of components */
    styleUrls: ['./icon1.component.scss'],
    exportAs: 'menuInOtherComponent'

  
})
/**To use components in other modules , we have to export them */
export class Icon1Component implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild(MatMenu) menu: MatMenu;


  constructor(private noteService:NoteService,public snackBar:MatSnackBar,public httpService:HttpService) { }

  @Input() reminders;
  @Input() reminderShow;

  /**@Input decorator tells Angular that this property is public and
   *  available for binding by a parent component*/
  body = {};
  dateflag=false;
  @Output() reminderevent = new EventEmitter<any>()
  @Output() remm = new EventEmitter<any>()
  public disableStatus;
  remind: any[] = [
    { value: 'morning', viewPeriod: 'Morning', viewTime: '08:00 PM',disableStatus:'false'},
    { value: 'afternoon', viewPeriod: 'Afternoon', viewTime: '01:00 PM',disableStatus:'false' },
    { value: 'evening', viewPeriod: 'Evening', viewTime: '06:00 PM',disableStatus:'false' },
    { value: 'night', viewPeriod: 'Night', viewTime: '09:00 PM',disableStatus:'false'}];

  reminder(event) {/**callback will be invoked &data associated with the event will be given to us via $event property */
    this.reminderevent.emit({});
  }
  ngOnInit() {
    LoggerService.log(this.setDate.getFullYear());

    this.disabledates();

    this.reminderShow= true;
    // console.log(splitTime,"split time");

}
public todaydate=new Date();
public tomorrowdate;


todayReminder() {/**function to get the reminder of present day */
try{
  let currentDate = new Date();/**assigning a variable to the new Date() instance */
  var data=new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 0, 8, 0, 0)
  this.remm.emit(data);/**emitting the event with the new date */
  
    if(this.reminders!=undefined){/**if remindrs is defined then execute the below code */
      this.body =/**assigning the attributes to the body */
    {
      'noteIdList': [this.reminders.id],
      'reminder': new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 0, 20, 0, 0)
    }

  this.noteService.postAddUpdateReminderNOtes( this.body)
  .pipe(takeUntil(this.destroy$))
  .subscribe(data => {/** if there exits no error then post the data */
      LoggerService.log("success in today reminders",data);
      this.reminderevent.emit({});/**emitting the event to communicate with the other componenets */
    },
      error => {/**if error exists then display the error */
        LoggerService.log("error in today reminders",error)
      })
}}
catch(error){
console.log(error);
}

}
tomorrowReminder() {/**function to get the reminder of next day */

try{
  let currentDate = new Date();/**assigning a variable to the new Date() instance */
  let data=new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 8, 0, 0)
  this.remm.emit(data);/**emitting the event with the new date */
    if(this.reminders!=undefined){/**if remindrs is defined then execute the below code */
/**assigning the attributes to the body */
  this.body =
    {
      'noteIdList': [this.reminders.id],
      'reminder': new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 8, 0, 0)
    }
 
  this.noteService.postAddUpdateReminderNOtes( this.body)
  .pipe(takeUntil(this.destroy$))
  .subscribe(data => {/** if there exits no error then post the data */
      LoggerService.log("success in tomorroe reminders",data);
      this.reminderevent.emit({});/**emitting the event to communicate with the other componenets */
    },
      error => {/**if error exists then display the error */
        LoggerService.log("error in tomorrow reminders",error)
      })
}}
catch(error){
  LoggerService.log(error);
}
}
weekReminder() {/**function to get the reminder of next week */
try  {
  let currentDate = new Date()
  let data=new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() +  7, 8, 0, 0)
  this.remm.emit(data);/**emitting the event with the new date */
  if(this.reminders!=undefined){/**if remindrs is defined then execute the below code */
    /**assigning the attributes to the body */
    this.body =
    {
      'noteIdList': [this.reminders.id],
      'reminder': new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7, 8, 0, 0)
    }
      
      this.noteService.postAddUpdateReminderNOtes( this.body)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {/** if there exits no error then post the data */
      LoggerService.log("success in week reminder",data);
      this.reminderevent.emit({});/**emitting the event to communicate with the other componenets */

    },
      error => {/**if error exists then display the error */
        LoggerService.log("error in week reminder",error);
      })
    }}
  
catch(error){
    LoggerService.log(error);
    
  }}
  show = true;
  datePickReminder() {/**function to show & hide the mat-menu's */
    this.show = !this.show;
  }
  backPressDatepicker() {
    this.show = true;
  }
  reminderBody={/**attributes to be passed to the reminder body */
    "date": new FormControl(new Date()),
    "time":""
  }
public setDate=this.reminderBody.date.value;

  addRemCustom(date,timing){/**function to add the custom remindrs */
try{    
    
    timing.match('^[0-2][0-3]:[0-5][0-9]$');/**this is used to match the time */
    if(timing==this.reminderBody.time){/**if condition is satisfied then  */
    let splitTime=this.reminderBody.time.split("",8);/**split the time */
    let hour= Number(splitTime[0]+splitTime[1]);/**to split into hours */
    let minute= Number(splitTime[3]+splitTime[4]);/**to split into minutes */
    let ampm = (splitTime[6]+splitTime[7]);
    if(ampm=='AM' || ampm=='am'){
      let data=new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute, 0, 0)
      if(this.reminders!=undefined){
        this.body = {/**pass the attributes to the body according the condition given in if statement */
        "noteIdList": [this.reminders.id],
        "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute, 0, 0)
      }}
      }
      else if(ampm=='PM' || ampm=='pm'){
      LoggerService.log("split time",splitTime);
      var data=new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour+12, minute, 0, 0)
      if(this.reminders!=undefined){
        this.body = {/**pass the attributes to the body according the condition given in else if statement */
        "noteIdList": [this.reminders.id],
        "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour+12, minute, 0, 0)
      }}
    }
  }
  this.remm.emit(data);
  this.noteService.postAddUpdateReminderNOtes(this.body)
  .pipe(takeUntil(this.destroy$))
  .subscribe((result) => {
    this.reminderevent.emit({})
  })
}
 catch(error){
   LoggerService.log(error);
}
}
  disable(event)
  {
    this.dateflag=false;
    let pattern=/^(2[0-3]|1[0-9]|[0][0-9]):[0-5][0-9] (AM|PM|pm|am|Pm|pM|Am|aM)$/;
   if(pattern.test( this.reminderBody.time))
   {
    this.dateflag=true;
   }
   else
   this.dateflag=false;
  }
  disabledates(){
    if ((new Date(this.setDate).getFullYear()-new Date(this.todaydate).getFullYear()) === 0) {
      if ((new Date(this.setDate).getMonth() - new Date(this.todaydate).getMonth()) === 0) {
        if ((new Date(this.setDate).getDate() - new Date(this.todaydate).getDate()) === 0) {
          if ((new Date(this.setDate).getHours()) > 8) {
            this.remind[0].disableStatus = true;
          } 
          if ((new Date(this.setDate).getHours()) > 13)
           {
            this.remind[1].disableStatus = true;
          }
          if ((new Date(this.setDate).getHours()) > 18)
            {
            this.remind[2].disableStatus = true;
          } 
          if ((new Date(this.setDate).getHours()) > 20) 
          {
            this.remind[3].disableStatus = true;
          }
        }
      }
    }
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}