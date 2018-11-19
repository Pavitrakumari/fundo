/************************************************************************************************  Execution       :   1. default node         cmd> notesparent.ts 
*  Purpose         : To archive  the notes which are present in the notes collection
* 
*  Description    
* 
*  @file           : archive.ts
*  @overview       : To archive  the notes which are present in the notes collection
*  @module         : archive.ts - This is optional if expeclictly its an npm or local package
*  @author         : Pavitrakumari <pavithra.korapati@gmail.com>
*  @since          : 20-10-2018
*
***********************************************************************************************/
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { MatSnackBar } from '@angular/material';
import { NoteService } from '../../core/services/http/note/note.service';
@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  token;
  temp1 = [];
  constructor(private noteService:NoteService,public httpService: HttpService, public snackBar: MatSnackBar) { }
  ngOnInit() {
    this.getarchive();
  }
  archive(event) {
    this.getarchive();
  }
  getarchive() {
    this.token = localStorage.getItem('token');/**get the token from the local storage */
    this.noteService.getcard("notes/getArchiveNotesList", this.token).subscribe(data => {
      /**hitting the api by passing the url & token */
      console.log("get cards list successfull", data);
      this.temp1 = data['data'].data.reverse();/**reverse() method in typescript to display the data in reverse order */
      // console.log(this.temp1);
    })
    error => {
      /**if error occurs then display the error */
      // console.log("error", error);
    }
  }
}
