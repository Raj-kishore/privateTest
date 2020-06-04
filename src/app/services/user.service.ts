import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { User } from '../models/login';
import { Observable } from 'rxjs';



@Injectable({ providedIn: 'root' })

export class UserService {

  //public url:string = "http://51.137.208.124:8089/assessment-automation-platform/users";
  public url:string = "http://localhost:4200/assets/json/login.json";
  //public url:string = "http://51.137.208.124:8089/ape/assets/json/login.json"
    constructor(private http: HttpClient) { }

    getAll(): Observable<object> {
        return this.http.get<User[]>(this.url).pipe(
          map(res => {
            return res;
          })
        );
    }

    

}