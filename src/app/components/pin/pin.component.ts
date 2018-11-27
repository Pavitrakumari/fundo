/************************************************************************************************
*  Execution       :   1. default node         cmd> pin.ts 
*        
*  Purpose         : To make the cards pinned & unpinned
* 
*  Description    
* 
*  @file           : pin.ts
*  @overview       : To make the note cards pinned & unpinned
*  @module         : pin.ts - This is optional if expeclictly its an npm or local package
*  @author         : Pavitrakumari <pavithra.korapati@gmail.com>
*  @since          : 10-11-2018
*
*************************************************************************************************/
/**component has imports , decorator & class */

import { Component,Input,Output,OnInit,EventEmitter,OnDestroy } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoggerService } from '../../core/services/logger/logger.service';
import { NoteService } from '../../core/services/http/note/note.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  @Output() pinevent = new EventEmitter<any>();
@Input()  noteid;

  constructor(
    private noteService:NoteService,
    public httpService: HttpService,
    public snackBar: MatSnackBar) { }
  // @Input() myData;
  
  public isDeleted = false;
  token = localStorage.getItem('token');
  public body: any = {};
public isPinned=false;
public newPin=true;



  ngOnInit() {
    if (this.noteid != undefined && this.noteid.isDeleted == true ) {
      this.isDeleted = true;
    }
    if (this.noteid != undefined && this.noteid.isPined == true) {
      this.isPinned = true;
     
    }
  
   }

   pin(){
try{
    if(this.noteid!=undefined){
      if (this.noteid.isPined == true){
        this.newPin = false;
      }
      let arr = []
      arr.push(this.noteid.id)
      LoggerService.log("arr",arr);
      if (this.noteid.id != undefined) {
        let body={
          "isPined": this.newPin,
          "noteIdList": arr
        }
        this.noteService.postPinUnpin(body )
        .pipe(takeUntil(this.destroy$))
        .subscribe((data)=>{
                this.pinevent.emit();
              });
            }
          }
        }
catch(error){
          LoggerService.log(error)
        }
      }
      ngOnDestroy() {
        this.destroy$.next(true);
        // Now let's also unsubscribe from the subject itself:
        this.destroy$.unsubscribe();
      }
      }
/**
 * 
 */