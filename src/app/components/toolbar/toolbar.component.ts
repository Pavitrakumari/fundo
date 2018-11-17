/************************************************************************************************
*  Execution       :   1. default node         cmd> toolbar.ts 
*        
*  Purpose         : To create the dashboard layout containing sidenav,sidenav container & toolbar
* 
*  Description    
* 
*  @file           : toolbar.ts
*  @overview       : To create the dashboard layout containing sidenav,sidenav container & toolbar
*  @module         : toolbar.ts - This is optional if expeclictly its an npm or local package
*  @author         : Pavitrakumari <pavithra.korapati@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
/**component has imports , decorator & class */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { AddlabelComponent } from '../addlabel/addlabel.component';
import { CreatenewlabelComponent } from '../createnewlabel/createnewlabel.component';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataService } from '../../core/services/data/data.service';
import { HttpService } from '../../core/services/http/http.service';
import { MatSnackBar } from '@angular/material';
import { LoggerService } from '../../core/services/logger/logger.service'
import { ImageCroppedEvent } from 'ngx-image-cropper/src/image-cropper.component';
import { CropImageComponent } from '../cropimage/cropimage.component';
import { environment } from '../../../environments/environment';
/**A componenet can be reused throughout the application & even in other applications */
@Component({
  selector: 'app-toolbar',/**A string value which represents the component on browser at execution time */
  templateUrl: './toolbar.component.html',/**External templating process to define html tags in component */
  styleUrls: ['./toolbar.component.scss']/**It is used to provide style of components */
})
/**To use components in other modules , we have to export them */
export class ToolbarComponent implements OnInit {
  labelarray;
  name = '';
  number = 1;
  firstchar = '';
  raw_data;
  firstName;
  token;
  message: string;
  searchInput;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  value: any;
  constructor(private dataservice: DataService, public dialog: MatDialog, public snackBar: MatSnackBar, private breakpointObserver: BreakpointObserver, public httpService: HttpService, public router: Router) { }
  /**it is a interface */
  /**OnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. */
ngOnInit() {
  this.value="fundoo Notes"
this.dataservice.label.subscribe(message=>this.value=message)
    this.raw_data = localStorage.getItem('name');/**get the name from local storahe */
    this.firstName=localStorage.getItem('firstName');

    // this.name=localstorage.
    this.token = localStorage.getItem('token');/**get the token from local storage */
    console.log(this.raw_data);
    var array = this.raw_data.split("");/**split the name & pass it to a variable array */
    this.firstchar = array[0];/**first character of the name is passed to 'firstchar' variable */
    console.log(this.firstchar);
    console.log(this.token);/**display the token & firstchar */
    this.getLabels();
  }
  titlechange(values){
    console.log("hello title");
    
    this.value=values

  }
  labelheading(values){

    this.value=values.label

  }
logout() {
    console.log("logoutt running");
    this.httpService.postlogout("user/logout", this.token).subscribe(data => {/**registers handlers for events emitted by the instance */
      console.log("success in logouttttt", data);
      localStorage.removeItem('email');/**remove email from local storage when logout */
      localStorage.removeItem('token');/**remove token from local storage when logout */
      this.router.navigate(['/login']);/**when logout() is performed then navigate the page to login */
      this.snackBar.open("successfully logout", "LOGOUT", {/**snackbar to display the result */
        duration: 10000,/**for a duration of 10 seconds */
      });
    }), error => {
      console.log("error in logout", error);
      this.snackBar.open("unsuccess logout", "LOGOUT", {/**snackbar to display the result */
        duration: 10000,/**for a duration of 10 seconds */
      });
    }
  }
addlabel() {/**addlabel() method to open the add-label dialog box when it is clicked */
    const dialogRef = this.dialog.open(CreatenewlabelComponent, {/**open dialog  */
      
        width: '250px',
        data:'',
        // overflow:'scroll',
        // word-wrap: break-word,
         panelClass: 'myapp-no-padding-dialog' 
    });
    dialogRef.afterClosed().subscribe(data => {
      this.getLabels();
    })
  }
getLabels() {
    this.httpService.getcard("noteLabels/getNoteLabelList", this.token)
      .subscribe(response => {
        this.labelarray = [];
        console.log(response['data'].details);
        for (var i = 0; i < (response['data'].details).length; i++) {
          if (response['data'].details[i].isDeleted == false) {
            this.labelarray.push(response['data'].details[i])
          }
        }
        // console.log(this.labelarray, "Label array printing success bujji so sweet of you");
        LoggerService.log(this.labelarray+"Label array printing success bujji so sweet of you" );

      }),
      error => {
        console.log("error in get LABELS", error);
      }
  }
  searchbutton() {/**navigate the page to a child component when the search is clicked */
    this.router.navigate(['home/search']);
    /**The Angular Router enables navigation from one view to the next as users perform application tasks.*/
  }
  passmessage() {
    this.dataservice.changeMessage(this.searchInput);
  }
  onFileUpload(event) {
    const file = event.target.files;
  }
  listview() {
    this.number = 0;
    this.dataservice.changeMessage3(false);
  }
  gridview() {
    this.number = 1;
    this.dataservice.changeMessage3(true);
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';
  


selectedFile = null;/**initially the file is assigned as null */
public image2=localStorage.getItem('imageUrl');/**get the image url from the local storage */
img="http://34.213.106.173/"+this.image2;/** */
onImageUpload(event){
  try{
  this.imageChangedEvent = event;
  /**a method to upload the image by triggering the event */
this.selectedFile=event.path[0].files[0];/**assihning the path & files of event to the selected file */
const uploadData = new FormData();/**it is used to transmit keyed data */
/**FormData.append():Appends a new value onto an existing key inside a FormData object,
 * or adds the key if it does not already exist.*/

 uploadData.append('file', this.selectedFile, this.selectedFile.name);
 this.openDialogCrop(event);
}
catch(error){
console.log(error);

}
}

public pic;
  openDialogCrop(data): void {
    const dialogRefcrop = this.dialog.open(CropImageComponent, {
      width: '500px',

      data: data

    });
/**variable declared in changeprofile method of dataservice */
    dialogRefcrop.afterClosed().subscribe(response => {
      this.dataservice.imageprofile.subscribe(message => this.pic = message)
      if (this.pic == true) {
        this.image2 = localStorage.getItem('imageUrl');
        this.img = environment.profileUrl + this.image2;
      }
    });
  }

}



