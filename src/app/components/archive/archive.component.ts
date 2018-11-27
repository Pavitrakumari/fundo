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
import { Component, OnInit ,OnDestroy} from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { MatSnackBar } from '@angular/material';
import { NoteService } from '../../core/services/http/note/note.service';
import { Notes } from '../../core/models/notes';
import { LoggerService } from '../../core/services/logger/logger.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  token;
  temp1 = [];
  list:Notes[]=[]
  constructor(private noteService:NoteService,public httpService: HttpService, public snackBar: MatSnackBar) { }
  ngOnInit() {
    this.getarchive();
  }
  archive(event) {
    this.getarchive();
  }
  getarchive() {

    this.noteService.getarchive()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {/**calling the noteservice method */
      this.temp1 = data['data'].data.reverse();/**reverse() method in typescript to display the data in reverse order */
    })
    
}
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }}
