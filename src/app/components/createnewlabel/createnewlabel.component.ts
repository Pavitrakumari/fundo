import { Component, OnInit,Inject,Input,Output,EventEmitter, ViewChild,ElementRef } from '@angular/core';
import {MatDialog,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HttpService } from '../../services/http.service';


@Component({
  selector: 'app-createnewlabel',
  templateUrl: './createnewlabel.component.html',
  styleUrls: ['./createnewlabel.component.css']
})
export class CreatenewlabelComponent implements OnInit {
public labelarray=[];
  constructor(public dialogRef: MatDialogRef<CreatenewlabelComponent>,
@Inject(MAT_DIALOG_DATA) public data: any,public httpservice:HttpService) {}
// @ViewChild('myDiv') myDiv:ElementRef;

  ngOnInit() {
    this.getLabels();
  }
  onClose():void{
this.dialogRef.close();
this.addLabel()
this.getLabels();
  }
  public label;
  addLabel(){

    // console.log(this.myDiv.nativeElement.innerHTML);
    this.httpservice.postdeletecard("noteLabels",{
      "label":this.label,
      "isDeleted":false,
      "userId":localStorage.getItem('userId')
    },localStorage.getItem('token')).subscribe(response=>{
      console.log("success in createpostlabel",response)
    },
    error=>{
      console.log("error in create    postlabel",error)
    })
  }
getLabels(){
  this.httpservice.getcard("noteLabels/getNoteLabelList",localStorage.getItem('token')).subscribe(
    response=>{
      this.labelarray=[];
      console.log(response['data'].details);
      for(var i=0;i<(response['data'].details).length;i++){
        if(response['data'].details[i].isDeleted == false){
        this.labelarray.push(response['data'].details[i])}
      }
      console.log(this.labelarray,"Label array printing successsss ");
    },
    error=>{
      console.log("error in get LABELS",error);
    }
  )
}
// done(){
//   this.addLabel();
//   this.getLabels();

// }
delete(labelid){
  console.log(labelid)
  this.httpservice.deletedata("noteLabels/"+labelid+"/deleteNoteLabel")
  .subscribe(response=>{
    console.log("success in delete",response);
    this.getLabels();
  },error=>{
    console.log("erroe in deelete",error);
  })

}
get(label){
  
}
}
