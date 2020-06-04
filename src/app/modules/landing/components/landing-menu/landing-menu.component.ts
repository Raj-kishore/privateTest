import { Component, OnInit } from '@angular/core';
import{Router}from '@angular/router';
import {  AuthenticationService } from '../../../../services/authentication.service';
import { User } from '../../../../models/login';
import { Role } from '../../../../models/role';
import { ApiCommonService } from '../../../../services/api-common.service';

@Component({
  selector: 'app-landing-menu',
  templateUrl: './landing-menu.component.html',
  styleUrls: ['./landing-menu.component.css']
})
export class LandingMenuComponent implements OnInit {

  radioVal : string = '';
  currentRole:Role[];
  count:number;
  isSingleRoleUser=false;
currentUser: any;
visible: Boolean= true;
authority:any;

constructor(public router: Router,
  private authenticationService: AuthenticationService,
  private apiCommonService: ApiCommonService) {
    this.currentUser = this.authenticationService.currentUserValue;
    //console.log(this.currentUser);
   }

  onRoleChange(value) {
    // this.apiCommonService.insertRequest(`../../../assets/json/initiateassessment.json`, 'POST', value)
    // .subscribe(data => {
    //   console.log(data);
    // });
    //console.log(value);
  }

ngOnInit(): void {
  debugger;
  this.currentRole= this.currentUser.returnValue.authorities; 
  //console.log(this.currentRole);
  //console.log(this.currentRole[0].roleName);
  //console.log(this.currentRole.length + '*');
 /* this.count=Object.keys(this.currentRole.length);*/
  this.currentRole.length;
 
  if (this.currentRole.length  === 1)
  this.isSingleRoleUser=true;
  //console.log("Home");
  this.visible = true;
}
logout(){
  this.authenticationService.logout();
  this.router.navigate(["/login"]);
  
}


}
