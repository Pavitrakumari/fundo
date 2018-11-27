import { Component, Inject,OnInit,Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DataService } from '../../core/services/data/data.service';
import { DialogcollaboratorComponent } from '../dialogcollaborator/dialogcollaborator.component';

@Component({
  selector: 'app-collaboratoricon',
  templateUrl: './collaboratoricon.component.html',
  styleUrls: ['./collaboratoricon.component.scss']
})
export class CollaboratoriconComponent implements OnInit {
constructor(private dialog:MatDialog) {}
  @Input() noteid;
  ngOnInit() {
  }
  opencollaborator(){
     this.dialog.open(DialogcollaboratorComponent, {/**open dialog  */
      width: '500px',
      maxWidth:'auto',
      // height:'500px',
      data:this.noteid,
      height:'auto',
       panelClass: 'myapp-no-padding-dialog' 
  });}
}
