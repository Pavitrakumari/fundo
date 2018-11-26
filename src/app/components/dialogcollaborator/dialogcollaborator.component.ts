import { Component, OnInit,Inject,Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { NoteService } from '../../core/services/http/note/note.service';
import { LoggerService } from '../../core/services/logger/logger.service';
import { DialogData, DialogComponent } from '../dialog/dialog.component';
// import { DialogData } from '../collaboratoricon/collaboratoricon.component';
@Component({
  selector: 'app-dialogcollaborator',
  templateUrl: './dialogcollaborator.component.html',
  styleUrls: ['./dialogcollaborator.component.scss']
})
export class DialogcollaboratorComponent implements OnInit {
  newList= [];
  // dialog: any;
  constructor(public dialogRef: MatDialogRef<DialogcollaboratorComponent>,
    private dialog:MatDialog,
    private noteService:NoteService,@Inject(MAT_DIALOG_DATA)
    public data:DialogData) { }
    firstchar='';
    array=[];
    searchemail;
ngOnInit() {
  LoggerService.log("99999999999999999999collaborator",this.data);
  for(let i=0 ;i<this.data['collaborators'].length;i++){
    this.newList.push(this.data['collaborators'][i]);
    }
  if(this.data['userId']!=this.data['user'].userId){
    this.mail=this.data['user'].email;
    this.firstName=this.data['user'].firstName;
    this.lastName=this.data['user'].lastName;
    this.img=environment.profileUrl+this.data['user'].imageUrl;
  }
  
  }
 userlist=[];
 receiverlist=[];
private imageNew = localStorage.getItem('imageUrl');
img = environment.profileUrl + this.imageNew;
mail=localStorage.getItem('name');
firstName=localStorage.getItem('firstName');
lastName = localStorage.getItem('lastName');

searchpeople(searchemail){
  LoggerService.log("search email",searchemail);
  var body={
    "searchWord":searchemail
  }
  this.noteService.searchuserlist(body).subscribe(data=>{
    this.userlist=[];
    this.userlist=data['data'].details;
    })
  
}
addCollaboratorNotes(colors){
  var body={
    "firstName":colors.firstName,
    "lastName":colors.lastName,
    "email":colors.email,
    "userId":colors.userId
  } 
  this.noteService.addcollaboratorNotes(this.data['id'],body).subscribe(data=>{
    this.receiverlist=data['data'].details;
    this.data['collaborators'].push(colors);

  })
}
removecollaborator(colors){
this.noteService.removeCollaborator(this.data['id'],colors.userId).subscribe(data=>{
  console.log("success in remove collaborators",data);
  for(var i=0;i<this.newList.length;i++){
    if(this.newList[i].userId==colors.userId){
      this.newList.splice(i,1);
      this.data['collaborators'].splice(i,1);


    }
  }
})

}
onEnter(searchFriend){

  for(let index=0;index<this.userlist.length;index++){
    if(this.userlist[index].email==searchFriend){
    this.newList.push(this.userlist[index]);
  }
  }
  this.searchemail=[];

  LoggerService.log('list',this.newList)

}
select(userMail){
  this.searchemail=userMail;
}
close(){
  this.dialogRef.close();
}
// save(){
  save(){
this.close()
const dialogRef = this.dialog.open(DialogComponent, {
  width: '550px',/**width of the dialog box */
  // height:'350px',
  data: this.data,/**paramaeter that we are passing */
  panelClass: 'myapp-no-padding-dialog'/**to change the padding in dialog box */
});
   }
}
// }
