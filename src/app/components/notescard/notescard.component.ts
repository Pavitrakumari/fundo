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
  @Output() noteevent= new EventEmitter<any>();
  @Output() colorevent= new EventEmitter<any>();
  @Output() archiveevent= new EventEmitter<any>();
  @Output() updateevent= new EventEmitter<any>();

  @Input() myData
  animal: string;
  name: string;
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
    width: '550px',
    data: dialogdata,
    panelClass: 'myapp-no-padding-dialog'
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    
    this.updateevent.emit();
    // this.animal = data;
  });
}


}
