import { Component, OnInit } from '@angular/core';
import { MessagingService } from './core/services/messaging/messaging.service';
import { HostBinding } from '@angular/core';
// import { Messa}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    // animation triggers go here
  ]

})
export class AppComponent implements OnInit{
  title = 'pavitra';
  message;
  constructor(private messageService:MessagingService){}
  ngOnInit(){
    this.messageService.getPermission();
    this.messageService.receiveMessage();
    
  }
}
