import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service'

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {
  token=localStorage.getItem('token'); 
  myData=[]
  constructor(public httpService: HttpService) { }
  ngOnInit() 
  {
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
}

