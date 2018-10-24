import { Component,OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { NgNoValidate } from '@angular/forms/src/directives/ng_no_validate_directive';
import { Router} from '@angular/router';import{HttpService} from '../../services/http.service'
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
name='';
firstchar='';
raw_data;
token;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(public snackBar: MatSnackBar,private breakpointObserver: BreakpointObserver,public httpService:HttpService,public router:Router) {}
  
  
  ngOnInit(){
    this.raw_data=localStorage.getItem('name');
    console.log("maad")
    this.token=localStorage.getItem('token');

    console.log(this.raw_data);
    var array=this.raw_data.split("");
    this.firstchar=array[0];
    console.log(this.firstchar);
    console.log("pichoiiii");
    // this.token=localStorage.getItem('token');
    console.log(this.token);
  }
  logout(){
    this.httpService.postlogout("user/logout",this.token)
    .subscribe(data=>{
      console.log(data);

    localStorage.removeItem('email');
    localStorage.removeItem('token');
    this.router.navigate(['login']);
    this.snackBar.open("successfully logout", "LOGOUT", {
      duration:10000,
    });

  },
  )}




}

