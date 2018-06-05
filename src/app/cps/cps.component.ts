import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-cps',
  templateUrl: './cps.component.html',
  styleUrls: ['./cps.component.scss']
})
export class CpsComponent implements OnInit {

  cpsForm: FormGroup;
  formActive = true;
  countryItems = [];
  countryCodeInput = "";
  firstNameControl;
  lastNameControl;
  companyControl;
  designationControl;
  emailControl;
  phoneControl;
  formFilled = false;

  firstName: string;
  lastName: string;
  company: string;
  designation: string;
  email: string;
  mobile: string;
  country: string;
  message: string;

  constructor(private formBuilder: FormBuilder, private data: DataService) { 
    this.buildReportForm();
    this.countryItems = [
      { name: "Bahrain", number: "+(973)"},
      { name: "Egypt", number: "+(20)"},
      { name: "Jordan", number: "+(962)"},
      { name: "Kuwait", number: "+(965)"},
      { name: "Lebanon", number: "+(961)"},
      { name: "Oman", number: "+(968)"},
      { name: "Qatar", number: "+(974)"},
      { name: "UAE - Abu Dhabi", number: "+(971)"},
      { name: "UAE - Dubai", number: "+(971)"},
      { name: "UAE - Other", number: "+(971)"}
    ];
  }

  buildReportForm(){
    this.cpsForm = this.formBuilder.group({
      firstName: this.formBuilder.control(this.firstName,
        Validators.compose([Validators.required, Validators.minLength(2)])
      ),
      lastName: this.formBuilder.control(this.lastName,
        Validators.compose([Validators.required, Validators.minLength(2)])
      ),
      company: this.formBuilder.control(this.company,
        Validators.compose([Validators.required])
      ),
      designation: this.formBuilder.control(this.designation,
        Validators.compose([Validators.required])
      ),
      email: this.formBuilder.control(this.email,
        Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])
      ),
      countryCode: this.formBuilder.control('+(973)'),
      mobile: this.formBuilder.control(this.mobile,
        Validators.compose([Validators.required, Validators.pattern('^[-+()0-9 ]*$')])
      ),
      country: this.formBuilder.control('Bahrain'),
      lead_source: this.formBuilder.control('Partner Aquisition Campaign'),
      '00N20000001DX1u': this.formBuilder.control('CFOSurveyResults'),
      rating: this.formBuilder.control('Hot')
    });

   this.firstNameControl =  this.cpsForm.get('firstName');
   this.firstNameControl.valueChanges
      .subscribe(value => {
        value && value.toLowerCase().trim();
        this.data.changeFirstName(value);
      });

    this.lastNameControl =  this.cpsForm.get('lastName');
    this.lastNameControl.valueChanges
        .subscribe(value => {
          value && value.toLowerCase().trim();
          this.data.changeLastName(value);
        });
    
    this.companyControl =  this.cpsForm.get('company');
    this.companyControl.valueChanges
        .subscribe(value => {
          value && value.toLowerCase().trim();
          this.data.changeCompany(value);
        });
    
    this.designationControl =  this.cpsForm.get('designation');
    this.designationControl.valueChanges
        .subscribe(value => {
          value && value.toLowerCase().trim();
          this.data.changeDesignation(value);
        });
        
    this.emailControl =  this.cpsForm.get('email');
    this.emailControl.valueChanges
        .subscribe(value => {
          value && value.toLowerCase().trim();
          this.data.changeEmail(value);
        });
    
    this.phoneControl =  this.cpsForm.get('mobile');
    this.phoneControl.valueChanges
        .subscribe(value => {
          value && value.toLowerCase().trim();
          this.data.changeMobile(value);
        });    
    
        
  }

  ngOnInit() {
    this.data.currentFirstName.subscribe((value) => this.firstName = value );
    this.data.currentLastName.subscribe((value) => this.lastName = value );
    this.data.currentCompany.subscribe((value) => this.company = value );
    this.data.currentDesignation.subscribe((value) => this.designation = value );
    this.data.currentEmail.subscribe((value) => this.email = value );
    this.data.currentMobile.subscribe((value) => this.mobile = value );
    this.data.currentCountry.subscribe((value) => this.country = value );
    this.data.currentMessage.subscribe((value) => this.message = value );
  }

  ngOnChanges(){
    //this.data.currentFirstName.subscribe(formFirstName => this.firstName = formFirstName );
  }

  onSubmitForm(){
    console.log(this.cpsForm.value);
    this.formFilled = true;
  }

  setCountryCode(value){
    for(var i=0; i<this.countryItems.length; i++){
      if(this.countryItems[i].name == value){
        this.countryCodeInput = this.countryItems[i].number;

        let countryCodeControl = this.cpsForm.get('countryCode') as FormControl;
        countryCodeControl.setValue(this.countryItems[i].number);

      }
    }
  }

}
