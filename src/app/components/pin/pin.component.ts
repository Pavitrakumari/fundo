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
  @Output() pinevent = new EventEmitter<any>();
@Input()  noteid

  constructor(public httpService: HttpService,public snackBar: MatSnackBar ) { }
  // @Input() myData;
  
  public isDeleted = false;
  token = localStorage.getItem('token');
  public body: any = {};
public isPinned=false;
public newPin=true;;



  ngOnInit() {
    if (this.noteid != undefined && this.noteid.isDeleted == true ) {
      this.isDeleted = true;
    }
    if (this.noteid != undefined && this.noteid.isPined == true) {
      this.isPinned = true;
     
    }
  
   }

   pin(){
    if(this.noteid!=undefined){
      if (this.noteid.isPined == true){
        this.newPin = false;
      }
      var arr = []
      arr.push(this.noteid.id)
      console.log(arr);
      if (this.noteid.id != undefined) {
        var body={
          "isPined": this.newPin,
          "noteIdList": arr
        }
        this.httpService.postdeletecard("notes/pinUnpinNotes",body , this.token).subscribe((data)=>{
                this.pinevent.emit();
                LoggerService.log('data',data);
                LoggerService.log(this.noteid)
              });
          
         
      }
    }
  }
}
/**
 * 
 */