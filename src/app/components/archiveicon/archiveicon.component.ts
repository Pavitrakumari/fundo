/************************************************************************************************
*  Execution       :   1. default node         cmd> archiveicon.ts 
*        
*  Purpose         : To include the archive icon into the cards
* 
*  Description    
* 
*  @file           : archiveicon.ts
*  @overview       : To include the archive icon into the cards
*  @module         : notesparent.ts - This is optional if expeclictly its an npm or local package
*  @author         : Pavitrakumari <pavithra.korapati@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
/**component has imports , decorator & class */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service'
import { MatSnackBar } from '@angular/material';
/**A componenet can be reused throughout the application & even in other applications */
@Component({
  selector: 'app-archiveicon',
  templateUrl: './archiveicon.component.html',
  styleUrls: ['./archiveicon.component.css']
})
export class ArchiveiconComponent implements OnInit {
  @Input() noteid;
  @Output() archiveevent = new EventEmitter
  @Output() unarchiveevent = new EventEmitter<any>()

  public body: any = {}
  constructor(public httpService: HttpService, public snackBar: MatSnackBar) { }
  token = localStorage.getItem('token');
  archive() {
    console.log(this.noteid, "noteidd");
    var array = [];
    array.push(this.noteid.id)
    this.httpService.postdeletecard("notes/archiveNotes", this.body = {
      "isArchived": true,
      "noteIdList": array
    }, this.token).subscribe((response) => {
      console.log("archiveeeeeeeeeeeeeeeeeer changes successfully", response);
      this.snackBar.open("archive success", "success", {
        duration: 10000,
      });
      this.archiveevent.emit();
    },
      error => {
        console.log("error in coloring", error);
        this.snackBar.open("archive failllll", "failed", {
          duration: 10000,
        });
      })
  }
  unarchive() {
    console.log(this.noteid.id);
    var array = [];
    array.push(this.noteid.id)
    this.httpService.postdeletecard("notes/archiveNotes", this.body = {
      "isArchived": false,
      "noteIdList": array
    }, this.token).subscribe((response) => {
      console.log("Unarchiveeeeeeeeeeeeeeeeeer changes successfully", response);
      this.snackBar.open("Unarchive success", "success", {
        duration: 10000,
      });
      this.unarchiveevent.emit();
    },
      error => {
        console.log("error in archive", error);
        this.snackBar.open("Unarchive failllll", "failed", {
          duration: 10000,
        });
      })
  }
  ngOnInit() { }
}
