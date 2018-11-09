/**component has imports , decorator & class */
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../core/services/http/http.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
/**A componenet can be reused throughout the application & even in other applications */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
/**To use components in other modules , we have to export them */
export class LoginComponent implements OnInit {
  model1: any = {
    "email": " ",
    "password": ""
  };
  hide = true;
  constructor(public httpService: HttpService, public router: Router, public snackBar: MatSnackBar) { }
  ngOnInit() {
    var token;
    if (localStorage.getItem('token')) {
      this.router.navigate(['/home']);
    }
  }
  /**it is a interface */
  /**OnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. */
  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
  password = new FormControl('', [Validators.required]);
  getErrorMessagePassword() {
    return this.password.hasError('required') ? 'password is required' :
      this.password.hasError('password') ? 'Not a valid password' :
        'Minimum 8 characters required';
  }
  next() {
    console.log(this.model1.emailid);
    console.log(this.model1.password);
    this.httpService.postdata("user/login", {
      "email": this.model1.emailid,
      "password": this.model1.password
    }).subscribe(
      data => {
        var email1 = this.model1.emailid;
        console.log("login successfull");
        this.router.navigate(["/home"]);
        localStorage.setItem('name', email1);
        localStorage.setItem('token', data['id']);
        localStorage.setItem('userId', data['userId']);
        localStorage.setItem('imageUrl',data['imageUrl']);
        console.log(data['id']);
        this.snackBar.open("successfully login","login", {
          duration: 10000,
        });
      },
      error => {/**if error exists then displays the error message using snackbar */
        console.log("Error", error);
        this.snackBar.open("Please enter correct details ", "login  FAILED", {
          duration: 10000,
        });
      }
    )
  }
}
