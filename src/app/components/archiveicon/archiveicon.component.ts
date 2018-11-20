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
import { Component, OnInit,OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { MatSnackBar } from '@angular/material';
import { NoteService } from '../../core/services/http/note/note.service';
import { Notes } from '../../core/models/notes';
import { LoggerService } from '../../core/services/logger/logger.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

/**A componenet can be reused throughout the application & even in other applications */
@Component({
  selector: 'app-archiveicon',
  templateUrl: './archiveicon.component.html',
  styleUrls: ['./archiveicon.component.scss']
})
export class ArchiveiconComponent implements OnInit ,OnDestroy{
  destroy$: Subject<boolean> = new Subject<boolean>();

  @Input() noteid;
  @Output() archiveevent = new EventEmitter
  @Output() unarchiveevent = new EventEmitter<any>()
  list:Notes[]=[]
  public body: any = {}
  constructor(private noteService:NoteService,public httpService: HttpService, public snackBar: MatSnackBar) { }
 
  archive() {
try{
    LoggerService.log(this.noteid, "noteidd");
    var array = [];
    array.push(this.noteid.id);
    this.noteService.postArchivenotes( this.body = {
      "isArchived": true,
      "noteIdList": array
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe((response) => {
      LoggerService.log("archiveeeeeeeeeeeeeeeeeer changes successfully", response);
      this.snackBar.open("archive success", "success", {
        duration: 10000,
      });
      this.archiveevent.emit();
    },
      error => {
        LoggerService.log("error in coloring", error);
        this.snackBar.open("archive failllll", "failed", {
          duration: 10000,
        });
      })
    }
catch(error){
      LoggerService.log(error);
    }
    }
  unarchive() {
try{
    LoggerService.log(this.noteid.id);
    var array = [];
    array.push(this.noteid.id)
    this.noteService.postArchivenotes( this.body = {
      "isArchived": false,
      "noteIdList": array
    })
    .pipe(takeUntil(this.destroy$))

    .subscribe((response) => {
      LoggerService.log("Unarchiveeeeeeeeeeeeeeeeeer changes successfully", response);
      this.snackBar.open("Unarchive success", "success", {
        duration: 10000,
      });
      this.unarchiveevent.emit();
    },
      error => {
        LoggerService.log("error in archive", error);
        this.snackBar.open("Unarchive failllll", "failed", {
          duration: 10000,
        });
      })
    }
catch(error){
      LoggerService.log(error);
    }
  }
  ngOnInit() { }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
