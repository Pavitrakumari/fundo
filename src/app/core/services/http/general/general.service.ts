import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  url = environment.baseUrl;

  constructor(private http: HttpClient) {}
public httpPost(url,body){
  var httpAuthOptions2 = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': token
    })
  };
  return this.http.post(url, body, httpAuthOptions2);/**passing the input & calling the  getFormUrlEncoded()*/
}
public httpget(url){
  console.log("token in general service");
  
  var httpAuthOptions3 = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': token
    })

  };
  return this.http.get(url, httpAuthOptions3);

}

public httppostpassword(url,body){
var httpAuthOptions1 = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    // 'Authorization': token
  })
};
return this.http.post(url, this.getFormUrlEncoded(body),httpAuthOptions1)/**passing the input & calling the  getFormUrlEncoded()*/
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
public httpImage(url,body,token){
var http={
  headers:new HttpHeaders({
   
   'Authorization':token
  })
};
return this.http.post(url,body,http)
}
}