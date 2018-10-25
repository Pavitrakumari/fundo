import { Component,Input, EventEmitter,Output,OnInit } from '@angular/core';
import{HttpService} from '../../services/http.service'

@Component({
  selector: 'app-coloricon',
  templateUrl: './coloricon.component.html',
  styleUrls: ['./coloricon.component.css']
})
export class ColoriconComponent implements OnInit {
@Input() newcolor;
@Output() resp=new EventEmitter
constructor(public httpService: HttpService) { }
// nowcolor=1;
// index;
token=localStorage.getItem('token');
changecolor(paint)
{
  // this.nowcolor=paint;
  // switch(this.nowcolor)
  // {
  //   case 1:{
  //       this.index="#ffffff";
  //        break;
  //   }
  //   case 2:{
  //     this.index="#90ee90";
  //      break;
  //    }
  //    case 3:{
  //      this.index="#f66ef6";
  //       break;
  //    }
  //    case 4:{
  //        this.index="#f08080";
  //         break;
  //     }
  //    case 5:{
  //         this.index="#05f6f6";
  //         break;
  //     }
  //   case 6:{
  //       this.index="#ffb6c1";
  //        break;
  //    }
  //    case 7:{
  //        this.index="#ffff66";
  //        break;
  //    }
  //    case 8:{
  //        this.index="#add8e6";
  //        break;
  //     }
  //     case 9:{
  //       this.index="#e6a9a9";
  //       break;
  //     }
  //     case 10:{
  //        this.index="#ffff81";
  //         break;
  //       }
  //     case 11:{
  //        this.index="#a9a9d8";
  //        break;
  //     }
  //     case 12:{
  //       this.index="#d9d9d9";
  //       break;
  //    }
  //   }
  var body={
    "color":paint,
    "noteIdList":[this.newcolor]
  }
  this.httpService.postdeletecard("notes/changesColorNotes",body,this.token).subscribe(
    data=>{
      console.log("color changes successfully",this.newcolor);
      this.resp.emit();
    },
    error=>{
      console.log("error in coloring",error);
      })
}  
ngOnInit() {
  }

}
