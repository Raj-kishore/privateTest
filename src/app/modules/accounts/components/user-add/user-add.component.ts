import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiCommonService } from '../../../../services/api-common.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {environment} from '../../../../../environments/environment';
import { action } from '../../../../models/account';
import {trigger, state, style, animate, transition} from '@angular/animations';


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css'],
  animations: [
    trigger('fade', [ 
      state('open', style({
        opacity: 1
      })),
      state('closed', style({
        opacity: 0,
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
export class UserAddComponent implements OnInit {
   
  UserNameVal: any;
  loginVal:any;
  emailIdVal:any;
  checked=false;
  environment: any;
  registerForm: FormGroup;
   submitted = false;
  value="";
  public innerWidth: any;
  width: number;
  isOpen = false;
  allSMEArea: action[] = [];
  allSBUsArray: action[] = [];
  allBUsArray: action[] = [];
  SME:any;
  SBUID : any;
  BUID : any;
  radio_val:any;
  disabled =true;
  disabledSBU = true;

  disabledBU = true;

  success: Boolean = false;
  user_role:any=[];
  chk:any;
  chckbox_role_value:any=[];
  radio_role_value:any=[];
  
  constructor( private formBuilder: FormBuilder, private dialog: MatDialog,public dialogRef: MatDialogRef<UserAddComponent>,
    private smearea: ApiCommonService,private userAdder: ApiCommonService,private sbulist: ApiCommonService, private bulist: ApiCommonService) {
      this.environment = environment.serverUrl;
     }

  ngOnInit(): void {
   
    this.innerWidth = window.innerWidth;
    this.width = this.innerWidth - 400;
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      loginid: ['', Validators.required],
      emailid: ['', Validators.required],
      radio_role: new FormControl(''),
      chk1:new FormControl(false),
      chk2:new FormControl(false),
      chk3:new FormControl(false),
      title:["",""],
      title2:[""],
      title3:[""]
     
      
        
  });
  this.smearea.getRequest(environment.serverUrl+'/smeareas','').subscribe((response=>{
    if(response.success === true){
      response.returnValue.map( m =>{
      let n: action = {value: m.smeAreaId, viewValue: m.name};
      this.allSMEArea.push(n);   
    })
    }else{
      console.log("Error in Market units fetching :", response.message)
    }
  })); 
  this.sbulist.getRequest(environment.serverUrl+'/sbus','').subscribe((response=>{
    if(response.success === true){
        response.returnValue.map( x =>{
        let y: action = {value: x.sbuId, viewValue: x.sbuName};
        this.allSBUsArray.push(y);
        
      })
    }else{
      console.log("Error in SBUs fetching :", response.message)
    }
  }));
 
  
  }
  updateChkbxArray(chk, isChecked,){
    this.radio_role_value=[];
   console.log(isChecked);
   if(chk=='1' && isChecked){
     this.disabled= false; 
     

   }
   else if(chk=='1' && !isChecked){
    this.disabled=true; 
   }
   if (isChecked) {
     this.registerForm.get('radio_role').setValue('false');
     this.registerForm.get('title2').setValue("");
     this.registerForm.get('title3').setValue("");
     this.disabledSBU=true;
     this.disabledBU=true;

    //sometimes inserts values already included creating double records for the same values -hence the defence
    if (this.chckbox_role_value.indexOf(chk== -1))
    this.chckbox_role_value.push(chk);
    console.log(this.chckbox_role_value);
} else {
    let idx =  this.chckbox_role_value.indexOf(chk);
   // this.chckbox_role_value.splice(index);
   if(idx>-1){
     this.chckbox_role_value.splice(idx,1);
     console.log(this.chckbox_role_value);
   }
}
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
  onUserChange(event: any){
    this.UserNameVal =  event.target.value;
  }
  onLoginChange(event: any){
    this.loginVal =  event.target.value;
  }
  onEmailidChange(event: any){
    this.emailIdVal =  event.target.value;
  }
  changeSMEArea(value){
    this.SME = value;
   
  }
  changeRadio(e) {
    //console.log(typeof(e.value), " . . . . ", isChecked)
    //if ( isChecked === true){
      if(e.value=== "6" || e.value==="7" || e.value==="8" || e.value==="9"){
        this.disabledSBU = false;
        this.disabledBU = false;
 
      }else{
        this.disabledSBU = true;
        this.disabledBU = true;

      }
      //}else{
       //this.disabledSBU = true;
    //}
    this.radio_role_value=[];
    this.chckbox_role_value=[];
    this.registerForm.patchValue({chk1:false,chk2:false,chk3:false});
    this.registerForm.get('title').setValue("");
    this.disabled=true;
       this.radio_role_value.push(e.value);
    console.log(this.radio_role_value);
    //this.chckbox_role_value=[];
    console.log(e.value);  
  }
  
  addRow(){
    //console.log(this.registerForm.get('radio_role').value);
    alert('hi');
    console.log(this.registerForm.get('title'));
    console.log(this.registerForm.get('title2'));
    console.log(this.registerForm.get('title3'));
    let result;
    if(this.registerForm.get('title').value ==null ||  this.registerForm.get('title').value ==undefined ){
      result = ['-'];
    }else{
      
      result =(this.registerForm.get('title').value).map(String);
    }
    // let data ={
    //   "longName":"asfiya",
    //     "loginId":"asansarttiss",
    //     "emailId":"techzttss.ansari@capgemini.com",
    //     "createdBy":"asas",
    //     "roleIds":["1","2"],
    //     "sbuId":["1","2"],
    //     "buId":["1","2"],
    //     "smeAreaIds":"",
    //     "activeStatus":true

    // }
        let data = {
      "longName": ""+this.UserNameVal,
      "loginId": ""+this.loginVal,
      "emailId":""+this.registerForm.controls["emailid"].value, 
      "createdBy":"ApeAdmin",
      "roleIds":this.radio_role_value.concat(this.chckbox_role_value),
       "smeAreaIds": result ,
      "buId":""+this.BUID==null|| this.BUID==undefined? '-' :  this.BUID.toString(),
      //"buId":""+this.BUID.toString(),
     //"sbuId": ""+this.SBUID.toString(),
       "sbuId": ""+this.SBUID==null||this.SBUID==undefined? '-' : this.SBUID.toString(),

      "activeStatus":true
    }
  
    console.log(this.radio_role_value);
    console.log(this.chckbox_role_value);
    console.log(data);
     this.userAdder.insertRequest(environment.serverUrl+'/users','', data).subscribe((response=>{
      if(response.success === true){
        console.log("Successful while adding account => msg :", response.message)
        this.isOpen = true;
        this.success = true;
        //Reset the form when success
        this.registerForm.reset();
      }else{
        this.success = false;
        console.log("Error in sme area fetching :", response.message)
      }
    }));  
 
  }
  saveAndSubmit(){

    let data = {
      "longName": ""+this.UserNameVal,
      "loginId": ""+this.loginVal,
      "emailId":""+this.registerForm.controls["emailid"].value, 
      "createdBy":"ApeAdmin",
      "roleIds":this.radio_role_value.concat(this.chckbox_role_value),
      "smeAreaIds": this.registerForm.get('title').value? this.registerForm.get('title').value:['-'] ,
      "buId":""+this.BUID? this.BUID:'-',
      "sbuId": ""+this.SBUID? this.SBUID:'-',
      activeStatus:true
    }
     this.userAdder.insertRequest(environment.serverUrl+'/users','', data).subscribe((response=>{
      if(response.success === true){
        console.log("Successful while adding user => msg :", response.message)
        this.isOpen = true;
        this.dialogRef.close({event:'reload', status: true});
      }else{
        this.dialogRef.close({event:'reload', status: false});
        console.log("Error in sme area fetching :", response.message)
      }
    })); 
    //const dialogRef: MatDialogRef<AccountAddComponent> = this.dialog.open(AccountAddComponent, { panelClass: 'addAccountModal' });
  }
  cancel(){
        this.dialogRef.close({event:'cancel'});
   }
  changeSBUs(value){
    this.SBUID = value;
    this.allBUsArray = [];
    this.bulist.getRequest(environment.serverUrl+'/sbus','').subscribe((response=>{
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
}
