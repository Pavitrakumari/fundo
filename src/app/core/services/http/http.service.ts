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
  url = environment.baseUrl;
 
}

