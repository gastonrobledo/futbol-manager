import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {
  constructor(private http:Http) {
  };

  auth(email:string, password:string):Observable<any> {
    let bodyString = JSON.stringify({email: email, password: password}); // Stringify payload
    let headers = new Headers({'Content-Type': 'application/json'}); // ... Set content type to JSON
    let options = new RequestOptions({headers: headers}); // Create a request option
    return this.http.post('/something', bodyString, options)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error ? error.json().error || 'Server error'));
  };

  isLogged():boolean {
    return false;
  }

}
