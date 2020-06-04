import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ApiCommonService } from '../../../../services/api-common.service';
import { account, action } from '../../../../models/user';
import { UserAddComponent} from '../user-add/user-add.component';
import { environment } from '../../../../../environments/environment';
import { NotificationService } from '../../../../services/notification.service';
import { User } from 'src/app/models/login';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  myUsers: any;
  dataSource: any = [];
  columnsToDisplay: any;
  message: any;
  subscription: Subscription;
  userList : any;
  environment: any;
  searchUser: any;

  actions: action[] = [
    {value: 'Edit', viewValue: 'Edit'},
    {value: 'Delete', viewValue: 'Delete'}
  ];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  getUserList() {
    this.userlist.getRequest(`${environment.serverUrl}/users`, 'GET')
      .subscribe(data => {
        this.myUsers = data.returnValue;
        this.dataSource = new MatTableDataSource<User>(this.myUsers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      });
    this.columnsToDisplay = ['Sr no', 'User Name', 'Login-id', 'User Email', 'User Role', 'SME Area', 'SBU Name', 'BU Name','Action'];
  }

  clearUserSearch() {
    this.searchUser = '';
    this.dataSource.filter = '';
  }

  userFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addUser() {
 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    const dialogRef: MatDialogRef<UserAddComponent> = this.dialog.open(UserAddComponent, { panelClass: 'addUserModal' });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.getUserList();
      if(result !== undefined){
        if(result.event === "cancel"){
          //skip when cancel
        }else if(result.event === "reload"){ //either `Add row` or `Save and submit` clicked
          if(result.status === true){
            //one row updated
            this.notification.success('Account has been added Successfully');
          }else{
            //skip when no updates
          }
        }
      }
      // if (result === false) {
      //   console.log('Just close the dialog');
      // } else {
      //   //this.myUsers.unshift(result);
      //   this.getAccountList();
      // }
    });
  }

  constructor(
    private userlist: ApiCommonService, private notification: NotificationService,
    private dialog: MatDialog) {
      this.environment = environment.serverUrl;
     }

  ngOnInit(): void {
    this.getUserList();
  }

}
