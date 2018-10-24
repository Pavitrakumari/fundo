/**component has imports , decorator & class */
import { Component,Input, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service'
/**A componenet can be reused throughout the application & even in other applications */
@Component({
  selector: 'app-notescard',/**A string value which represents the component on browser at execution time */
  templateUrl: './notescard.component.html',/**External templating process to define html tags in component */
  styleUrls: ['./notescard.component.css']/**It is used to provide style of components */
})
/**To use components in other modules , we have to export them */
export class NotescardComponent implements OnInit {
  constructor(public httpService: HttpService) { }
/**Input and Output are two decorators in Angular responsible for communication between two components*/
@Input() myData/**myData is a varaible */
/**it is a interface */
/**OnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. */
  ngOnInit() {}

}
