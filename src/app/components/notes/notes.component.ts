import { Component, OnInit } from '@angular/core';
import { HttpService } from '/home/administrator/fundo/src/app/services/http.service'
import {  Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
expression1=true;
expression2=false;
public title;
public note;
public pinned=false;
token=localStorage.getItem('token');
constructor(public httpService: HttpService,public router:Router,public snackBar: MatSnackBar) { }
public clicked=false;
  ngOnInit() {








}
display(){
  this.expression1=false;
this.expression2=true;
}
close(){
  this.expression1=true;
this.expression2=false;
// }
// click(){
  this.title=document.getElementById('title').textContent;
  this.note=document.getElementById('note').textContent;
  // var token=localStorage.getItem('token');
  console.log(this.title);
  console.log(this.note);
  console.log(this.pinned);
  this.clicked=!this.clicked;
this.httpService.postpassword("notes/addnotes",{
"title":this.title,
"description":this.note,
"labelIdList":"",
"checklist":"",
"isPined":this.pinned
},this.token).subscribe(
  data=>{
    console.log("successfull add notes",data);
this.httpService.getcard("notes/getNotesList",this.token).subscribe(data1=>{
  console.log("get cards list successfull",data1);
})
  
  },error=>{
    console.log("Error", error);
  });
}









}
