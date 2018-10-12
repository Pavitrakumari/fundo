import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { HttpService } from '/home/administrator/fundo/src/app/services/http.service'

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  hide=true;
  
    getErrorMessage() {
      return this.email.hasError('required') ? 'You must enter a value' :
          this.email.hasError('email') ? 'Not a valid email' :
              '';
    }



   model:any={
     "email":""
   } 
  constructor(private resetService: HttpService,public snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  reset(){
    console.log(this.model.email);

    if(this.model.email.length==0)
    {
      
      
      
      this.snackBar.open("FAILED","PLEASE ENTER EMAIL",{
        duration:10000,
      });
      return;
    }
    this.resetService.postdata("user/reset",{
      "email":this.model.email
    }).subscribe(
      Response=> {
        console.log("New  password link has been sent to your registered email,please check...");
      this.snackBar.open("Check your email","For password",{
        duration:10000,
      });
      console.log(Response);
    },(error)=>{
      console.log("login unsuccessful");
      console.log(error);
      if(error.status==404)
      this.snackBar.open("failed","Email not found",{
        duration:10000,


    });



    });


  }

}
