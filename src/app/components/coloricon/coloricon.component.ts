/************************************************************************************************
*  Execution       :   1. default node         cmd> coloricon.ts 
*        
*  Purpose         : To include the coloricon into the notes cards
* 
*  Description    
* 
*  @file           : coloricon.ts
*  @overview       : To include the coloricon into the notes cards
*  @module         : coloricon.ts - This is optional if expeclictly its an npm or local package
*  @author         : Pavitrakumari <pavithra.korapati@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
/**component has imports , decorator & class */
import { Component, Input,OnDestroy, EventEmitter, Output, OnInit } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { MatSnackBar } from '@angular/material';
import { NoteService } from '../../core/services/http/note/note.service';
import { LoggerService } from '../../core/services/logger/logger.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
/**A componenet can be reused throughout the application & even in other applications */
@Component({
  selector: 'app-coloricon',
  /**A string value which represents the component on browser at execution time */
  templateUrl: './coloricon.component.html',
  /**External templating process to define html tags in component */
  styleUrls: ['./coloricon.component.scss']
  /**It is used to provide style of components */
})
/**To use components in other modules , we have to export them */
export class ColoriconComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  /**Input and Output are two decorators in Angular responsible for communication 
   * between two components*/
  @Input() newcolor;
  @Output() resp = new EventEmitter
  @Output() response = new EventEmitter<string>()
  constructor(private noteService:NoteService,public httpService: HttpService, public snackBar: MatSnackBar) { }
  
  colorsObject = [

    [{ 'color': '#ccff90', 'tipname': 'Green' },
    { 'color': '#cbf0f8', 'tipname': 'Blue' },
    { 'color': '#a7ffeb', 'tipname': 'Teal' },
    { 'color': '#aecbfa', 'tipname': 'Dark blue' }],

    [{ 'color': '#d7aefb', 'tipname': 'Purple' },
    { 'color': '#e6c9a8', 'tipname': 'Brown' },
    { 'color': '#fdcfe8', 'tipname': 'Pink' },
    { 'color': '#e8eaed', 'tipname': 'Gray' }],

    [{ 'color': '#ffffff', 'tipname': 'White' },
    { 'color': '#f28b82', 'tipname': 'Red' },
    { 'color': '#fbbc04', 'tipname': 'Orange' },
    { 'color': '#fff475', 'tipname': 'Yellow' }],]

  changecolor(paint)/**changecolor() method to change the color of notes */ {
try{
    this.response.emit(paint);
    let body = {
      "color": paint,/**attributes to be passed to change the color of notes */
      "noteIdList": [this.newcolor]
    }
  
    this.noteService.postchangecolor( body)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      data => {
        this.snackBar.open("color change success", "success", {/**snackbar to display the result */
          duration: 10000,
        });
        this.resp.emit();/**it emits an event containing a given value */
      })
      
    }
catch(error){
    }
  }
  /**it is a interface */
  /**OnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. */
  ngOnInit() { }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
