import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ApiCommonService } from '../../../../services/api-common.service';
import { account, action } from '../../../../models/account';
import { AccountAddComponent } from '../account-add/account-add.component';
import { AccountEditComponent } from '../account-edit/account-edit.component';
import { NotificationService } from '../../../../services/notification.service';
import {MatSelectModule} from '@angular/material/select';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-account-dashboard',
  templateUrl: './account-dashboard.component.html',
  styleUrls: ['./account-dashboard.component.css']
})

export class AccountDashboardComponent implements OnInit {
  myAccounts: any;
  dataSource: any = [];
  columnsToDisplay: any;
  message: any;
  subscription: Subscription;
  accountList : any;
 environment: any;
 searchAcc: any;

  actions: action[] = [
    {value: 'Edit', viewValue: 'Edit'},
    {value: 'Delete', viewValue: 'Delete'}
  ];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  getAccountList() {
    this.accountlist.getRequest(`${environment.serverUrl}/accounts`, 'GET')
      .subscribe(data => {
        this.myAccounts = data.returnValue;
        this.dataSource = new MatTableDataSource<account>(this.myAccounts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
      });
    this.columnsToDisplay = ['Sr no', 'Account Name', 'Description', 'SBU Name', 'BU Name', 'Market Unit', 'Action'];
  }

  clearAccSearch() {
    this.searchAcc = '';
    this.dataSource.filter = '';
  }

  accountFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addAccount() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    const dialogRef: MatDialogRef<AccountAddComponent> = this.dialog.open(AccountAddComponent, { panelClass: 'addAccountModal' });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result === false) {
        console.log('Just close the dialog');
      } else {
       
        this.myAccounts.unshift(result);
        this.getAccountList();
        if(result !== undefined){
          if(result.event === "cancel"){
            //skip when cancel
          }else if(result.event === "reload"){ //either `Add row` or `Save and submit` clicked
            if(result.status === true){
              //one row updated
              this.notification.success('Account has been added Successfully');
            }
          }
        }
      }
    });
  }

  editAccount(elem){
   
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    const dialogRef: MatDialogRef<AccountEditComponent> = this.dialog.open(AccountEditComponent, { panelClass: 'addAccountModal', data: elem.accountId });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result === false) {
        console.log('Just close the dialog');
      } else {
        this.myAccounts.unshift(result);
        this.getAccountList();
        if(result !== undefined){
          if(result.event === "cancel"){
            //skip when cancel
          }else if(result.event === "update"){
            this.notification.success('Account has been updated Successfully');
          }
        
      }}
    });
  


  }

  constructor(
    private accountlist: ApiCommonService,
    private dialog: MatDialog,
    private notification: NotificationService,
    ) { 
      this.environment = environment.serverUrl;
  }

  ngOnInit(): void {
    this.getAccountList();
  }

}
