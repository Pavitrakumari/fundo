import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { GeneralService } from '../general/general.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  constructor(private note: HttpClient,
    private service :GeneralService) { }
  url = environment.baseUrl;/**url */
// private token=localStorage.getItem('token');
  deletedata(labelid) {/**get() service to get he data */
    let url = this.url + "noteLabels/" +labelid+"/deleteNoteLabel";
    return this.note.delete(url);/**returns the output */
  }
  addnotes(input)/**post() service to post the token which is generated */ {
  console.log(input);

   let url = this.url + "notes/addnotes";
   return this.service.httppostpassword(url, input);/**passing the input & calling the  getFormUrlEncoded()*/

  }
updatenotes(input){
    console.log(input);
    let url = this.url + "notes/updateNotes";
    return this.service.httppostpassword(url, input);/**passing the input & calling the  getFormUrlEncoded()*/
 }
getcard() {
    // console.log();

    let url = this.url + "notes/getNotesList";
    return this.service.httpget(url);
}
getlabels() {

    let url = this.url + "noteLabels/getNoteLabelList";
    return this.service.httpget(url);
}
getarchive() {

    let url = this.url + "notes/getArchiveNotesList";
    return this.service.httpget(url);
}
getreminders() {

    let url = this.url + '/notes/getReminderNotesList';
    return this.service.httpget(url);
}
postArchivenotes(model) {
    // let token=localStorage.getItem('token');

   let url = this.url + "notes/archiveNotes";
    return this.service.httpPost(url,model);
}
postchangecolor(model) {
    // let token=localStorage.getItem('token');

    let url = this.url +"notes/changesColorNotes";
    return this.service.httpPost(url,model);
}
postPinUnpin(model) {
    // let token=localStorage.getItem('token');

  let url = this.url +"notes/pinUnpinNotes";
  return this.service.httpPost(url,model);
}
postRemoveReminders(model) {
    // let token=localStorage.getItem('token');

  let url = this.url +'/notes/removeReminderNotes';
  return this.service.httpPost(url,model);
}
postAddLabelnotesRemove(label,note,{}) {
    let token=localStorage.getItem('token');

    let url = this.url +"notes/"+ note+"/addLabelToNotes/"+ label +"/remove";;
    return this.service.httpPost(url,{});
}
postUpdateChecklist(id,modifiedid,body) {
    let token=localStorage.getItem('token');

    let url = this.url+"notes/" + id + "/checklist/" + modifiedid + "/update";
    return this.service.httpPost(url,body);
}
postAddLabelnotesAdd(arrayofnotesid,label,body) {
    let token=localStorage.getItem('token');
      // var url = "notes/" + [this.arrayofnotes['id']] + "/addLabelToNotes/" + label + "/add";

    let url = this.url+"notes/" + arrayofnotesid +"/addLabelToNotes/"  + label +"/add";
    return this.service.httpPost(url,body);
}
postTrashnotes(body){
    // let token=localStorage.getItem('token');

    let url = this.url +"notes/trashNotes";
    return this.service.httpPost(url,body);
}
postDeleteForeverNotes(body){
    let token=localStorage.getItem('token');

    let url = this.url +'notes/deleteForeverNotes';
    return this.service.httpPost(url,body);
}
postRegisterPushToken (body){
    // let token=localStorage.getItem('token');

    let url = this.url +'user/registerPushToken';
    return this.service.httpPost(url,body);
}
postAddUpdateReminderNOtes (body){
    let token=localStorage.getItem('token');

    let url = this.url +'/notes/addUpdateReminderNotes';
    return this.service.httpPost(url,body);
}
postUpdateNotelabel(labelid,body){
    let token=localStorage.getItem('token');

  let url = this.url +"noteLabels/" + labelid + "/updateNoteLabel";
  return this.service.httpPost(url,body);
}
postNoteLabels(body){
    // let token=localStorage.getItem('token');

  let url = this.url +"noteLabels";
  return this.service.httpPost(url,body);
}
postChecklistRemove(dataid,removeid,body){
    // let token=localStorage.getItem('token');

  var url = "notes/" + dataid + "/checklist/" + removeid + "/remove";
  return this.service.httpPost(url,body);
}
postCheckListAdd(dataid,body){
    // let token=localStorage.getItem('token');

var url = "notes/" + dataid + "/checklist/add";
return this.service.httpPost(url,body);
}
imageupload(body){/** */
    let token=localStorage.getItem('token');

    let url = this.url +'/user/uploadProfileImage';
    return this.service.httpImage(url,body,token)
  }
}
