import { Component, OnInit } from '@angular/core';
import{ Router }from '@angular/router';
import {  AuthenticationService } from '../../../services/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  constructor(
  public router: Router,
  private authenticationService: AuthenticationService

  ) { }

  ngOnInit(): void {
    // this.isLoggedIn$ = this.authenticationService.isCurrentUser;
  }

  logout(){
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
    
  }

}
