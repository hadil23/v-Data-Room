import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { InvitationService } from '../services/invitation.service';

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
  userId: number = 17; 
  virtualDataRoomId: number = 79;

  constructor(
    private invitationService: InvitationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.showNewUser = false;
    this.emailRequired = false;
    this.newEmailRequired = false;

    // Récupérer l'ID de la Virtual Data Room depuis les paramètres de l'URL
    this.route.queryParams.subscribe(params => {
      this.virtualDataRoomId = params['id'];
    });
  }

  onSubmit(inviteForm: NgForm): void {
    if (inviteForm.valid) {
      const invitationData = {
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        newEmail: this.newEmail,
        newFirstName: this.newFirstName,
        newLastName: this.newLastName,
        userId: this.userId, 
        virtualDataRoomId: this.virtualDataRoomId
      };

      console.log('Sending invitation data:', invitationData); 

      this.invitationService.createInvitation(invitationData).subscribe(
        response => {
          console.log('Invitation created:', response);
          this.router.navigate(['/verify-email'], { queryParams: { id: this.virtualDataRoomId } }); 
        },
        error => {
          console.error('Error creating invitation:', error);
          alert(`Error: ${error.message}`);
        }
      );
    } else {
      console.error('Form is invalid');
    }
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
