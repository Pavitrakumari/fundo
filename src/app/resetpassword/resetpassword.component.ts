import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { HttpService } from '/home/administrator/fundo/src/app/services/http.service'
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  password=new FormControl('', [Validators.required]);
  getErrorMessagePassword() {
   return this.password.hasError('required') ? 'password is required' :
       this.password.hasError('password') ? 'Not a valid password' :
           'Minimum 8 characters required';
 }
  model:any={
    "password":""
  } ;
  hide=true;

  constructor(private service:HttpService,public route:ActivatedRoute ,public snackBar: MatSnackBar)  { }
  // public token=this.route.snapshot.params.id;

  ngOnInit() {
  }
  public token=this.route.snapshot.params.id;

set(){
  var body={

    "newPassword":this.model.password
  }
  
  if(this.model.password.length==0){

    this.snackBar.open("Must provide some password","FAILED",{
      duration:10000,
    });
    return;
 
   // console.log("please enter the password");
  }
  this.service.postpassword("user/reset-password",body,this.token).subscribe(Response=>{
    console.log("successful",Response);
    this.snackBar.open("Success"," password",{
      duration:10000,
    });

  },
  error=>{
    console.log("failedhhhhhhhhhhhhhhhhh",error)
    console.log(error);
    this.snackBar.open("failed","madhaviiiiiiiiiiii",{
      duration:10000,


  });

      if(error.status==404)
      this.snackBar.open("failed","failllllllllllllllllll",{
        duration:10000,


    });

  })
  console.log('the id is  ',this.token);
  
}
}
