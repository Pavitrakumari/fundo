import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { GeneralService } from '../general/general.service';

@Injectable({
  providedIn: 'root'
})
export class QstnAnsService {

  constructor(private qstnAns: HttpClient,
    private service :GeneralService) { }
    url = environment.baseUrl;/**url */
    quesAnsNotes(body){
      let url=this.url+"/questionAndAnswerNotes/addQuestionAndAnswer";
    return this.qstnAns.post(url,body)
  }
  likeQnA(parentId,requestBody){
    let url=this.url+"/questionAndAnswerNotes/like/"+parentId;
    return this.qstnAns.post(url,requestBody);
  }
  rateQnA(parentId,requestBody){
    let url=this.url+"/questionAndAnswerNotes/rate/"+parentId;
    return this.service.httpPost(url,requestBody);
  }
  replyQnA(parentId,requestBody){
    let url=this.url+"/questionAndAnswerNotes/reply/"+parentId;
    return this.service.httpPost(url,requestBody);

  }
}
