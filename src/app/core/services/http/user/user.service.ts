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
export class UserService {

  constructor(private user: HttpClient) { }
  url = environment.baseUrl;/**url */

  postlogout(url, token) {
    console.log(token);
    url = this.url + url;
    var httpAuthOptions2 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.user.post(url, {}, httpAuthOptions2);/**passing the input & calling the  getFormUrlEncoded()*/
  }
  getDataService(url)
  {
    url = this.url + url;
    return this.user.get(url);
  }
  postdata(url, body)/**post() service to post he data */ {
    url = this.url + url;
    return this.user.post(url, body);/**post the data */
  }
  // deletedata(url) {/**get() service to get he data */
  //   url = this.url + url;
  //   return this.user.delete(url);/**returns the output */
  // }
}
