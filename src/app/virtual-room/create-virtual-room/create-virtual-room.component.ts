import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { VirtualRoomService } from '../services/virtual-room.service';

export enum Permission {
  NoAccess = 'No Access',
  OnlyView = 'Only View',
  Download = 'Download',
  Edit = 'Edit'
}

@Component({
  selector: 'app-create-virtual-room',
  templateUrl: './create-virtual-room.component.html',
  styleUrls: ['./create-virtual-room.component.scss']
})
export class CreateVirtualRoomComponent implements OnInit {
  showNavBar = true;
  dataRoomForm: FormGroup;
  selectedAccessOption: string = 'off';
  expiryDate: Date | null = null;
  showDatePicker = false;
  expiryDateToggleControl: FormControl;
  selectedTime: string = '';
  showTimePicker = false;
  chosenTime: string = '';
  isFormValid = true;

  permissionOptions = Object.values(Permission);

  constructor(private formBuilder: FormBuilder, private router: Router, private virtualRoomService: VirtualRoomService) { }

  ngOnInit(): void {
    this.initForm();
  }

  toggleNavBarVisibility() {
    this.showNavBar = !this.showNavBar;
  }

  goToComment(): void {
    this.router.navigate(['/comment']);
  }

  initForm(): void {
    this.dataRoomForm = this.formBuilder.group({
      virtualDataRoomTitle: ['', Validators.required],
      defaultGuestPermission: [Permission.NoAccess, Validators.required],
      access: ['Only people I specify', Validators.required],
      expiryDate: [null, Validators.required],
      chosenDateTime: [new Date(), Validators.required],
      selectedTime: ['', Validators.required]
    });
    this.expiryDateToggleControl = this.dataRoomForm.get('expiryDate') as FormControl;
  }

  updateExpiryDate(selectedDate: Date): void {
    this.expiryDate = selectedDate;
    this.dataRoomForm.get('expiryDate')?.setValue(this.expiryDate);
  }

  expiryDateToggleChanged(): void {
    this.showDatePicker = !this.showDatePicker;
  }

  checkForEmptyvirtualDataRoomTitle(): void {
    const virtualDataRoomTitleControl = this.dataRoomForm.get('virtualDataRoomTitle');
    if (virtualDataRoomTitleControl) {
      this.isFormValid = virtualDataRoomTitleControl.valid;
    }
  }

  goToVirtualDataRoom(): void {
    this.checkForEmptyvirtualDataRoomTitle();
    if (this.isFormValid) {
      const virtualRoomData = {
        name: this.dataRoomForm.value.virtualDataRoomTitle,
        defaultGuestPermission: this.dataRoomForm.value.defaultGuestPermission,
        access: this.dataRoomForm.value.access,
        expiry: this.dataRoomForm.value.expiryDate
      };
  
      console.log('Submitting form data:', virtualRoomData);
      this.virtualRoomService.createVirtualDataRoom(virtualRoomData).subscribe(
        (response: any) => {
          console.log('Virtual Data Room created:', response);
          const virtualRoomId = response?.data[0]?.id; // Use optional chaining
  
          if (virtualRoomId) {
            const title = virtualRoomData.name;
            this.router.navigate(['/virtual-data-room'], { queryParams: { id: virtualRoomId ,title}, });
          } else {
            console.error('Error: Could not retrieve virtual data room ID');
          }
        },
        error => {
          console.error('Error creating virtual data room:', error);
        }
      );
    }
  }

  onTimeSet(event: any) {
    const selectedHour = event.hour < 10 ? '0' + event.hour : event.hour;
    const selectedMinute = event.minute < 10 ? '0' + event.minute : event.minute;
    this.selectedTime = `${selectedHour}:${selectedMinute}`;
  }
}
