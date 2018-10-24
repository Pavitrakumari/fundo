/**component has imports , decorator & class */
import { Component, OnInit } from '@angular/core';
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
  temp=[];
  constructor(public httpService: HttpService) { }
  /**it is a interface */
  /**OnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. */
ngOnInit() {
  this.getCard();/**calling the getCard() to get the cards & display automatically when the component loads */
}
getCard(){
   this.token=localStorage.getItem('token');/**get the token from the local storage */
    this.httpService.getcard("notes/getNotesList",this.token).subscribe(data=>{
      /**hitting the apiby passing the token */
      console.log("get cards list successfull",data);
      this.temp=data['data'].data.reverse();/**reverse() method in typescript to display the data in reverse order */
      console.log(this.temp);

    })
  }
}
