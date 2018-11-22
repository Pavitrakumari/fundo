import { Component, OnInit,Inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NoteService } from '../../core/services/http/note/note.service';
import { LoggerService } from '../../core/services/logger/logger.service';

@Component({
  selector: 'app-dialogcollaborator',
  templateUrl: './dialogcollaborator.component.html',
  styleUrls: ['./dialogcollaborator.component.scss']
})
export class DialogcollaboratorComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogcollaboratorComponent>,private noteService:NoteService) { }
  @Inject(MAT_DIALOG_DATA) 
  ngOnInit() {
  }
  private userlist=[];
 
  private imageNew = localStorage.getItem('imageUrl');
img = environment.profileUrl + this.imageNew;
mail=localStorage.getItem('name');
firstName=localStorage.getItem('firstName');
lastName = localStorage.getItem('lastName');

searchpeople(searchemail){
  console.log("search email",searchemail);
  var body={
    "searchWord":searchemail
  }
  this.noteService.searchuserlist(body).subscribe(data=>{
    LoggerService.log("success in collaborator search",data)
    this.userlist=data['data'].details;
  }),
  error=>{
    LoggerService.log("error in collaborator search",error);
  }
}
}
