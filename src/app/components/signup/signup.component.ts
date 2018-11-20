/**component has imports , decorator & class */
import { Component, OnInit ,OnDestroy} from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Notes } from '../../core/models/notes';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { UserService } from '../../core/services/http/user/user.service';
import { LoggerService } from '../../core/services/logger/logger.service';
/**A componenet can be reused throughout the application & even in other applications */
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
/**To use components in other modules , we have to export them */
export class SignupComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

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
  list:Notes[]=[]
constructor(public httpService: HttpService,private userService:UserService, public snackBar: MatSnackBar) { }
  /**method to get the service for the user */
  ngOnInit() {
    let obs = this.userService.getDataService1();
    obs
    .pipe(takeUntil(this.destroy$))
    .subscribe((response) => {
     this.list = response["data"].data;
      for (var i = 0; i <this.list .length; i++) {
        this.card.push(this.list [i]);
      }
      // LoggerService.log(this.card);
    })
  }
  /**method used to respond the cards based on the selection of user */
  respond(card) {
    LoggerService.log(card.name);
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
try{
    LoggerService.log(this.model.Firstname)
    LoggerService.log(this.model.Lastname)
    LoggerService.log(this.model.Username)
    LoggerService.log(this.model.password)
    this.userService.postsignup(
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
      .pipe(takeUntil(this.destroy$))
      .subscribe(/**if no error then data is posted with the given message */
        data => {
          LoggerService.log("POST Request is successful ", data);
          localStorage.setItem('firstName', data['firstName']);

          this.snackBar.open("successfully registered", "ACCOUNT CREATED", {
            duration: 10000,

          });
          var firstName=localStorage.getItem('firstName');

          LoggerService.log("firstname in signin",firstName);
          
        }),
        error => {/**if error exists then displays the error message using snackbar */
          LoggerService.log("Error", error);
          this.snackBar.open("All the details must be filled  ", "SIGNUP FAILED", {
            duration: 10000,
          });
        }

    this.userService.getDataService2()/**using the service to get the data that is posted into the server */
    .pipe(takeUntil(this.destroy$))
    .subscribe(
        (data) => {/**get the data if error doesnot exist */
          LoggerService.log("data added into the server : ", data);
        },
        error => {/**displays the error if any */
          LoggerService.log("error", error)
        })
  }
catch(error){
    LoggerService.log(error)
  }
}
ngOnDestroy() {
  this.destroy$.next(true);
  // Now let's also unsubscribe from the subject itself:
  this.destroy$.unsubscribe();
}
}
















