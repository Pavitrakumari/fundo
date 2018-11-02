import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  private messageSource2 = new Subject<boolean>();
  currentMessage2 = this.messageSource2.asObservable();


  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message);
    
  }
  changeMessage2(message: boolean) {
    this.messageSource2.next(message);
    
  }

}