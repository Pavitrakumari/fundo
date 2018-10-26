/**component has imports , decorator & class */
import { Component,OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router} from '@angular/router';
import{HttpService} from '../../services/http.service';
import {MatSnackBar} from '@angular/material';
/**A componenet can be reused throughout the application & even in other applications */
@Component({
  selector: 'app-toolbar',/**A string value which represents the component on browser at execution time */
  templateUrl: './toolbar.component.html',/**External templating process to define html tags in component */
  styleUrls: ['./toolbar.component.css']/**It is used to provide style of components */
})
/**To use components in other modules , we have to export them */
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
  /**it is a interface */
  /**OnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. */
  ngOnInit(){
    this.raw_data=localStorage.getItem('name');/**get the name from local storahe */
    this.token=localStorage.getItem('token');/**get the token from local storage */
    console.log(this.raw_data);
    var array=this.raw_data.split("");/**split the name & pass it to a variable array */
    this.firstchar=array[0];/**first character of the name is passed to 'firstchar' variable */
    console.log(this.firstchar);
    console.log(this.token);/**display the token & firstchar */
  }
  logout(){/**logout() function */
    this.httpService.postlogout("user/logout",this.token)
    .subscribe(data=>{/**registers handlers for events emitted by the instance */
      console.log(data);
      localStorage.removeItem('email');/**remove email from local storage when logout */
      localStorage.removeItem('token');/**remove token from local storage when logout */
      this.router.navigate(['login']);/**when logout() is performed then navigate the page to login */
      this.snackBar.open("successfully logout", "LOGOUT", {/**snackbar to display the result */
      duration:10000,/**for a duration of 10 seconds */
    });

  },
  )}
}

