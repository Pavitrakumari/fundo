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
import { Component, OnInit ,OnDestroy} from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreatenewlabelComponent } from '../createnewlabel/createnewlabel.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../../core/services/data/data.service';
import { HttpService } from '../../core/services/http/http.service';
import { MatSnackBar } from '@angular/material';
import { LoggerService } from '../../core/services/logger/logger.service'
import { CropImageComponent } from '../cropimage/cropimage.component';
import { environment } from '../../../environments/environment';
import { UserService } from '../../core/services/http/user/user.service';
import { NoteService } from '../../core/services/http/note/note.service';
import { Notes } from '../../core/models/notes';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

/**A componenet can be reused throughout the application & even in other applications */
@Component({
  selector: 'app-toolbar',/**A string value which represents the component on browser at execution time */
  templateUrl: './toolbar.component.html',/**External templating process to define html tags in component */
  styleUrls: ['./toolbar.component.scss']/**It is used to provide style of components */
})
/**To use components in other modules , we have to export them */
export class ToolbarComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

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
  value;
  list:Notes[]=[]
  constructor(private noteService:NoteService,private dataservice: DataService, public dialog: MatDialog, 
    public snackBar: MatSnackBar,
     private breakpointObserver: BreakpointObserver, 
     public httpService: HttpService,public userService:UserService ,public route:ActivatedRoute,public router: Router) { }
  /**it is a interface */
  /**OnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. */
ngOnInit() {
  // this.value="fundoo Notes"
this.dataservice.label
.pipe(takeUntil(this.destroy$))
.subscribe(message=>this.value=message)
this.route.firstChild.paramMap.subscribe(
  (params: ParamMap) => {

    this.value = params['params'].id;

  })
if (this.router.url == "/home/notes") {
  this.value = "fundooNotes"
}
if (this.router.url == "/home/archive") {
  this.value = "Archive"
}
if (this.router.url == "/home/search") {
  this.value = "Search"
}
if (this.router.url == "/home/reminders") {
  this.value = "Reminders"
}
if (this.router.url == "/home/trash") {
  this.value = "Trash"
}
if (this.router.url == "/home/trash") {
  this.value = "Trash"
}
else{
  this.value="fundooNotes"
}

    this.raw_data = localStorage.getItem('name');/**get the name from local storahe */
    this.firstName=localStorage.getItem('firstName');
    let array = this.raw_data.split("");/**split the name & pass it to a variable array */
    this.firstchar = array[0];/**first character of the name is passed to 'firstchar' variable */
    this.getLabels();
  }
  titlechange(values){
    
    this.value=values

  }
  labelheading(values){

    this.value=values.label

  }
  refresh(){
    location.reload();
  }
logout() {
  try{
    this.userService.postlogout()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {/**registers handlers for events emitted by the instance */
      localStorage.removeItem('email');/**remove email from local storage when logout */
      localStorage.removeItem('token');/**remove token from local storage when logout */
      // localStorage.clear();
      this.router.navigate(['/login']);/**when logout() is performed then navigate the page to login */
      this.snackBar.open("successfully logout", "LOGOUT", {/**snackbar to display the result */
        duration: 10000,/**for a duration of 10 seconds */
      });
    })
  }
  catch(error){
    LoggerService.log(error)
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
    dialogRef.afterClosed()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      this.getLabels();
    })
  }
getLabels() {
try{
    this.noteService.getlabels()
    .pipe(takeUntil(this.destroy$))
    .subscribe(response => {
        this.labelarray = [];
        this.list=response['data'].details
        for (let i = 0; i < (this.list).length; i++) {
          if (this.list[i].isDeleted == false) {
            this.labelarray.push(response['data'].details[i])
          }
        }
        // console.log(this.labelarray, "Label array printing success bujji so sweet of you");

      })
      
    }
catch(error){
      LoggerService.log(error)
    }
  }
  searchbutton() {/**navigate the page to a child component when the search is clicked */
    this.router.navigate(['home/search']);
    /**The Angular Router enables navigation from one view to the next as users perform application tasks.*/
  }
  passmessage() {
    this.dataservice.changeMessage(this.searchInput);
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
img=environment.profileUrl+this.image2;/** */
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
LoggerService.log(error);

}
}

public pic;
  openDialogCrop(data): void {
    const dialogRefcrop = this.dialog.open(CropImageComponent, {
      width: '500px',

      data: data

    });
/**variable declared in changeprofile method of dataservice */
    dialogRefcrop.afterClosed()
    .pipe(takeUntil(this.destroy$))
    .subscribe(response => {
      this.dataservice.imageprofile
      .pipe(takeUntil(this.destroy$))
      .subscribe(message => this.pic = message)
      if (this.pic == true) {
        this.image2 = localStorage.getItem('imageUrl');
        this.img = environment.profileUrl + this.image2;
      }
    });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}



