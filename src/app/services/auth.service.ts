import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
constructor() { }
  public isAuthenticated(): boolean {
  const token = localStorage.getItem('token');/**getting the token from local storage */
    /**Check whether the token is expired or not and return true or false*/
    if(token){
      return true;
    }
    else{
      return false;
    }
  }

}
