import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Headers, Http, Request, RequestMethod, RequestOptions, Response } from '@angular/http';
import { DataService } from '../shared/data.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {

  reportForm: FormGroup;
  formActive = true;
  countryItems = [];
  countryCodeInput = "";
  firstNameControl;
  lastNameControl;
  companyControl;
  designationControl;
  emailControl;
  countryControl;
  countryCodeControl;
  phoneControl;
  downloadable = false;

  firstName: string;
  lastName: string;
  company: string;
  designation: string;
  email: string;
  countryCode: string;
  mobile: string;
  country: string;
  message: string;

  constructor(private formBuilder: FormBuilder, private data: DataService, private http:HttpClient) {   

    this.buildReportForm();
    this.countryItems = [ { "name": "Afghanistan", "dial_code": "+93", "code": "AF" }, { "name": "Åland Islands", "dial_code": "+358", "code": "AX" }, { "name": "Albania", "dial_code": "+355", "code": "AL" }, { "name": "Algeria", "dial_code": "+213", "code": "DZ" }, { "name": "American Samoa", "dial_code": "+1684", "code": "AS" }, { "name": "Andorra", "dial_code": "+376", "code": "AD" }, { "name": "Angola", "dial_code": "+244", "code": "AO" }, { "name": "Anguilla", "dial_code": "+1264", "code": "AI" }, { "name": "Antarctica", "dial_code": "+672", "code": "AQ" }, { "name": "Antigua and Barbuda", "dial_code": "+1268", "code": "AG" }, { "name": "Argentina", "dial_code": "+54", "code": "AR" }, { "name": "Armenia", "dial_code": "+374", "code": "AM" }, { "name": "Aruba", "dial_code": "+297", "code": "AW" }, { "name": "Australia", "dial_code": "+61", "code": "AU" }, { "name": "Austria", "dial_code": "+43", "code": "AT" }, { "name": "Azerbaijan", "dial_code": "+994", "code": "AZ" }, { "name": "Bahamas", "dial_code": "+1242", "code": "BS" }, { "name": "Bahrain", "dial_code": "+973", "code": "BH" }, { "name": "Bangladesh", "dial_code": "+880", "code": "BD" }, { "name": "Barbados", "dial_code": "+1246", "code": "BB" }, { "name": "Belarus", "dial_code": "+375", "code": "BY" }, { "name": "Belgium", "dial_code": "+32", "code": "BE" }, { "name": "Belize", "dial_code": "+501", "code": "BZ" }, { "name": "Benin", "dial_code": "+229", "code": "BJ" }, { "name": "Bermuda", "dial_code": "+1441", "code": "BM" }, { "name": "Bhutan", "dial_code": "+975", "code": "BT" }, { "name": "Bolivia, Plurinational State of bolivia", "dial_code": "+591", "code": "BO" }, { "name": "Bosnia and Herzegovina", "dial_code": "+387", "code": "BA" }, { "name": "Botswana", "dial_code": "+267", "code": "BW" }, { "name": "Bouvet Island", "dial_code": "+47", "code": "BV" }, { "name": "Brazil", "dial_code": "+55", "code": "BR" }, { "name": "British Indian Ocean Territory", "dial_code": "+246", "code": "IO" }, { "name": "Brunei Darussalam", "dial_code": "+673", "code": "BN" }, { "name": "Bulgaria", "dial_code": "+359", "code": "BG" }, { "name": "Burkina Faso", "dial_code": "+226", "code": "BF" }, { "name": "Burundi", "dial_code": "+257", "code": "BI" }, { "name": "Cambodia", "dial_code": "+855", "code": "KH" }, { "name": "Cameroon", "dial_code": "+237", "code": "CM" }, { "name": "Canada", "dial_code": "+1", "code": "CA" }, { "name": "Cape Verde", "dial_code": "+238", "code": "CV" }, { "name": "Cayman Islands", "dial_code": "+ 345", "code": "KY" }, { "name": "Central African Republic", "dial_code": "+236", "code": "CF" }, { "name": "Chad", "dial_code": "+235", "code": "TD" }, { "name": "Chile", "dial_code": "+56", "code": "CL" }, { "name": "China", "dial_code": "+86", "code": "CN" }, { "name": "Christmas Island", "dial_code": "+61", "code": "CX" }, { "name": "Cocos (Keeling) Islands", "dial_code": "+61", "code": "CC" }, { "name": "Colombia", "dial_code": "+57", "code": "CO" }, { "name": "Comoros", "dial_code": "+269", "code": "KM" }, { "name": "Congo", "dial_code": "+242", "code": "CG" }, { "name": "Congo, The Democratic Republic of the Congo", "dial_code": "+243", "code": "CD" }, { "name": "Cook Islands", "dial_code": "+682", "code": "CK" }, { "name": "Costa Rica", "dial_code": "+506", "code": "CR" }, { "name": "Cote d'Ivoire", "dial_code": "+225", "code": "CI" }, { "name": "Croatia", "dial_code": "+385", "code": "HR" }, { "name": "Cuba", "dial_code": "+53", "code": "CU" }, { "name": "Cyprus", "dial_code": "+357", "code": "CY" }, { "name": "Czech Republic", "dial_code": "+420", "code": "CZ" }, { "name": "Denmark", "dial_code": "+45", "code": "DK" }, { "name": "Djibouti", "dial_code": "+253", "code": "DJ" }, { "name": "Dominica", "dial_code": "+1767", "code": "DM" }, { "name": "Dominican Republic", "dial_code": "+1849", "code": "DO" }, { "name": "Ecuador", "dial_code": "+593", "code": "EC" }, { "name": "Egypt", "dial_code": "+20", "code": "EG" }, { "name": "El Salvador", "dial_code": "+503", "code": "SV" }, { "name": "Equatorial Guinea", "dial_code": "+240", "code": "GQ" }, { "name": "Eritrea", "dial_code": "+291", "code": "ER" }, { "name": "Estonia", "dial_code": "+372", "code": "EE" }, { "name": "Ethiopia", "dial_code": "+251", "code": "ET" }, { "name": "Falkland Islands (Malvinas)", "dial_code": "+500", "code": "FK" }, { "name": "Faroe Islands", "dial_code": "+298", "code": "FO" }, { "name": "Fiji", "dial_code": "+679", "code": "FJ" }, { "name": "Finland", "dial_code": "+358", "code": "FI" }, { "name": "France", "dial_code": "+33", "code": "FR" }, { "name": "French Guiana", "dial_code": "+594", "code": "GF" }, { "name": "French Polynesia", "dial_code": "+689", "code": "PF" }, { "name": "French Southern Territories", "dial_code": "+262", "code": "TF" }, { "name": "Gabon", "dial_code": "+241", "code": "GA" }, { "name": "Gambia", "dial_code": "+220", "code": "GM" }, { "name": "Georgia", "dial_code": "+995", "code": "GE" }, { "name": "Germany", "dial_code": "+49", "code": "DE" }, { "name": "Ghana", "dial_code": "+233", "code": "GH" }, { "name": "Gibraltar", "dial_code": "+350", "code": "GI" }, { "name": "Greece", "dial_code": "+30", "code": "GR" }, { "name": "Greenland", "dial_code": "+299", "code": "GL" }, { "name": "Grenada", "dial_code": "+1473", "code": "GD" }, { "name": "Guadeloupe", "dial_code": "+590", "code": "GP" }, { "name": "Guam", "dial_code": "+1671", "code": "GU" }, { "name": "Guatemala", "dial_code": "+502", "code": "GT" }, { "name": "Guernsey", "dial_code": "+44", "code": "GG" }, { "name": "Guinea", "dial_code": "+224", "code": "GN" }, { "name": "Guinea-Bissau", "dial_code": "+245", "code": "GW" }, { "name": "Guyana", "dial_code": "+592", "code": "GY" }, { "name": "Haiti", "dial_code": "+509", "code": "HT" }, { "name": "Heard Island and Mcdonald Islands", "dial_code": "+0", "code": "HM" }, { "name": "Holy See (Vatican City State)", "dial_code": "+379", "code": "VA" }, { "name": "Honduras", "dial_code": "+504", "code": "HN" }, { "name": "Hong Kong", "dial_code": "+852", "code": "HK" }, { "name": "Hungary", "dial_code": "+36", "code": "HU" }, { "name": "Iceland", "dial_code": "+354", "code": "IS" }, { "name": "India", "dial_code": "+91", "code": "IN" }, { "name": "Indonesia", "dial_code": "+62", "code": "ID" }, { "name": "Iran, Islamic Republic of Persian Gulf", "dial_code": "+98", "code": "IR" }, { "name": "Iraq", "dial_code": "+964", "code": "IQ" }, { "name": "Ireland", "dial_code": "+353", "code": "IE" }, { "name": "Isle of Man", "dial_code": "+44", "code": "IM" }, { "name": "Israel", "dial_code": "+972", "code": "IL" }, { "name": "Italy", "dial_code": "+39", "code": "IT" }, { "name": "Jamaica", "dial_code": "+1876", "code": "JM" }, { "name": "Japan", "dial_code": "+81", "code": "JP" }, { "name": "Jersey", "dial_code": "+44", "code": "JE" }, { "name": "Jordan", "dial_code": "+962", "code": "JO" }, { "name": "Kazakhstan", "dial_code": "+7", "code": "KZ" }, { "name": "Kenya", "dial_code": "+254", "code": "KE" }, { "name": "Kiribati", "dial_code": "+686", "code": "KI" }, { "name": "Korea, Democratic People's Republic of Korea", "dial_code": "+850", "code": "KP" }, { "name": "Korea, Republic of South Korea", "dial_code": "+82", "code": "KR" }, { "name": "Kosovo", "dial_code": "+383", "code": "XK" }, { "name": "Kuwait", "dial_code": "+965", "code": "KW" }, { "name": "Kyrgyzstan", "dial_code": "+996", "code": "KG" }, { "name": "Laos", "dial_code": "+856", "code": "LA" }, { "name": "Latvia", "dial_code": "+371", "code": "LV" }, { "name": "Lebanon", "dial_code": "+961", "code": "LB" }, { "name": "Lesotho", "dial_code": "+266", "code": "LS" }, { "name": "Liberia", "dial_code": "+231", "code": "LR" }, { "name": "Libyan Arab Jamahiriya", "dial_code": "+218", "code": "LY" }, { "name": "Liechtenstein", "dial_code": "+423", "code": "LI" }, { "name": "Lithuania", "dial_code": "+370", "code": "LT" }, { "name": "Luxembourg", "dial_code": "+352", "code": "LU" }, { "name": "Macao", "dial_code": "+853", "code": "MO" }, { "name": "Macedonia", "dial_code": "+389", "code": "MK" }, { "name": "Madagascar", "dial_code": "+261", "code": "MG" }, { "name": "Malawi", "dial_code": "+265", "code": "MW" }, { "name": "Malaysia", "dial_code": "+60", "code": "MY" }, { "name": "Maldives", "dial_code": "+960", "code": "MV" }, { "name": "Mali", "dial_code": "+223", "code": "ML" }, { "name": "Malta", "dial_code": "+356", "code": "MT" }, { "name": "Marshall Islands", "dial_code": "+692", "code": "MH" }, { "name": "Martinique", "dial_code": "+596", "code": "MQ" }, { "name": "Mauritania", "dial_code": "+222", "code": "MR" }, { "name": "Mauritius", "dial_code": "+230", "code": "MU" }, { "name": "Mayotte", "dial_code": "+262", "code": "YT" }, { "name": "Mexico", "dial_code": "+52", "code": "MX" }, { "name": "Micronesia, Federated States of Micronesia", "dial_code": "+691", "code": "FM" }, { "name": "Moldova", "dial_code": "+373", "code": "MD" }, { "name": "Monaco", "dial_code": "+377", "code": "MC" }, { "name": "Mongolia", "dial_code": "+976", "code": "MN" }, { "name": "Montenegro", "dial_code": "+382", "code": "ME" }, { "name": "Montserrat", "dial_code": "+1664", "code": "MS" }, { "name": "Morocco", "dial_code": "+212", "code": "MA" }, { "name": "Mozambique", "dial_code": "+258", "code": "MZ" }, { "name": "Myanmar", "dial_code": "+95", "code": "MM" }, { "name": "Namibia", "dial_code": "+264", "code": "NA" }, { "name": "Nauru", "dial_code": "+674", "code": "NR" }, { "name": "Nepal", "dial_code": "+977", "code": "NP" }, { "name": "Netherlands", "dial_code": "+31", "code": "NL" }, { "name": "Netherlands Antilles", "dial_code": "+599", "code": "AN" }, { "name": "New Caledonia", "dial_code": "+687", "code": "NC" }, { "name": "New Zealand", "dial_code": "+64", "code": "NZ" }, { "name": "Nicaragua", "dial_code": "+505", "code": "NI" }, { "name": "Niger", "dial_code": "+227", "code": "NE" }, { "name": "Nigeria", "dial_code": "+234", "code": "NG" }, { "name": "Niue", "dial_code": "+683", "code": "NU" }, { "name": "Norfolk Island", "dial_code": "+672", "code": "NF" }, { "name": "Northern Mariana Islands", "dial_code": "+1670", "code": "MP" }, { "name": "Norway", "dial_code": "+47", "code": "NO" }, { "name": "Oman", "dial_code": "+968", "code": "OM" }, { "name": "Pakistan", "dial_code": "+92", "code": "PK" }, { "name": "Palau", "dial_code": "+680", "code": "PW" }, { "name": "Palestinian Territory, Occupied", "dial_code": "+970", "code": "PS" }, { "name": "Panama", "dial_code": "+507", "code": "PA" }, { "name": "Papua New Guinea", "dial_code": "+675", "code": "PG" }, { "name": "Paraguay", "dial_code": "+595", "code": "PY" }, { "name": "Peru", "dial_code": "+51", "code": "PE" }, { "name": "Philippines", "dial_code": "+63", "code": "PH" }, { "name": "Pitcairn", "dial_code": "+64", "code": "PN" }, { "name": "Poland", "dial_code": "+48", "code": "PL" }, { "name": "Portugal", "dial_code": "+351", "code": "PT" }, { "name": "Puerto Rico", "dial_code": "+1939", "code": "PR" }, { "name": "Qatar", "dial_code": "+974", "code": "QA" }, { "name": "Romania", "dial_code": "+40", "code": "RO" }, { "name": "Russia", "dial_code": "+7", "code": "RU" }, { "name": "Rwanda", "dial_code": "+250", "code": "RW" }, { "name": "Reunion", "dial_code": "+262", "code": "RE" }, { "name": "Saint Barthelemy", "dial_code": "+590", "code": "BL" }, { "name": "Saint Helena, Ascension and Tristan Da Cunha", "dial_code": "+290", "code": "SH" }, { "name": "Saint Kitts and Nevis", "dial_code": "+1869", "code": "KN" }, { "name": "Saint Lucia", "dial_code": "+1758", "code": "LC" }, { "name": "Saint Martin", "dial_code": "+590", "code": "MF" }, { "name": "Saint Pierre and Miquelon", "dial_code": "+508", "code": "PM" }, { "name": "Saint Vincent and the Grenadines", "dial_code": "+1784", "code": "VC" }, { "name": "Samoa", "dial_code": "+685", "code": "WS" }, { "name": "San Marino", "dial_code": "+378", "code": "SM" }, { "name": "Sao Tome and Principe", "dial_code": "+239", "code": "ST" }, { "name": "Saudi Arabia", "dial_code": "+966", "code": "SA" }, { "name": "Senegal", "dial_code": "+221", "code": "SN" }, { "name": "Serbia", "dial_code": "+381", "code": "RS" }, { "name": "Seychelles", "dial_code": "+248", "code": "SC" }, { "name": "Sierra Leone", "dial_code": "+232", "code": "SL" }, { "name": "Singapore", "dial_code": "+65", "code": "SG" }, { "name": "Slovakia", "dial_code": "+421", "code": "SK" }, { "name": "Slovenia", "dial_code": "+386", "code": "SI" }, { "name": "Solomon Islands", "dial_code": "+677", "code": "SB" }, { "name": "Somalia", "dial_code": "+252", "code": "SO" }, { "name": "South Africa", "dial_code": "+27", "code": "ZA" }, { "name": "South Sudan", "dial_code": "+211", "code": "SS" }, { "name": "South Georgia and the South Sandwich Islands", "dial_code": "+500", "code": "GS" }, { "name": "Spain", "dial_code": "+34", "code": "ES" }, { "name": "Sri Lanka", "dial_code": "+94", "code": "LK" }, { "name": "Sudan", "dial_code": "+249", "code": "SD" }, { "name": "Suriname", "dial_code": "+597", "code": "SR" }, { "name": "Svalbard and Jan Mayen", "dial_code": "+47", "code": "SJ" }, { "name": "Swaziland", "dial_code": "+268", "code": "SZ" }, { "name": "Sweden", "dial_code": "+46", "code": "SE" }, { "name": "Switzerland", "dial_code": "+41", "code": "CH" }, { "name": "Syrian Arab Republic", "dial_code": "+963", "code": "SY" }, { "name": "Taiwan", "dial_code": "+886", "code": "TW" }, { "name": "Tajikistan", "dial_code": "+992", "code": "TJ" }, { "name": "Tanzania, United Republic of Tanzania", "dial_code": "+255", "code": "TZ" }, { "name": "Thailand", "dial_code": "+66", "code": "TH" }, { "name": "Timor-Leste", "dial_code": "+670", "code": "TL" }, { "name": "Togo", "dial_code": "+228", "code": "TG" }, { "name": "Tokelau", "dial_code": "+690", "code": "TK" }, { "name": "Tonga", "dial_code": "+676", "code": "TO" }, { "name": "Trinidad and Tobago", "dial_code": "+1868", "code": "TT" }, { "name": "Tunisia", "dial_code": "+216", "code": "TN" }, { "name": "Turkey", "dial_code": "+90", "code": "TR" }, { "name": "Turkmenistan", "dial_code": "+993", "code": "TM" }, { "name": "Turks and Caicos Islands", "dial_code": "+1649", "code": "TC" }, { "name": "Tuvalu", "dial_code": "+688", "code": "TV" }, { "name": "Uganda", "dial_code": "+256", "code": "UG" }, { "name": "Ukraine", "dial_code": "+380", "code": "UA" }, { "name": "United Arab Emirates", "dial_code": "+971", "code": "AE" }, { "name": "United Kingdom", "dial_code": "+44", "code": "GB" }, { "name": "United States", "dial_code": "+1", "code": "US" }, { "name": "Uruguay", "dial_code": "+598", "code": "UY" }, { "name": "Uzbekistan", "dial_code": "+998", "code": "UZ" }, { "name": "Vanuatu", "dial_code": "+678", "code": "VU" }, { "name": "Venezuela, Bolivarian Republic of Venezuela", "dial_code": "+58", "code": "VE" }, { "name": "Vietnam", "dial_code": "+84", "code": "VN" }, { "name": "Virgin Islands, British", "dial_code": "+1284", "code": "VG" }, { "name": "Virgin Islands, U.S.", "dial_code": "+1340", "code": "VI" }, { "name": "Wallis and Futuna", "dial_code": "+681", "code": "WF" }, { "name": "Yemen", "dial_code": "+967", "code": "YE" }, { "name": "Zambia", "dial_code": "+260", "code": "ZM" }, { "name": "Zimbabwe", "dial_code": "+263", "code": "ZW" } ];
    /*this.countryItems = [
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
    ];*/
  }

  buildReportForm(){
    this.reportForm = this.formBuilder.group({
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
      countryCode: this.formBuilder.control('+971'),
      mobile: this.formBuilder.control(this.mobile,
        Validators.compose([Validators.required, Validators.pattern('^[-+()0-9 ]*$')])
      ),
      country: this.formBuilder.control('United Arab Emirates'),
      lead_source: this.formBuilder.control('Partner Aquisition Campaign'),
      '00N20000001DX1u': this.formBuilder.control('CFOSurveyResults'),
      rating: this.formBuilder.control('Hot'),
      oid: this.formBuilder.control('00D200000006Adm')
    }, {updateOn: 'submit'});

   this.firstNameControl =  this.reportForm.get('firstName');
   this.firstNameControl.valueChanges
      .subscribe(value => {
        value && value.toLowerCase().trim();
        this.data.changeFirstName(value);
      }, {updateOn: 'submit'});

    this.lastNameControl =  this.reportForm.get('lastName');
    this.lastNameControl.valueChanges
        .subscribe(value => {
          value && value.toLowerCase().trim();
          this.data.changeLastName(value);
        }, {updateOn: 'submit'});
    
    this.companyControl =  this.reportForm.get('company');
    this.companyControl.valueChanges
        .subscribe(value => {
          value && value.toLowerCase().trim();
          this.data.changeCompany(value);
        }, {updateOn: 'submit'});
    
    this.designationControl =  this.reportForm.get('designation');
    this.designationControl.valueChanges
        .subscribe(value => {
          value && value.toLowerCase().trim();
          this.data.changeDesignation(value);
        }, {updateOn: 'submit'});
        
    this.emailControl =  this.reportForm.get('email');
    this.emailControl.valueChanges
        .subscribe(value => {
          value && value.toLowerCase().trim();
          this.data.changeEmail(value);
        }, {updateOn: 'submit'});
    
    this.countryControl =  this.reportForm.get('country');
    this.countryControl.valueChanges
        .subscribe(value => {
          value && value.toLowerCase().trim();
          this.data.changeCountry(value);
        }, {updateOn: 'submit'});

    this.countryCodeControl =  this.reportForm.get('countryCode');
    this.countryCodeControl.valueChanges
        .subscribe(value => {
          value && value.toLowerCase().trim();
          this.data.changeCountryCode(value);
        }, {updateOn: 'submit'});    
    
    this.phoneControl =  this.reportForm.get('mobile');
    this.phoneControl.valueChanges
        .subscribe(value => {
          value && value.toLowerCase().trim();
          this.data.changeMobile(value);
        }, {updateOn: 'submit'});    
    
        
  }

  ngOnInit() {
    
    this.data.currentFirstName.subscribe((value) => this.firstName = value );
    this.data.currentLastName.subscribe((value) => this.lastName = value );
    this.data.currentCompany.subscribe((value) => this.company = value );
    this.data.currentDesignation.subscribe((value) => this.designation = value );
    this.data.currentEmail.subscribe((value) => this.email = value );
    this.data.currentCountryCode.subscribe((value) => this.countryCode = value );
    this.data.currentMobile.subscribe((value) => this.mobile = value );
    this.data.currentCountry.subscribe((value) => this.country = value );
    this.data.currentMessage.subscribe((value) => this.message = value );
  }

  ngOnChanges(){
    //this.data.currentFirstName.subscribe(formFirstName => this.firstName = formFirstName );
  }

  isFieldValid(field: string) {
    return !this.reportForm.get(field).valid && this.reportForm.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }

  onSubmitForm(){
    this.reportForm.setValue({
      firstName: this.firstName,
      lastName: this.lastName,
      company: this.company,
      designation: this.designation,
      email: this.email,
      country: this.country,
      countryCode: this.countryCode,
      mobile: this.mobile,
      lead_source: 'Partner Aquisition Campaign',
      '00N20000001DX1u': 'CFOSurveyResults',
      rating: 'Hot',
      oid: '00D200000006Adm'
    });
    this.validateAllFormFields(this.reportForm);

    if (this.reportForm.valid) {
      this.downloadable = true;

      const data = new HttpParams()
        .set("first_name", this.firstName)
        .set("last_name", this.lastName)
        .set("company", this.company)
        .set("00N20000001CtHk", this.designation)
        .set("email", this.email)
        .set("country", this.country)
        .set("countryCode", this.countryCode)
        .set("mobile", this.mobile)
        .set("lead_source", "Partner Aquisition Campaign")
        .set('00N20000001DX1u', "CFOSurveyResults")
        .set("rating", "Hot")
        .set("oid", "00D200000006Adm");

      let url = 'https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8';
      //let url = 'http://localhost:8888/AMEX/sites/cfo-research/src/receive_data.php';
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/x-www-form-urlencoded; charset=UTF-8'
        })
      };
      this.http.post(url, data.toString(), httpOptions)
        .subscribe(
          (val) => {
            this.downloadable = true;
            console.log("POST call successful value returned in body", 
                        val);
          },
          response => {
              console.log("POST call in error", response);
          },
          () => {
              console.log("The POST observable is now completed.");
          }
        );
    } else {
      this.validateAllFormFields(this.reportForm);
    }
  }

  setCountryCode(value){
    for(var i=0; i<this.countryItems.length; i++){
      if(this.countryItems[i].name == value){
        this.countryCodeInput = this.countryItems[i].dial_code;

        let countryCodeControl = this.reportForm.get('countryCode') as FormControl;
        countryCodeControl.setValue(this.countryItems[i].dial_code);

        this.data.currentCountry = this.countryItems[i].name;
        this.data.currentCountryCode = this.countryItems[i].dial_code;
      }
    }
  }

}
