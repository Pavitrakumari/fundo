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
import { CartService } from '../../core/services/http/cart/cart.service';
/**A componenet can be reused throughout the application & even in other applications */
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
/**To use components in other modules , we have to export them */
export class SignupComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  public selectedBefore=false;
  public array=[];

  /**it is a interface */
  /**OnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. */
  firstname = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]*')]);
  productId1: any;
  getErrorMessageFirstName() {/**validation for firstname of user */
    return this.firstname.hasError('required') ? 'first name is required' :
      this.firstname.hasError('firstname') ? 'Not a valid first name' :
        'Invalid lastname';
  }
  /**validation for firstname of user */
  lastname = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]*')]);
  getErrorMessageLastName() {
    return this.lastname.hasError('required') ? 'last name is required' :
      this.firstname.hasError('firstname') ? 'Not a valid last name' :
        'Invalid last name';
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
constructor(public httpService: HttpService,private userService:UserService, private cartService:CartService,public snackBar: MatSnackBar) { }
  /**method to get the service for the user */
  ngOnInit() {
    this.getCartDetails();
    let obs = this.userService.getDataService1();
    obs
    .pipe(takeUntil(this.destroy$))
    .subscribe((response) => {
     this.list = response["data"].data;
      for (let i = 0; i <this.list .length; i++) {
        this.card.push(this.list [i]);
      }
      // LoggerService.log(this.card);
    })
  }
  /**method used to respond the cards based on the selection of user */
  respond(card) {
    this.service = card.name;
    card.select = true;
    for (let i = 0; i < this.card.length; i++) {
      if (card.name == this.card[i].name) {
        continue;
      }
      this.card[i].select = false;
    }
  }
  
  clicked(card){
    if(card.select==true){
      this.selectedBefore=true;
      return;
    }
    card.select = true;
    for (let i = 0; i < this.array.length; i++) {
      if (card.index == this.array[i].index) {
        continue;
      }
      this.array[i].select = false;
    }

}
  model: any = {};
  /**signup method to post the data when a particular user is signed in successfully */
  signup() {
try{
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
          localStorage.setItem('firstName', data['firstName']);

          this.snackBar.open("successfully registered", "ACCOUNT CREATED", {
            duration: 10000,

          });

          
        }),
        

    this.userService.getDataService2()/**using the service to get the data that is posted into the server */
    .pipe(takeUntil(this.destroy$))
    .subscribe(
        (data) => {/**get the data if error doesnot exist */
        },
        error => {/**displays the error if any */
        })
  }
catch(error){
    LoggerService.log(error)
  }
}
private productId=localStorage.getItem('productId')
getCartDetails(){
  this.cartService.cartDetails(this.productId).subscribe(response=>{
  console.log('cartDetails',response);
  this.productId1=response['data']['product']['id']
  console.log("productid",this.productId1);
  // localStorage.removeItem('productId');
  // console.log('cartDetailssdssd',response['data']['id']);
  // console.log(this.productId);
  
  
  });
  
  }
  
ngOnDestroy() {
  this.destroy$.next(true);
  // Now let's also unsubscribe from the subject itself:
  this.destroy$.unsubscribe();
}
}
















