import { Component, OnInit, HostListener, Directive } from '@angular/core';
import { ApiCommonService } from '../../../../services/api-common.service';
import { action } from '../../../../models/account'
import { account } from '../../../../models/account'
import {trigger, state, style, animate, transition} from '@angular/animations';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { DatePipe } from '@angular/common'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-account-add',
  templateUrl: './account-add.component.html',
  styleUrls: ['./account-add.component.css'],
  animations: [
    trigger('fade', [ 
      state('open', style({
        opacity: 1,
        display:"block"
      })),
      state('closed', style({
        opacity: 0,
        display: "none"
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ])
    ])
  ]
})
export class AccountAddComponent implements OnInit {
  
  value = "";
  isOpen = false;
  baseurl = 'http://51.137.208.124:8089/assessment-automation-platform';
  accountNameVal: any;
  descriptionVal: any;
  teamSizeVal: any;
  picker1: any;
  picker2: any;
  allSBUsArray: action[] = [];
  allBUsArray: action[] = [];
  allMarketUnitsArray: action[] = [];
  SBUID : any;
  BUID : any;
  MUID : any;
  
  public innerWidth: any;
  public innerHeight: any;
  dwidth: number;
  dheight: number

  registerForm: FormGroup;
  submitted = false;
  minDate1: Date;
  minDate2: Date;
  success: Boolean = false;


  constructor( private formBuilder: FormBuilder, private dialog: MatDialog,
    public dialogRef: MatDialogRef<AccountAddComponent>,
     public datepipe: DatePipe, private sbulist: ApiCommonService, private bulist: ApiCommonService, private marketunits: ApiCommonService, private accountAdder: ApiCommonService) {

this.minDate1 = new Date();
this.minDate2 = new Date();
      }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.dwidth = this.innerWidth - 400;
    this.innerHeight = window.innerHeight;
    this.dheight = this.innerHeight - 200;

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      description: [''],
      teamSize: ['', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.maxLength(5)
      ]],
      title: ['', Validators.required],
      title2: ['', Validators.required],
      title3: ['', Validators.required],
      // starter: ['', Validators.required],
      // ender: ['', Validators.required],
      // title: ['', Validators.required],
      // bu: ['', Validators.required]
  });

    this.sbulist.getRequest(this.baseurl+'/sbus','').subscribe((response=>{
      if(response.success === true){
          response.returnValue.map( x =>{
          let y: action = {value: x.sbuId, viewValue: x.sbuName};
          this.allSBUsArray.push(y);
        })
      }else{
        console.log("Error in SBUs fetching :", response.message)
      }
    }));

    this.marketunits.getRequest(this.baseurl+'/marketunits','').subscribe((response=>{
      if(response.success === true){
          response.returnValue.map( m =>{
          let n: action = {value: m.marketUnitId, viewValue: m.name};
          this.allMarketUnitsArray.push(n);   
        })
      }else{
        console.log("Error in Market units fetching :", response.message)
      }
    })); 

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.dwidth = this.innerWidth - 400;
    this.innerHeight = window.innerHeight;
    this.dheight = this.innerHeight - 200;
  }
  
  get f() { return this.registerForm.controls; }
  
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    // display form values on success
   // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
}
   addRow(){
    let start_date =this.datepipe.transform(this.picker1, 'dd-MM-yyyy');
    let end_date = this.datepipe.transform(this.picker2, 'dd-MM-yyyy');
    let data = {
      "accountName": ""+this.accountNameVal,
      "description": ""+this.descriptionVal,
      "activeStatus":"true",
      "teamSize": ""+this.teamSizeVal,
      "startDate": "10-10-2020",
      "endDate": "20-10-2020",
      "sbuId": ""+this.SBUID,
      "buId":""+this.BUID,
      "marketUnitId": ""+this.MUID,
      "createdBy":"admin"
    }

     this.accountAdder.insertRequest(this.baseurl+'/accounts','', data).subscribe((response=>{
      if(response.success === true){
        console.log("Successful while adding account => msg :", response.message)
        this.isOpen = true;
        this.success = true;
        //Reset the form when success
        this.registerForm.reset();
      }else{
        this.success = false;
        console.log("Error in Market units fetching :", response.message)
      }
    }));      
  }

  saveAndSubmit(){
    let start_date =this.datepipe.transform(this.picker1, 'dd-MM-yyyy');
    let end_date = this.datepipe.transform(this.picker2, 'dd-MM-yyyy');
    let data = {
      "accountName": ""+this.accountNameVal,
      "description": ""+this.descriptionVal,
      "activeStatus":"true",
      "teamSize": ""+this.teamSizeVal,
      "startDate": "10-10-2020",
      "endDate": "20-10-2020",
      "sbuId": ""+this.SBUID,
      "buId":""+this.BUID,
      "marketUnitId": ""+this.MUID,
      "createdBy":"admin"
    }
     this.accountAdder.insertRequest(this.baseurl+'/accounts','', data).subscribe((response=>{
      if(response.success === true){
        console.log("Successful while adding account => msg :", response.message)
        this.isOpen = true;
        this.dialogRef.close({event:'reload', status: true});
      }else{
        this.dialogRef.close({event:'reload', status: false});
        console.log("Error in Market units fetching :", response.message)
      }
    })); 
    //const dialogRef: MatDialogRef<AccountAddComponent> = this.dialog.open(AccountAddComponent, { panelClass: 'addAccountModal' });
  }
  
  cancel(){
   // const dialogRef: MatDialogRef<AccountAddComponent> = this.dialog.open(AccountAddComponent, { panelClass: 'addAccountModal' });
    this.dialogRef.close({event:'cancel'});
  }

  changeSBUs(value){
    this.SBUID = value;
    this.allBUsArray = [];
    this.bulist.getRequest(this.baseurl+'/sbus','').subscribe((response=>{
      if(response.success === true){
          response.returnValue.map( p =>{
           
          if(p.sbuId === this.SBUID){
            
            p.bus.map( r =>{
              let q: action = {value: r.buId, viewValue: r.buName};
              console.log(q)
              this.allBUsArray.push(q);  
            })
      

          }   
        
        })
      }else{
        console.log("Error in BUs fetching :", response.message)
      }
    }));
  }
  changeBUs(value){
    this.BUID = value;
  }
  changeMUs(value){
    this.MUID = value;
  }
  onAccountChange(event: any){
    this.accountNameVal =  event.target.value;
  }
  onDescChange(event: any){
    this.descriptionVal =  event.target.value;
  }
  onTeamSizeChange(event: any){
    this.teamSizeVal =  event.target.value;
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
}