// errors-handler.ts
import { ErrorHandler, Injectable} from '@angular/core';
import { MatSnackBar } from '@angular/material';
@Injectable()
export class ErrorsHandler implements ErrorHandler {
  constructor(public snackBar: MatSnackBar){}
  handleError(error: Error) {
     // Do whatever you like with the error (send it to the server?)
     // And log it to the console
     console.error('It happens: ', error);
     this.snackBar.open("Cannot match any routes. URL Segment:", "Error", {
      duration: 10000,
    });
  }
}
