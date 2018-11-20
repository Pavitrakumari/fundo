/**component has imports , decorator & class */
import { Component, OnInit, OnDestroy  } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../core/services/http/http.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { LoggerService } from '../../core/services/logger/logger.service';
import { UserService } from '../../core/services/http/user/user.service';
import { NoteService } from '../../core/services/http/note/note.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
/**A componenet can be reused throughout the application & even in other applications */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
/**To use components in other modules , we have to export them */
export class LoginComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  model1: any = {
    "email": " ",
    "password": ""
  };
  hide = true;
  constructor(private noteService:NoteService,public httpService: HttpService,private userService:UserService, public router: Router, public snackBar: MatSnackBar) { }
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
    try{
    console.log(this.model1.emailid);
    console.log(this.model1.password);
    this.userService.postlogin( {
      "email": this.model1.emailid,
      "password": this.model1.password
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      data => {
        var email1 = this.model1.emailid;
        LoggerService.log("login successfull");
        this.router.navigate(["/home"]);
      
        localStorage.setItem('name', email1);
        localStorage.setItem('token', data['id']);
        localStorage.setItem('userId', data['userId']);
        localStorage.setItem('firstName', data['firstName']);
      
        localStorage.setItem('imageUrl',data['imageUrl']);
        
        LoggerService.log(data['id']);
        this.snackBar.open("successfully login","login", {
          duration: 10000,
        });
        var firstName=localStorage.getItem('firstName');
        LoggerService.log("firstName IN LOGIN",firstName);

        var pushToken=localStorage.getItem('pushToken')
        LoggerService.log('pushtoken in login',pushToken);

        var body={
          "pushToken":pushToken
        }
        this.noteService.postRegisterPushToken(body)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          data=>{
            LoggerService.log("post of pushToken is successful****************************",data)

          }),
          error=>{
            LoggerService.log(error,"error in pushToken");
            
          }




        }),
      error => {/**if error exists then displays the error message using snackbar */
        console.log("Error", error);
        this.snackBar.open("Please enter correct details ", "login  FAILED", {
          duration: 10000,
        });
      }}
   catch(error){
     LoggerService.log(error);
   } 
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
