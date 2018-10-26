/**component has imports , decorator & class */

import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import{HttpService} from '../../services/http.service'
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-archiveicon',
  templateUrl: './archiveicon.component.html',
  styleUrls: ['./archiveicon.component.css']
})
export class ArchiveiconComponent implements OnInit {
  @Input() noteid;
  @Output() archiveevent=new EventEmitter
public body:any={

}
  constructor(public httpService: HttpService,public snackBar: MatSnackBar) { }
  token=localStorage.getItem('token');
archive(){
  console.log(this.noteid);
  var array=[];
  array.push(this.noteid)
  this.httpService.postdeletecard("notes/archiveNotes",this.body={
    "isArchived":true,
    "noteIdList":array
  },this.token).subscribe((response)=>
    {
      console.log("archiveeeeeeeeeeeeeeeeeer changes successfully",response);
      this.snackBar.open("archive success", "success", {
        duration:10000,
      });
      this.archiveevent.emit();
    },
    error=>{
      console.log("error in coloring",error);
      this.snackBar.open("archive failllll", "failed", {
        duration:10000,
      });

      })
}
  ngOnInit() {
  }

}
