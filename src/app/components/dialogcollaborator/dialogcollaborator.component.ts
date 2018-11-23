import { Component, OnInit,Inject,Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NoteService } from '../../core/services/http/note/note.service';
import { LoggerService } from '../../core/services/logger/logger.service';
import { DialogData } from '../dialog/dialog.component';
// import { DialogData } from '../collaboratoricon/collaboratoricon.component';
@Component({
  selector: 'app-dialogcollaborator',
  templateUrl: './dialogcollaborator.component.html',
  styleUrls: ['./dialogcollaborator.component.scss']
})
export class DialogcollaboratorComponent implements OnInit {
userId=localStorage.getItem('')
  constructor(public dialogRef: MatDialogRef<DialogcollaboratorComponent>,
    private noteService:NoteService,@Inject(MAT_DIALOG_DATA)
    public data:DialogData) { }
    firstchar='';
    array=[];
ngOnInit() {
  console.log(this.data,"99999999999999999999collaborator");
  
  for(let i=0 ;i<this.data['collaborators'].length;i++){
    this.receiverlist.push(this.data['collaborators'][i]);
    }

}
 userlist=[];
 receiverlist=[];

private imageNew = localStorage.getItem('imageUrl');
img = environment.profileUrl + this.imageNew;
mail=localStorage.getItem('name');
//  array = this.mail.split("");/**split the name & pass it to a variable array */
// this.firstchar = array[0];/**first character of the name is passed to 'firstchar' variable */

firstName=localStorage.getItem('firstName');
lastName = localStorage.getItem('lastName');
searchpeople(searchemail){
  console.log("search email",searchemail);
  var body={
    "searchWord":searchemail
  }
  this.noteService.searchuserlist(body).subscribe(data=>{
    LoggerService.log("success in collaborator search",data)
    this.userlist=[];
    this.userlist=data['data'].details;
    console.log("user id in collaborator",data['data'].details);
    
  }),
  error=>{
    LoggerService.log("error in collaborator search",error);
  }
}
addCollaboratorNotes(colors){
  console.log("colors in collaborator",colors);
  var body={
    "firstName":colors.firstName,
    "lastName":colors.lastName,
    "email":colors.email,
    "userId":colors.userId
  } 
  this.noteService.addcollaboratorNotes(this.data['id'],body).subscribe(data=>{
    LoggerService.log("success in add collaborator to notes",data);

    this.receiverlist=data['data'].details
  }),
  error=>{
    LoggerService.log("error in add collaborator",error);
  }
}
}
