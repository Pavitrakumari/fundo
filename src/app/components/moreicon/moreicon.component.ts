/**component has imports , decorator & class */
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';

import { Component,Input,Output,EventEmitter, OnInit } from '@angular/core';
import{HttpService} from '../../services/http.service'
import {MatSnackBar} from '@angular/material';
import { AddlabelComponent } from '../addlabel/addlabel.component';
/**A componenet can be reused throughout the application & even in other applications */

@Component({
  selector: 'app-moreicon',/**A string value which represents the component on browser at execution time */
  templateUrl: './moreicon.component.html',/**External templating process to define html tags in component */
  styleUrls: ['./moreicon.component.css']/**It is used to provide style of components */
})
export class MoreiconComponent implements OnInit {
  token=localStorage.getItem('token');
  @Output() moreevent = new EventEmitter<any>();
/**Input and Output are two decorators in Angular responsible for communication between two components*/

@Input() arrayofnotes:any
  constructor(public dialog: MatDialog,public httpService: HttpService,public snackBar: MatSnackBar) { }
ngOnInit() {}
deletecard(){/**method to delete the cards */
  console.log(this.arrayofnotes);
  var model={
    "isDeleted":true,/**attributes to be passed to hit the api trashNotes */
    "noteIdList":[this.arrayofnotes.id]
  }/**hitting the api by passing the url & token */

  this.httpService.postdeletecard("notes/trashNotes",model,this.token).subscribe(data=>{
    console.log("deleted card successfully",data);/**if error doesnot exist the display the result */
    this.snackBar.open("successfully deleted notes", "deleted", {
      duration:10000,
    });
    this.moreevent.emit();/**to emit an event to the parent */
  })
}

addlabel() {
  this.dialog.open(AddlabelComponent, {
    data: {
      animal: 'panda',
      panelClass: 'myapp-no-padding-dialog'

    }
  });
}

}
