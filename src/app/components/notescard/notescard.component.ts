/************************************************************************************************
*  Execution       :   1. default node         cmd> notescard.ts 
*        
*  Purpose         : To add the cards down & display the collection of cards after the click of close button
* 
*  Description    
* 
*  @file           : notescard.js
*  @overview       : To add the cards down & display the collection of cards after the click of close button
*  @module         : notescard.ts - This is optional if expeclictly it's an npm or local package
*  @author         : Pavitrakumari <pavithra.korapati@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/

/**component has imports , decorator & class */
import { Component,Input, EventEmitter,OnInit, Output } from '@angular/core';
import { HttpService } from '../../services/http.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

/**A componenet can be reused throughout the application & even in other applications */

@Component({
  selector: 'app-notescard',/**A string value which represents the component on browser at execution time */
  templateUrl: './notescard.component.html',/**External templating process to define html tags in component */
  styleUrls: ['./notescard.component.css']/**It is used to provide style of components */
})
/**To use components in other modules , we have to export them */
export class NotescardComponent implements OnInit {
  /**To be able to use our output we need to import & bind a new instance of the event emitter to it */
  @Output() noteevent= new EventEmitter<any>();
  @Output() colorevent= new EventEmitter<any>();
  @Output() archiveevent= new EventEmitter<any>();
  @Output() updateevent= new EventEmitter<any>();
  @Input() myData
  constructor(public httpService: HttpService,public dialog: MatDialog) { }
/**Input and Output are two decorators in Angular responsible for communication between two components*/
/**myData is a varaible */
/**it is a interface */
/**OnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. */
  ngOnInit() {}
  receive($event){/**callback will be invoked &data associated with the event will be given to us via $event property */
    this.noteevent.emit();
  }
color($event){/**callback will be invoked &data associated with the event will be given to us via $event property */
    this.colorevent.emit();
}
archive($event){/**callback will be invoked &data associated with the event will be given to us via $event property */
    this.archiveevent.emit();
}

openDialog(dialogdata): void {
  const dialogRef = this.dialog.open(DialogComponent, {
    width: '550px',/**width of the dialog box */
    data: dialogdata,/**paramaeter that we are passing */
    panelClass: 'myapp-no-padding-dialog'/**to change the padding in dialog box */
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.updateevent.emit();/**emit an event to the parent */
  });
}


}
