import { Component, OnInit, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AnimationEvent } from 'chart.js';

@Component({
  selector: 'app-create-virtual-room',
  templateUrl: './create-virtual-room.component.html',
  styleUrls: ['./create-virtual-room.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CreateVirtualRoomComponent),
      multi: true
    }
  ]
})
export class CreateVirtualRoomComponent implements OnInit {
  dataRoomForm: FormGroup;
  selectedAccessOption: string = 'off';
  expiryDate: Date;
  showDatePicker = false;
  expiryDateToggleControl: FormControl;
  selectedTime: string;

  showTimePicker: boolean = false;
  chosenTime: string;
  router: any;
  
  constructor(private formBuilder: FormBuilder) {
    this.initForm();
  }

  ngOnInit(): void {
  }

  initForm(): void {
    this.dataRoomForm = this.formBuilder.group({
      dataRoomName: ['', Validators.required],
      enforceEmailVerification: [false],
      defaultGuestPermission: ['View'],
      access: ['Only people i specify'],
      expiryDate: [null, Validators.required],
      expiryDateToggleControl: [new Date(), Validators.required], // Corrected name here
      termaccess: ['Off', Validators.required],
      chosenDateTime: [new Date(), Validators.required], // Corrected name here
      selectedTime: [new Date(), Validators.required] // Corrected name here
    });
    this.expiryDateToggleControl = this.dataRoomForm.get('expiryDateToggleControl') as FormControl;
  }

  updateExpiryDate(selectedDate: Date): void {
    this.expiryDate = selectedDate;
    this.dataRoomForm.get('expiryDate').setValue(this.expiryDate); // Corrected control name here
  }

  expiryDateToggleChanged(): void {
    this.showDatePicker = !this.showDatePicker;
  }

  onSubmit(): void {
    if (this.dataRoomForm.valid) {
      const dataRoom = this.dataRoomForm.value;

      if (this.expiryDate) {
        const formattedExpiryDate = this.expiryDate.toISOString();
        console.log(`Expiry date: ${formattedExpiryDate}`);
      } else {
        console.log('Expiry date not set');
      }
    } else {
      console.log("Le formulaire n'est pas valide");
    }
  }
  

  onTimeSet(event: any) {
    const selectedHour = event.hour < 10 ? '0' + event.hour : event.hour;
    const selectedMinute = event.minute < 10 ? '0' + event.minute : event.minute;
    this.selectedTime = `${selectedHour}:${selectedMinute}`;
  }  
}
