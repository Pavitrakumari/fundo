import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-addlabel',
  templateUrl: './addlabel.component.html',
  styleUrls: ['./addlabel.component.css']
})
export class AddlabelComponent implements OnInit {
  disabled = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  ngOnInit() {}
}
