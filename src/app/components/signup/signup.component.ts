import { Component, OnInit } from '@angular/core';
import { HttpService } from '/home/administrator/fundo/src/app/services/http.service'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  hide = true;
  public card = [];
  public arr = [];
  service;

  constructor(public httpService: HttpService) { }



ngOnInit() {




    let obs = this.httpService.getDataService("user/service");
    obs.subscribe((response) => {
      var data = response["data"];
      for (var i = 0; i < data.data.length; i++) {
        this.card.push(data.data[i]);
      }
      console.log(this.card);
    })
   }
   respond(card) {
    console.log(card.name);
    this.service=card.name;
    card.select = true;
    for (var i = 0; i < this.card.length; i++) {
      if (card.name == this.card[i].name) {
        continue;
      }
      this.card[i].select = false;
    }

  }








  model: any = {};
  signup() {
  console.log(this.model.Firstname)
  console.log(this.model.Lastname)
  console.log(this.model.Username)

    this.httpService.postdata("user/userSignUp",

      {
        "firstName": this.model.Firstname,
        "lastName": this.model.Lastname,
        "phoneNumber": "9603273903",
        "service": this.service,
        "createdDate": "2018-10-09T06:35:12.617Z",
        "modifiedDate": "2018-10-09T06:35:12.617Z",
        "username": this.model.Username,
        "email": this.model.Username,

        "emailVerified": true,
        "password": this.model.password
      })
      .subscribe(
        data => {
          console.log("POST Request is successful ", data);
        },
        error => {
          console.log("Error", error);
        }

      )
      this.httpService.getdata("user")
      .subscribe(
        (data)=>{
          console.log("data added into the server : ",data);
        },
        error=>{
          console.log("error",error)
        }
      )
      

      

    }


  
}
















