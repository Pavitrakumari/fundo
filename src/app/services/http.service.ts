import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  

  constructor(private http: HttpClient) { }

  url= 'http://34.213.106.173/api/';

  getDataService(url) 
  {
    
    
    
    
    
    url=this.url+url;



    
    return   this.http.get(url);
  }
  postdata(url,body) 
  {
          url=this.url+url;;


          return   this.http.post(url,body);
  }
  getdata(url){
    url=this.url+url;
    return this.http.get(url);

  }
  postpassword(url,input,token)
  {
    console.log(token);
    console.log(input);

          url=this.url+url;
          var httpAuthOptions1 = {
            headers: new HttpHeaders({
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': token
            })
      
          };
          

          
          return this.http.post(url,this.getFormUrlEncoded(input),httpAuthOptions1);
        
  }

  getFormUrlEncoded(toConvert) {
    const formBody = [];
    for (const property in toConvert) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(toConvert[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
   }

  
         
            
     
        

}


/**
 * postPassword(adress,bodydata,acessToken)
  {
    console.log(acessToken);
    console.log(bodydata);
    
    var httpAuthOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': acessToken
      })

    };
    
  
    return this.http.post(this.url+"/"+adress,this.getFormUrlEncoded(bodydata),httpAuthOptions1)
  }
  getFormUrlEncoded(toConvert) {
    const formBody = [];
    for (const property in toConvert) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(toConvert[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
   }
 */