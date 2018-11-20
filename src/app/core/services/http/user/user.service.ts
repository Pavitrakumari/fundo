import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import  {GeneralService} from '../general/general.service'
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
  private token=localStorage.getItem('token');

  constructor(private user: HttpClient,
              private service :GeneralService) { }
  url = environment.baseUrl;/**url */

  postlogout() {
    console.log(this.token);
    let url = this.url + "user/logout";
    return this.service.httpPost(url, {});/**passing the input & calling the  getFormUrlEncoded()*/
  }
  getDataService1()
  {
     let url = this.url + "user/service";
    return this.user.get(url);
  }
  getDataService2()
  {
     let url = this.url + "user";
    return this.user.get(url);
  }
  postsignup( body)/**post() service to post he data */ {
    let url = this.url + "user/userSignUp";
    return this.user.post(url, body);/**post the data */
  }
  postlogin(body){
    let url = this.url +"user/login";
    return this.user.post(url, body);/**post the data */

  }
  postreset(body){
    let url = this.url +"user/reset";
    return this.user.post(url, body);/**post the data */

  }
  // postdata(url, body)/**post() service to post he data */ {
  //   url = this.url + url;
  //   return this.user.post(url, body);/**post the data */
  // }
  // deletedata(url) {/**get() service to get he data */
  //   url = this.url + url;
  //   return this.user.delete(url);/**returns the output */
  // }
}
