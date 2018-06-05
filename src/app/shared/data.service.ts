import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

  private formFirstName = new BehaviorSubject<string>(null);
  private formLastName = new BehaviorSubject<string>(null);
  private formCompany = new BehaviorSubject<string>(null);
  private formDesignation = new BehaviorSubject<string>(null);
  private formEmail = new BehaviorSubject<string>(null);
  private formMobile = new BehaviorSubject<string>(null);
  private formCountry = new BehaviorSubject<string>('Bahrain');
  private formMessage = new BehaviorSubject<string>(null);

  currentFirstName = this.formFirstName.asObservable();
  currentLastName = this.formLastName.asObservable();
  currentCompany = this.formCompany.asObservable();
  currentDesignation = this.formDesignation.asObservable();
  currentEmail = this.formEmail.asObservable();
  currentMobile = this.formMobile.asObservable();
  currentCountry = this.formCountry.asObservable();
  currentMessage = this.formMessage.asObservable();

  constructor() { }

  changeFirstName(val: string) {
    this.formFirstName.next(val);
  }

  changeLastName(val: string) {
    this.formLastName.next(val);
  }

  changeCompany(val: string) {
    this.formCompany.next(val);
  }

  changeDesignation(val: string) {
    this.formDesignation.next(val);
  }

  changeEmail(val: string) {
    this.formEmail.next(val);
  }

  changeMobile(val: string) {
    this.formMobile.next(val);
  }

  changeCountry(val: string) {
    this.formCountry.next(val);
  }

  changeMessage(val: string) {
    this.formMessage.next(val);
  }

}
