import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { User } from '../models/login';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    environment: any;
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, private userservice: UserService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.environment = environment.serverUrl;
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }



    //  authenticate(loggedInUser, users) {
    //     debugger;
    //     const user = users.find(x=>x.loginId === loggedInUser.loginId && x.password === loggedInUser.password);
    //     if (!user) {
    //         return ({ 

    //             "success": false, 

    //             "timestamp": "13-05-2020 12:51:35", 

    //             "message": "username or password incorrect" 

    //         } )

    //     } else{
    //         return ({ 

    //             success: true, 

    //             timestamp: "12-05-2020 09:34:05", 

    //             message: "Portal User validated successfully.", 

    //             returnValue: { 

    //             loginId: user.loginId, 

    //             roles: user.roles, 

    //             longName: user.longName

    //             } 

    //             })
    //     }

    // }

    //     login(loginId, password, users) {
    //         debugger;
    //         const loggedInUser = { 
    //             "loginId": loginId, 
    //             "password": password 
    //             } 
    //         let result: any = this.authenticate(loggedInUser, users); 
    // console.log(result);

    login(loginId, password) {
        return this.http.post<any>(`${environment.serverUrl}/login`, { loginId, password })
            .pipe(map(user => {
                //if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    return user;
                //}
            }));
    }
    /*if(result.success){
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(result.returnValue));
        this.currentUserSubject.next(result.returnValue);
        return result;
    } else {
    return false;
    }*/
    // localStorage.setItem('currentUser', JSON.stringify(result.returnValue));
    // this.currentUserSubject.next(result.returnValue);
    // return result;




    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
