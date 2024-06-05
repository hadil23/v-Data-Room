import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


export enum Permission {
  NoAccess = 'No Access',
  View = 'View',
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

  @Output() virtualDataRoomCreated = new EventEmitter<VirtualDataRoomPrivileges>();

  constructor(private formBuilder: FormBuilder, private router: Router) { }

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
      enforceEmailVerification: [false],
      defaultGuestPermission: ['View'],
      access: ['Only people i specify'],
      expiryDate: [null, Validators.required],
      termaccess: ['Off', Validators.required], 
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

  onSubmit(): void {
    console.log(this.dataRoomForm.value);
    this.checkForEmptyvirtualDataRoomTitle();

    if (this.isFormValid) {
      const privileges = this.dataRoomForm.value as VirtualDataRoomPrivileges;
      this.virtualDataRoomCreated.emit(privileges);

      // Navigate to virtual-data-room with privileges (assuming data persistence)
      this.router.navigate(['/virtual-data-room'], { queryParams: privileges });
    }
  }

  GoToVirtualDataRoom(): void {
    this.router.navigate(['/virtual-data-room'], { queryParams: { title: this.dataRoomForm.value.virtualDataRoomTitle } });

  }

  onTimeSet(event: any) {
    const selectedHour = event.hour < 10 ? '0' + event.hour : event.hour;
    const selectedMinute = event.minute < 10 ? '0' + event.minute : event.minute;
    this.selectedTime = `${selectedHour}:${selectedMinute}`;
  }
}


export interface VirtualDataRoomPrivileges {
  virtualDataRoomTitle: string;
  enforceEmailVerification: boolean;
  defaultGuestPermission: Permission;
  access: string;
  expiryDate: Date | null;
  termAccess: string; 
  chosenDateTime: Date;
  selectedTime: string;
}

