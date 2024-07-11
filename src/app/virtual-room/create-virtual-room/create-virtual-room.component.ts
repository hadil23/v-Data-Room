import { Component, OnInit } from '@angular/core';
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
      defaultGuestPermission: [Permission.Download, Validators.required],
      access: ['specified_people', Validators.required],
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
      const chosenDateTime = this.dataRoomForm.value.chosenDateTime;
      const selectedTime = this.dataRoomForm.value.selectedTime;

      if (!chosenDateTime || !selectedTime) {
        console.error('Error: Expiry date and time are required');
        return;
      }

      const hour = parseInt(selectedTime.split(':')[0], 10);
      const minute = parseInt(selectedTime.split(':')[1], 10);

      const expiryDateTimeString = `${chosenDateTime.toISOString().split('T')[0]}T${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00.000Z`;
      const expiryDateTime = new Date(expiryDateTimeString);

      console.log('expiryDateTimeString:', expiryDateTimeString);
      console.log('expiryDateTime:', expiryDateTime);

      if (!(expiryDateTime instanceof Date) || isNaN(expiryDateTime.getTime())) {
        console.error('Error: Invalid expiry date and time');
        return;
      }

      const virtualRoomData = {
        name: this.dataRoomForm.value.virtualDataRoomTitle,
        defaultGuestPermission: this.dataRoomForm.value.defaultGuestPermission,
        access: this.dataRoomForm.value.access,
        expiryDateTime: expiryDateTime
      };

      console.log('Submitting form data:', virtualRoomData);
      this.virtualRoomService.createVirtualDataRoom(virtualRoomData).subscribe(
        (response: any) => {
          console.log('Virtual Data Room created:', response);
          const virtualRoomId = response.data?.id;

          if (virtualRoomId) {
            const title = virtualRoomData.name;
            const defaultGuestPermission = virtualRoomData.defaultGuestPermission;
            this.router.navigate(['/virtual-data-room'], {
              queryParams: {
                id: virtualRoomId,
                title,
                defaultGuestPermission
              }
            });
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
    this.dataRoomForm.get('selectedTime')?.setValue(`${selectedHour}:${selectedMinute}`);
  }

  toggleTimePicker() {
    this.showTimePicker =!this.showTimePicker;
  }
}