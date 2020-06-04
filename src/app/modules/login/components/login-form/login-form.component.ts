import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../../services/authentication.service';

import { first } from 'rxjs/operators';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginForm implements OnInit {
  public loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  public users: any;
  isAuthenticated: Boolean;
  logginResponse: any;
  errMessage: string;
  userDetails: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/landing-menu']);
    }

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      loginId: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/landing-menu';
    //this.getAllUsers();
  }

  // getAllUsers() {
  //   this.userService.getAll().subscribe(
  //     data => {
  //       this.users = data;
  //     }
  //   )
  // }

  onSubmit() {

    this.submitted = true;
    // reset alerts on submit
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.login(this.loginForm.value.loginId, this.loginForm.value.password)
     .pipe(first ())
     .subscribe(data => {
      this.userDetails = data;
    if (this.userDetails.success) {
      this.router.navigate([this.returnUrl]);
    }
    else {
      
    }
  },
  error => {
    this.errMessage = error;
  });
    
    // this.isAuthenticated = this.logginResponse.success;
    // if (this.isAuthenticated) {
    //   this.router.navigate([this.returnUrl]);
    // }
    // else {
    //   this.errMessage = this.logginResponse.message;
    // }

  }

}