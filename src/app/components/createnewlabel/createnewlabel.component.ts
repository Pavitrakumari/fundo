import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-createnewlabel',
  templateUrl: './createnewlabel.component.html',
  styleUrls: ['./createnewlabel.component.css']
})
export class CreatenewlabelComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  
}
