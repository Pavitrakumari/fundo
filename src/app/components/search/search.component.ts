import { Component, OnInit,OnDestroy } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { DataService } from '../../core/services/data/data.service';
import { NoteService } from '../../core/services/http/note/note.service';
import { Notes } from '../../core/models/notes';
import { LoggerService } from '../../core/services/logger/logger.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  token;
  temp = [];
  arraynewdata = [];
  public searchInput;
  list:Notes[]=[]
constructor(private noteService:NoteService,public httpService: HttpService, public dataservice: DataService) { }
  ngOnInit() {
    this.dataservice.currentMessage.subscribe(message => {
      this.searchInput = message
      LoggerService.log(this.searchInput, "search component running ");
      this.getCard();
    })
  }
  getCard() {
try{
    this.token = localStorage.getItem('token');/**get the token from the local storage */
    this.noteService.getcard()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      /**hitting the api by passing the url & token */
      this.arraynewdata = [];
      this.list=data['data'].data
      LoggerService.log("get cards list successfull", data);
      this.temp =  this.list.reverse();/**reverse() method in typescript to display the data in reverse order */
      // console.log(this.temp);
      this.arraynewdata = [];/**Reinitializing the array so that data gets updated */
      for (var i = 0; i <  this.list.length; i++)/**for loop to go through all cards*/ {
        if ( this.list[i].isDeleted == false && this.list[i].isArchived == false)/**if cards are not deleted  */ {
          this.arraynewdata.push( this.list[i]);/**then push those cards into the array */
        }
      }
      LoggerService.log( "array of new data",this.arraynewdata);/**display new array*/
    }),
      error => {/**if error occurs then display the error */
        LoggerService.log("error", error);
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
