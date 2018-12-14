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
import { CartService } from '../../core/services/http/cart/cart.service';
import { Notes } from '../../core/models/notes';

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
  service; 
  public card = [];
  public selectedBefore=false;
  public array = [];

  productId1: any;
  list:Notes[]=[]

  hide = true;
  constructor(private cartService:CartService,private noteService:NoteService,public httpService: HttpService,private userService:UserService, public router: Router, public snackBar: MatSnackBar) { }
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
    this.clicked(this.card);
    this.respond(this.card)
    let token;
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
        let email1 = this.model1.emailid;
        LoggerService.log("login successfull");
        this.router.navigate(["/home"]);
      
        localStorage.setItem('name', email1);
        localStorage.setItem('token', data['id']);
        localStorage.setItem('userId', data['userId']);
        localStorage.setItem('firstName', data['firstName']);
        localStorage.setItem('lastName', data['lastName']);
        localStorage.setItem('imageUrl',data['imageUrl']);

        this.snackBar.open("successfully login","login", {
          duration: 10000,
        });
        let pushToken=localStorage.getItem('pushToken')
        let body={
          "pushToken":pushToken
        }
        this.noteService.postRegisterPushToken(body)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          data=>{
            LoggerService.log("login success",data)

          })

        })
      
      
    }
   catch(error){
     LoggerService.log(error);
   } 
  }

private productId=localStorage.getItem('productId');
getCartDetails(){
  this.cartService.cartDetails(this.productId).subscribe(response=>{
  console.log('cartDetails',response);
  this.productId1=response['data']['product']['id']
  console.log("productid",this.productId1);
});
}
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
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
