import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-new-guest',
  templateUrl: './add-new-guest.component.html',
  styleUrls: ['./add-new-guest.component.scss']
})
export class AddNewGuestComponent implements OnInit {
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  newEmail: string = '';
  newFirstName: string = '';
  newLastName: string = '';
  showNewUser: boolean = false;
  emailRequired: boolean = false;
  newEmailRequired: boolean = false;
  formValid: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.showNewUser = false;
    this.emailRequired = false;
    this.newEmailRequired = false;
  }

  onSubmit(inviteForm: NgForm): void {
    console.log('Invite new users:', inviteForm.value);
  }

  onCancel(): void {
    this.email = '';
    this.firstName = '';
    this.lastName = '';
    this.newEmail = '';
    this.newFirstName = '';
    this.newLastName = '';
    this.showNewUser = false;
    this.emailRequired = false;
    this.newEmailRequired = false;
  }

  onAddUser(): void {
    this.showNewUser = true;
  }

  validateEmail(email: string): void {
    this.emailRequired = !email;
  }

  validateNewEmail(newEmail: string): void {
    this.newEmailRequired = !newEmail;
  }

  getFormValid(): boolean {
    return !!(
      this.email &&
      this.firstName &&
      this.lastName &&
      (!this.showNewUser || (this.newEmail && this.newFirstName && this.newLastName))
    );
  }
}
