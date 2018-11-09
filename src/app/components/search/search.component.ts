import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { DataService } from '../../core/services/data/data.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  token;
  temp = [];
  arraynewdata = [];
  public searchInput;
  constructor(public httpService: HttpService, public dataservice: DataService) { }
  ngOnInit() {
    this.dataservice.currentMessage.subscribe(message => {
      this.searchInput = message
      console.log(this.searchInput, "search component running ");
      this.getCard();
    })
  }
  getCard() {
    this.token = localStorage.getItem('token');/**get the token from the local storage */
    this.httpService.getcard("notes/getNotesList", this.token).subscribe(data => {
      /**hitting the api by passing the url & token */
      this.arraynewdata = [];
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
