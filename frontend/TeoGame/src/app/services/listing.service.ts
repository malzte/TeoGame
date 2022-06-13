import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ilisting } from 'src/app/interfaces/ilisting';
import { IUser } from '../interfaces/Iuser';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  constructor(private http:HttpClient) { }

  getUserListings(user_id:number) {
    return this.http.get<Ilisting[]>(`http://localhost:3000/listings/${user_id}`);
  }

  getAllListings() {
    return this.http.get<Ilisting[]>(`http://localhost:3000/listings/`);
  }
  getUserInfo(user_id:number) {
    return this.http.get<IUser[]>(`http://localhost:3000/users/${user_id}`);
  }
  

  
}
