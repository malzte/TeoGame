import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userLoggedInEvent = new EventEmitter();

  constructor(private http:HttpClient) { }

  login(formData:object){
    return this.http.post('http://localhost:3000/login', formData);
  }

  register(formData:object){
    return this.http.post('http://localhost:3000/register', formData);
  }

  newlisting(formData:object){
    return this.http.post('http://localhost:3000/listings', formData);
  }

  get_current_user(){
    return JSON.parse(localStorage.getItem('currentUser')!);
  }

  isAuthenticated(){
    return this.get_current_user() ? true: false;
  }
}
