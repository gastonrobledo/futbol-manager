import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }  from 'rxjs/Observable';
import { API_URL } from '../config';

@Injectable()
export class AuthService {
  constructor(private http:Http) {
  };

  auth(email:string, password:string): Observable<any> {
    console.log(API_URL);
    let bodyString = JSON.stringify({email: email, password: password}); // Stringify payload
    let headers = new Headers({'Content-Type': 'application/json'}); // ... Set content type to JSON
    let options = new RequestOptions({headers: headers}); // Create a request option
    return this.http.post(`${API_URL}/auth`, bodyString, options);
  };

  isLogged():boolean {
    return false;
  }

}
