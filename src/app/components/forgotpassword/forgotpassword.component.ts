import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { HttpService } from '../../core/services/http/http.service';
import { UserService } from '../../core/services/http/user/user.service';
import { LoggerService } from '../../core/services/logger/logger.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
  model: any = {
    "email": ""
  }
  constructor(private userService:UserService,private resetService: HttpService, public snackBar: MatSnackBar) { }
  ngOnInit() {
  }
  reset() {
    if (this.model.email.length == 0) {
      this.snackBar.open("FAILED", "PLEASE ENTER EMAIL", {
        duration: 10000,
      });
      return;
    }
    this.userService.postreset(
       {
      "email": this.model.email
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      Response => {
        this.snackBar.open("Check your email", "For password", {
          duration: 10000,
        });
        console.log(Response);
      }, (error) => {
        LoggerService.log("error",error);
        if (error.status == 404)
          this.snackBar.open("failed", "Email not found", {
            duration: 10000,
          });
      });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
