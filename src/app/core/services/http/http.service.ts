/**importing injectable type from angular */
import { Injectable } from '@angular/core';
/**importing http client */
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
/**exporting the http service */
export class HttpService {
  constructor(private http: HttpClient) { }
  url = environment.baseUrl;/**url */
  getDataService(url)/**get() method  to get he data using service*/ {
    url = this.url + url;
    return this.http.get(url);/**returning the output */
  }
  postdata(url, body)/**post() service to post he data */ {
    url = this.url + url;
    return this.http.post(url, body);/**post the data */
  }
  getdata(url) {/**get() service to get he data */
    url = this.url + url;
    return this.http.get(url);/**returns the output */
  }
  deletedata(url) {/**get() service to get he data */
    url = this.url + url;
    return this.http.delete(url);/**returns the output */
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
    return this.http.post(url, this.getFormUrlEncoded(input), httpAuthOptions1);/**passing the input & calling the  getFormUrlEncoded()*/
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
  /**api to logout*/
  postlogout(url, token) {
    console.log(token);
    url = this.url + url;
    var httpAuthOptions2 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.post(url, {}, httpAuthOptions2);/**passing the input & calling the  getFormUrlEncoded()*/
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
    return this.http.get(url, httpAuthOptions3);
  }
  postdeletecard(url, model, token) {
    url = this.url + url;
    var httpAuthOptions4 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.post(url, model, httpAuthOptions4);
  }
  imageupload(url,body,token){/** */
    console.log(token);
    var http={
      headers:new HttpHeaders({
       
       'Authorization':token
      })
    };
    return this.http.post(this.url+"/"+url,body,http)
  }

}

