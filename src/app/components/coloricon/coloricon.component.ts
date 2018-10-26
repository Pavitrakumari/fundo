import { Component,Input, EventEmitter,Output,OnInit } from '@angular/core';
import{HttpService} from '../../services/http.service'
import {MatSnackBar} from '@angular/material';
/**A componenet can be reused throughout the application & even in other applications */
@Component({
  selector: 'app-coloricon',/**A string value which represents the component on browser at execution time */
  templateUrl: './coloricon.component.html',/**External templating process to define html tags in component */
  styleUrls: ['./coloricon.component.css']/**It is used to provide style of components */
})
/**To use components in other modules , we have to export them */

export class ColoriconComponent implements OnInit {
  /**Input and Output are two decorators in Angular responsible for communication between two components*/
@Input() newcolor;
@Output() resp=new EventEmitter

@Output() response=new EventEmitter<string>()

constructor(public httpService: HttpService,public snackBar: MatSnackBar) { }
// nowcolor=1;
// index;
token=localStorage.getItem('token');
changecolor(paint)
{
  
 this.response.emit(paint);
  var body={
    "color":paint,
    "noteIdList":[this.newcolor]
  }
        /**hitting the api by passing the url & token */

  this.httpService.postdeletecard("notes/changesColorNotes",body,this.token).subscribe(
    data=>{
      console.log("color changes successfully",this.newcolor);/**if error doesnot exist then display data */
      this.snackBar.open("color change success", "success", {/**snackbar to display the result */
        duration:10000,
      });
      this.resp.emit();
    }),
    error=>{
      console.log("error in coloring",error);
      
      }
}
  /**it is a interface */
  /**OnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. */
ngOnInit() {
  }

}
