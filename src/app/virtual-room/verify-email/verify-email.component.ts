import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VerifyEmailService } from '../services/verify-email-service.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  email: string = '';
  code: string = '';
  verificationMessage: string = '';
  virtualDataRoomId: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private verifyEmailService: VerifyEmailService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.virtualDataRoomId = params['id'];
      this.email = params['email'];
      this.code = params['code'];
      console.log(`Virtual Data Room ID: ${this.virtualDataRoomId}`);
      console.log(`Email: ${this.email}`);
      console.log(`Code: ${this.code}`);
    });
  }

  verifyEmail() {
    // Assurez-vous que virtualDataRoomId est bien défini ici
    console.log('Virtual Data Room ID:', this.virtualDataRoomId);
  
    if (this.virtualDataRoomId) {
      this.verifyEmailService.verifyEmail(this.email, this.code)
        .subscribe(
          response => {
            this.verificationMessage = response.message || 'Verification successful';
            this.navigateToVirtualDataRoom(this.virtualDataRoomId);
          },
          error => {
            console.error('Error verifying email:', error);
            this.verificationMessage = 'Server error';
          }
        );
    } else {
      console.error('virtualDataRoomId is undefined');
      this.verificationMessage = 'Virtual Data Room ID is undefined';
    }
  }

  navigateToVirtualDataRoom(virtualDataRoomId: string) {
    this.router.navigate(['/virtual-data-room'], { queryParams: { id: virtualDataRoomId, title: 'Your Room Title' } });
  }
}
