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
  postlogin(url,body) 
  {
          url=this.url+url;;


          return   this.http.post(url,body);
  }
             
            
     
        

}


