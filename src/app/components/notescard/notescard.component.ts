import { Component, OnInit } from '@angular/core';
import { HttpService } from '/home/administrator/fundo/src/app/services/http.service'

@Component({
  selector: 'app-notescard',
  templateUrl: './notescard.component.html',
  styleUrls: ['./notescard.component.css']
})
export class NotescardComponent implements OnInit {

  temp=[];
  constructor(public httpService: HttpService) { }
  token=localStorage.getItem('token');
  ngOnInit() {
    this.getCard();
  }

  getCard(){
    this.httpService.getcard("notes/getNotesList",this.token).subscribe(data=>{
      console.log("get cards list successfull",data);
      for(var i=0;i<data['data'].data.length;i++)
      {
      this.temp.push(data['data'].data[i]);
      }
      console.log(data['data'].data);


    })
    
  }
}
