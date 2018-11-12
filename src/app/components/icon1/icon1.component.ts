import { Component,Input,OnInit,Output,EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment'; 
import * as moment_1 from 'moment';
import { MatSnackBar } from '@angular/material';
import { HttpService } from '../../core/services/http/http.service';
const moment = moment_1|| _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
export interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-icon1',
  templateUrl: './icon1.component.html',
  styleUrls: ['./icon1.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class Icon1Component implements OnInit {
  foods: Food[] = [
    // {value: 'steak-0', viewValue: 'Morning'},
    // {value: 'pizza-1', viewValue: 'Afternoon'},
    // {value: 'tacos-2', viewValue: 'Evening'}
  ];
  constructor(public snackBar:MatSnackBar,public httpService:HttpService) { }
  token = localStorage.getItem('token')
  @Input() reminders;
  body = {};
  @Output() reminderevent = new EventEmitter<any>()

  reminder(event) {/**callback will be invoked &data associated with the event will be given to us via $event property */
    this.reminderevent.emit();
  }

ngOnInit() {
  // this.getReminder();
}
date = new FormControl(moment());



todayReminder() {
  let currentDate = new Date()
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
  
  
  }