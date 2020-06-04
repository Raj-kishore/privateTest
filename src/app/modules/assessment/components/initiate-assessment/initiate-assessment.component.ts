import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import {ApiCommonService } from '../../../../services/api-common.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-initiate-assessment',
  templateUrl: './initiate-assessment.component.html',
  styleUrls: ['./initiate-assessment.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class InitiateAssessmentComponent implements OnInit {
  isLinear = true;
  initiateAssessmentForm: FormGroup;
  assessmentdata;
  picker1: any;
  picker2: any;
  minDate1: Date;
  minDate2: Date;

  constructor(private fb: FormBuilder,
    private initiateAssessmentService: ApiCommonService,
    public dialogRef: MatDialogRef<InitiateAssessmentComponent>, private dialog: MatDialog) {
    
  }

  initiateAssessment() {
    //this.initiateAssessmentService.insertRequest(`../../../assets/json/initiateassessment.json`, 'POST', this.assessmentdata)
    this.initiateAssessmentService.getRequest(`../../../assets/json/initiateassessment.json`, 'get')
      .subscribe(data => {
        if(data.success === true){
          // console.log("Successful while adding account => msg :", response.message)
          // this.isOpen = true;
          this.dialogRef.close({event:'reload', status: true});
        }else{
          this.dialogRef.close({event:'reload', status: false});
          //console.log("Error in Market units fetching :", response.message)
        }
        console.log(data);
        
      });
    console.log(this.initiateAssessmentForm.value);
  }

  cancel() {
     this.dialogRef.close({event:'cancel'});
   }

   startEvent(type: string, event: MatDatepickerInputEvent<Date>){
    this.picker1 = event.value;
    let track = this.minDate2;
    this.minDate2 = this.picker1;
    //alert(this.minDate1+" = = = "+ this.picker1);
    
    const currentYear = new Date().getFullYear();
//    this.minDate = new Date() - this.picker1;
  }
  endEvent(type: string, event: MatDatepickerInputEvent<Date>){
    this.picker2 =   event.value;
  }

  ngOnInit(): void {
    this.initiateAssessmentForm = this.fb.group({ 
      assessmentDetails: this.fb.group({
         assessmentName: ['', Validators.required],
         startDate: ['', Validators.required],
         endDate: ['', Validators.required],
         assessmentTemplate: ['', Validators.required],
        }),
        accountDetails: this.fb.group({
          sbuName: ['', Validators.required],
          buName: ['', Validators.required],
          marketUnit: ['', Validators.required],
          accountName: ['', Validators.required]
         }),
         roleDetails: this.fb.group({
          smeName: ['', Validators.required],
          accSpocName: ['', Validators.required],
          projMember: ['', Validators.required]
         })
      });
      this.assessmentdata = this.initiateAssessmentForm.value;
      console.log(this.assessmentdata);
  }
}
