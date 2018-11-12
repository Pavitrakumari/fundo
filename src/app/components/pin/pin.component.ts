import { Component,Input,Output,OnInit,EventEmitter } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoggerService } from '../../core/services/logger/logger.service';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {

  constructor(public httpService: HttpService,public snackBar: MatSnackBar ) { }
  public isPined;
  public isDeleted = false;
  token = localStorage.getItem('token');
  public body: any = {}
  @Input() noteid;
  // @Input() myData;
  @Input() Pin;

  @Output() eventEmit = new EventEmitter<any>();


  ngOnInit() {
    if (this.noteid != undefined && this.noteid.isDeleted == true) {
      this.isDeleted = true
    }
    if (this.noteid != undefined && this.noteid.isPined == true) {
      this.isPined = true
    }
  }
pin(flag){
  console.log(flag,"flag in pin 1");
  
  this.eventEmit.emit({});
  LoggerService.log("event in pinn",event);
  if (this.noteid != undefined) {
    LoggerService.log("this.myData",this.noteid)
    var array = []
    array.push(this.noteid.id);
    this.httpService.postdeletecard("/notes/pinUnpinNotes", this.body = {
      "isPined": flag,
      "noteIdList": array

    }, this.token).subscribe((data)=>{
      this.eventEmit.emit({});
      if (flag == true){

      LoggerService.log("success in pinn",data);
      this.snackBar.open("Pinned", "ok", {
        duration: 2000,
      });

      }
      else{
        LoggerService.log("success in Unpinn",data);
        this.snackBar.open("Unpinned", "ok", {
          duration: 2000,
        });
      }
    }),
    error=>{
      LoggerService.log("error in pinn ",error);
      this.snackBar.open("error in pinn", "ok", {
        duration: 2000,
      });


      }
  }
}
}
/**
 * 
 */