import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiCommonService } from '../../../services/api-common.service';
import { NotificationService } from '../../../services/notification.service';
import { AccountAddComponent } from '../../accounts/components/account-add/account-add.component';
import { UserAddComponent} from '../components/user-add/user-add.component';
import { environment } from '../../../../environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { account, action } from '../../../models/account';
 
@Component({
  selector: 'app-account-layout',
  templateUrl: './account-layout.component.html',
  styleUrls: ['./account-layout.component.css']
})
export class AccountLayoutComponent implements OnInit {
  myAccounts: any;
  myUsers: any;
  dataSource: any = [];
  columnsToDisplay: any;
  constructor(private accountlist: ApiCommonService,
    private dialog: MatDialog,
    private notification: NotificationService,) { }
 
  ngOnInit(): void {
  }
 
  addAccount() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    const dialogRef: MatDialogRef<AccountAddComponent> = this.dialog.open(AccountAddComponent, { panelClass: 'addAccountModal'  });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.getAccountList();
      // if (result === false) {
      //   console.log('Just close the dialog');
      // } else {
      //   //this.myAccounts.unshift(result);
      //   //this.updatedList();
      // }
    });
  }
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
 
  getAccountList() {
    this.accountlist.getRequest(`${environment.serverUrl}/accounts`, 'GET')
      .subscribe(data => {
        this.myAccounts = data.returnValue;
        this.dataSource = new MatTableDataSource<account>(this.myAccounts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.notification.success('Loaded Successfully');
      });
    this.columnsToDisplay = ['Sr no', 'Account Name', 'Description', 'SBU Name', 'BU Name', 'Market Unit', 'Action'];
  }
 
  addUser() {
 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    const dialogRef: MatDialogRef<UserAddComponent> = this.dialog.open(UserAddComponent, { panelClass: 'addUserModal' });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.getAccountList();
      // if (result === false) {
      //   console.log('Just close the dialog');
      // } else {
      //   //this.myUsers.unshift(result);
      //   this.getAccountList();
      // }
    });
  }
 
}