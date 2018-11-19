import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  constructor(private note: HttpClient) { }
  url = environment.baseUrl;/**url */

  deletedata(url) {/**get() service to get he data */
    url = this.url + url;
    return this.note.delete(url);/**returns the output */
  }
  postpassword(url, input, token)/**post() service to post the token which is generated */ {
    console.log(token);
    console.log(input);
    url = this.url + url;
    var httpAuthOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token
      })
    };
    return this.note.post(url, this.getFormUrlEncoded(input), httpAuthOptions1);/**passing the input & calling the  getFormUrlEncoded()*/
  }
  getFormUrlEncoded(toConvert) {/**a method that encodes the token*/
    const formBody = [];
    for (const property in toConvert) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(toConvert[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }
  getcard(url, token) {
    console.log(token);
    url = this.url + url;
    var httpAuthOptions3 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })

    };
    return this.note.get(url, httpAuthOptions3);
  }
  postdeletecard(url, model, token) {
    url = this.url + url;
    var httpAuthOptions4 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.note.post(url, model, httpAuthOptions4);
  }
  imageupload(url,body,token){/** */
    console.log(token);
    var http={
      headers:new HttpHeaders({
       
       'Authorization':token
      })
    };
    return this.note.post(this.url+"/"+url,body,http)
  }

}
