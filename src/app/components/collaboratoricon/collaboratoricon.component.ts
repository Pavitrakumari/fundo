import { Component, Inject,OnInit } from '@angular/core';
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

  ngOnInit() {
  }
  opencollaborator(){
    const dialogRef = this.dialog.open(DialogcollaboratorComponent, {/**open dialog  */
      
      width: '500px',
      data:'',
      height:'auto',
       panelClass: 'myapp-no-padding-dialog' 
  });
  
  }
}
