/**component has imports , decorator & class */
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { UserService } from '../../core/services/http/user/user.service';
/**A componenet can be reused throughout the application & even in other applications */
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
/**To use components in other modules , we have to export them */
export class SignupComponent implements OnInit {
  /**it is a interface */
  /**OnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. */
  firstname = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]*')]);
  getErrorMessageFirstName() {/**validation for firstname of user */
    return this.firstname.hasError('required') ? 'first name is required' :
      this.firstname.hasError('firstname') ? 'Not a valid first name' :
        'Not a valid first name';
  }
  /**validation for firstname of user */
  lastname = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]*')]);
  getErrorMessageLastName() {
    return this.lastname.hasError('required') ? 'last name is required' :
      this.firstname.hasError('firstname') ? 'Not a valid last name' :
        'Not a valid last name';
  }
  /**validation for firstname of user */
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
  /**validation for firstname of user */
  password = new FormControl('', [Validators.required]);
  getErrorMessagePassword() {
    return this.password.hasError('required') ? 'password is required' :
      this.password.hasError('password') ? 'Not a valid password' :
        'Minimum 8 characters required';
  }
  public card = [];
  public arr = [];
  service;
  constructor(public httpService: HttpService,private userService:UserService, public snackBar: MatSnackBar) { }
  /**method to get the service for the user */
  ngOnInit() {
    let obs = this.userService.getDataService("user/service");
    obs.subscribe((response) => {
      var data = response["data"];
      for (var i = 0; i < data.data.length; i++) {
        this.card.push(data.data[i]);
      }
      console.log(this.card);
    })
  }
  /**method used to respond the cards based on the selection of user */
  respond(card) {
    console.log(card.name);
    this.service = card.name;
    card.select = true;
    for (var i = 0; i < this.card.length; i++) {
      if (card.name == this.card[i].name) {
        continue;
      }
      this.card[i].select = false;
    }
  }
  model: any = {};
  /**signup method to post the data when a particular user is signed in successfully */
  signup() {
    console.log(this.model.Firstname)
    console.log(this.model.Lastname)
    console.log(this.model.Username)
    console.log(this.model.password)
    this.userService.postdata("user/userSignUp",
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
      .subscribe(/**if no error then data is posted with the given message */
        data => {
          console.log("POST Request is successful ", data);
          localStorage.setItem('firstName', data['firstName']);

          this.snackBar.open("successfully registered", "ACCOUNT CREATED", {
            duration: 10000,

          });
          var firstName=localStorage.getItem('firstName');

          console.log("firstname in signin",firstName);
          
        }),
        error => {/**if error exists then displays the error message using snackbar */
          console.log("Error", error);
          this.snackBar.open("All the details must be filled  ", "SIGNUP FAILED", {
            duration: 10000,
          });
        }

    this.userService.getDataService("user")/**using the service to get the data that is posted into the server */
      .subscribe(
        (data) => {/**get the data if error doesnot exist */
          console.log("data added into the server : ", data);
        },
        error => {/**displays the error if any */
          console.log("error", error)
        })
  }
}
















