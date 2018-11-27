import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}












import { ErrorHandler, Injectable} from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable()
export class ErrorsHandler implements ErrorHandler {
  constructor(public snackBar:MatSnackBar){}

  handleError(error: Error|HttpErrorResponse) {

     console.error('It happens: ', error);

if(error instanceof HttpErrorResponse){
  if(error.status==500){
  this.snackBar.open(error.statusText, "500", {
    duration: 10000,
});
}
if(error.status==400){
  this.snackBar.open(error.statusText, "400", {
    duration: 10000,
});
}
if(error.status==401){
  this.snackBar.open(error.statusText, "401", {
    duration: 10000,
});
}
if(error.status==404){
  this.snackBar.open(error.statusText, '404', {
    duration: 10000,
});
}
if(error.status==408){
  this.snackBar.open(error.statusText, "408", {
    duration: 10000,
});
}
if(error.status==422){
  this.snackBar.open(error.statusText, "422", {
    duration: 10000,
});
}
}
 
  }
}




