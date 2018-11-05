/************************************************************************************************
*  Execution       :   1. default node         cmd> trash.ts 
*        
*  Purpose         : To move the deleted cards to trash
* 
*  Description    
* 
*  @file           : trash.ts
*  @overview       : To move the deleted cards to trash
*  @module         : trash.ts - This is optional if expeclictly its an npm or local package
*  @author         : Pavitrakumari <pavithra.korapati@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service'
@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {
  token=localStorage.getItem('token'); 
  myData=[];
  name='trash';
  constructor(public httpService: HttpService) { }
  ngOnInit() 
  {
    this.getcard();
  }
getcard(){
    this.httpService.getcard("notes/getNotesList",this.token).subscribe(data=>{
    /**hitting the api by passing the url & token*/
    console.log("get cards list successfull",data);
    this.myData=data['data'].data.reverse();/**reverse() method in typescript to display the data in reverse order */
    this.myData=[];
    for(var i=0;i<data['data'].data.length-1;i++)
    {
      if(data['data'].data[i].isDeleted == true) 
      {
               this.myData.push(data['data'].data[i]);
      }
    }
    console.log(this.myData,"array of new data");
  })
}
carddel(event){
  this.getcard();

}
}

