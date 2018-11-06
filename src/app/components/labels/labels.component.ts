import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../services/http.service';
@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.css']
})
export class LabelsComponent implements OnInit {
  token;
  labelName;
  arraynewdata = [];
  temp;
  constructor(public httpService: HttpService, public route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      console.log(params);
      if (params) {
        this.labelName = params.id;
        this.getCard();
      }
    })
  }
  ngOnInit() {
    this.getCard();
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
          for (let index = 0; index < data['data'].data[i].noteLabels.length; index++) {
            if (data['data'].data[i].noteLabels[index].label == this.labelName) {
              this.arraynewdata.push(data['data'].data[i]);/**then push those cards into the array */
            }
          }
        }
      }
      console.log(this.arraynewdata, "array of new data");/**display new array*/
    }),
      error => {/**if error occurs then display the error */
        console.log("error", error);
      }
  }
}
