import { Injectable } from '@angular/core';
/**A BehaviorSubject a Subject that can emit the current value . */
import { BehaviorSubject, Subject } from 'rxjs';
/**A Subject is both an observer and observable.(Subjects have no concept of current value)*/
/**The BehaviorSubject holds the value that needs to be shared with other components. */
@Injectable()
export class DataService {
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  
  private messageSource2 = new Subject<boolean>();
  currentMessage2 = this.messageSource2.asObservable();
  
  private messageSource3 = new Subject<boolean>();
  currentMessage3 = this.messageSource3.asObservable();

  constructor() { }
  changeMessage(message: string) {
    this.messageSource.next(message);
}
  changeMessage2(message: boolean) {
    this.messageSource2.next(message);
}
changeMessage3(message: boolean) {
  this.messageSource3.next(message);
}
}