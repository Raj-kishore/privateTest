import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ApiCommonService } from '../../../../services/api-common.service';
import { assessment } from '../../../../models/assessment';
import { InitiateAssessmentComponent } from '../initiate-assessment/initiate-assessment.component';
import { NotificationService } from '../../../../services/notification.service';
import {MatSelectModule} from '@angular/material/select';
import { environment } from '../../../../../environments/environment';
import {  AuthenticationService } from '../../../../services/authentication.service';
import { User } from '../../../../models/login';
 
@Component({
  selector: 'app-assessment-dashboard',
  templateUrl: './assessment-dashboard.component.html',
  styleUrls: ['./assessment-dashboard.component.css']
})
export class AssessmentDashboardComponent implements OnInit {
  myAssessments: any;
  dataSource: any = [];
  columnsToDisplay: any;
  message: any;
  subscription: Subscription;
  assessmentList : any;
 environment: any;                                                                                        
 searchAssessment: any;
 currentUser: any;
 currentRole: any;
 myRole: any;
 isTrue: boolean;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  getAssessmentList() {
    //this.assessmentlist.getRequest(`${environment.serverUrl}/assessmenttemplates`, 'GET')
    this.assessmentlist.getRequest(`../../../assets/json/assessmenttemplates.json`, 'GET')
      .subscribe(data => {
        this.myAssessments = data.returnValue;
        this.dataSource = new MatTableDataSource<assessment>(this.myAssessments);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
      });
    this.columnsToDisplay = ['Sr no', 'Template Name', 'Template Type', 'Status', 'Effective Date', 'Dimensions', 'Action'];
  }

  clearAssessmentSearch() {
    this.searchAssessment = '';
    this.dataSource.filter = '';
  }

  assessmentFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  InitiateAssessment() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    const dialogRef: MatDialogRef<InitiateAssessmentComponent> = this.dialog.open(InitiateAssessmentComponent, { panelClass: 'initiateAssessmentModal' });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result === false) {
        console.log('Just close the dialog');
      } else {
        if(result !== undefined){
          if(result.event === "cancel"){
            //skip when cancel
          }else if(result.event === "reload"){ //either `Add row` or `Save and submit` clicked
            if(result.status === true){
              //one row updated
              this.notification.success('Assessment has been initiated');
            }else{
              //skip when no updates
            }
          }
        }
      }
    });
  }

  constructor(private assessmentlist: ApiCommonService,
    private dialog: MatDialog,
    private notification: NotificationService,
    private authenticationService: AuthenticationService) { 
      this.environment = environment.serverUrl;
      this.currentUser = this.authenticationService.currentUserValue;
      this.currentRole= this.currentUser.returnValue.roles; 
  //     this.myRole = this.currentRole[0].roleName;
  //     if (this.myRole != null && (this.myRole === "Admin" || this.myRole === "BU Head")) {
  //       this.isTrue=true;
  //  }else {
  //       this.isTrue=false;
  //  }
  }

  ngOnInit(): void {
    this.getAssessmentList();
  }

}
