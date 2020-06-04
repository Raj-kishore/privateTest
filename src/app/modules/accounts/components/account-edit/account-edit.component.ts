import { Component, OnInit, Output, EventEmitter, Inject,HostListener, Optional } from '@angular/core';
import { ApiCommonService } from '../../../../services/api-common.service';
import { action } from '../../../../models/account'
import {trigger, state, style, animate, transition} from '@angular/animations';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { DatePipe } from '@angular/common'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css'],
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
export class AccountEditComponent implements OnInit {
  
  
  accountName: string;
  activeStatus: Boolean;
  bu: any;
  description: string;
  endDate: string;
  marketUnit: any;
  sbu: any;
  startDate: string;
  teamSize: number;

 
  value = "";
  isOpen = false;
  baseurl = 'http://51.137.208.124:8089/assessment-automation-platform';
  accountNameVal: any;
  errorMsg: any;
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

  accountId: string;


  constructor(  
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
    , private formBuilder: FormBuilder, private dialog: MatDialog,
    public dialogRef: MatDialogRef<AccountEditComponent>,
     public datepipe: DatePipe, private sbulist: ApiCommonService, 
     private bulist: ApiCommonService, 
     private marketunits: ApiCommonService, 
     private accountAdder: ApiCommonService,
     private accountRow: ApiCommonService
     ) {

      this.minDate1 = new Date();
      this.minDate2 = new Date();

      }

  ngOnInit(): void {
    this.accountId = this.data;


 

    this.innerWidth = window.innerWidth;
    this.dwidth = this.innerWidth - 400;
    this.innerHeight = window.innerHeight;
    this.dheight = this.innerHeight - 300;

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

    this.accountRow.getRequest(this.baseurl+'/accounts/'+this.accountId,'').subscribe((response=>{
      
      if(response.success === true){
          
            this.registerForm.controls['firstName'].setValue(response.returnValue.accountName);
            this.registerForm.controls['description'].setValue(response.returnValue.description);
            this.registerForm.controls['teamSize'].setValue(response.returnValue.teamSize);
            this.registerForm.controls['title'].setValue(response.returnValue.sbu.sbuId);
            this.changeSBUs(response.returnValue.sbu.sbuId); //trigger change function to load bulist
            this.registerForm.controls['title2'].setValue(response.returnValue.bu.buId);
            this.registerForm.controls['title3'].setValue(response.returnValue.marketUnit.marketUnitId);
            //this.registerForm.controls['starter'].setValue(response.returnValue.startDate);
           // this.registerForm.controls['ender'].setValue(response.returnValue.endDate);
      
      }else{
        console.log("Error in SBUs fetching :", response.message)
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
  saveAndSubmit(){
    //let start_date =this.datepipe.transform(this.registerForm.controls["starter"].value, 'dd-MM-yyyy');
   // let end_date = this.datepipe.transform(this.registerForm.controls["ender"].value, 'dd-MM-yyyy');
    
    let data = {
      "accountId":  ""+this.accountId,
      "accountName": ""+this.registerForm.controls["firstName"].value,
      "description": ""+this.registerForm.controls["description"].value,
      "activeStatus":"true",
      "teamSize": ""+this.registerForm.controls["teamSize"].value,
      "startDate": "10-10-2020",
      "endDate": "20-10-2020",
       "sbuId": ""+this.registerForm.controls["title"].value,
      "buId":""+this.registerForm.controls["title2"].value,
      "marketUnitId": ""+this.registerForm.controls["title3"].value,
      "createdBy":"admin"
    }
     this.accountAdder.updateRequest(this.baseurl+'/accounts','', data).subscribe((response=>{
       console.log(response.success+" <<< ")
      if(response.success === true){
        console.log("Successful while adding account => msg :", response.message)
        this.isOpen = false;
        console.log("is open state false ", this.isOpen)

        this.dialogRef.close({event:'update', status: true});
      }
    }),
    (err) =>{
      console.log(JSON.stringify(err) + " <<< ")
     
      console.log("Error message ", err)
      console.log("Error message ",err.includes("Validation") )
      if(err.includes("Validation")){
        this.errorMsg = ""+this.registerForm.controls["firstName"].value;
        this.isOpen = true;
      }else{
        this.errorMsg =""+err;
        this.isOpen = true;
      }
      //this.dialogRef.close({event:'reload', status: false});
      console.log("Error in Market units fetching :", err.message)

    }); 
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
