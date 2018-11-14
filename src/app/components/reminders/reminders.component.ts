import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss']
})
export class RemindersComponent implements OnInit {
  token;
  @Output() removeremindevent = new EventEmitter<any>();

  temp2=[];
  constructor(public httpService:HttpService) { }

  ngOnInit() {
    this.getReminder();
  }
  reminder(event) {
    this.getReminder();
  }


  getReminder() {
    this.token = localStorage.getItem('token');/**get the token from the local storage */

    this.httpService.getcard('/notes/getReminderNotesList', this.token)
      .subscribe(data => {
        console.log("success in get reminders ",data);
  
        for(var i = 0; i < data['data'].data.length; i++){
          this.temp2.push(data['data'].data[i]);
          this.removeremindevent.emit();

        }
      })
    error => {
      console.log("error in get reminders",error)
    }
  }
  
  
}
