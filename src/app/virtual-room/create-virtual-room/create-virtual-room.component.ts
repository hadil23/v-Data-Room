import { Component, OnInit, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-virtual-room',
  templateUrl: './create-virtual-room.component.html',
  styleUrls: ['./create-virtual-room.component.scss'],
  providers: [
    
  ]
})
export class CreateVirtualRoomComponent implements OnInit {
  showNavBar: boolean = true;
  dataRoomForm: FormGroup;
  virtualDataRoomTitle:string;
  selectedAccessOption: string = 'off';
  expiryDate: Date;
  showDatePicker = false;
  expiryDateToggleControl: FormControl;
  selectedTime: string;
  showTimePicker: boolean = false;
  chosenTime: string;
  isFormValid: boolean = true; 
  
  constructor(private formBuilder: FormBuilder , private router: Router) {
   
  }

  ngOnInit(): void {
    this.initForm();
  }
  toggleNavBarVisibility() {
    this.showNavBar = !this.showNavBar;
  }
  goToComment():void{
    this.router.navigate(['/comment'])
  }

  initForm(): void {
    this.dataRoomForm = this.formBuilder.group({
      virtualDataRoomTitle: ['', Validators.required],
      enforceEmailVerification: [false],
      defaultGuestPermission: ['View'],
      access: ['Only people i specify'],
      expiryDate: [null, Validators.required],
      expiryDateToggleControl: [new Date(), Validators.required], 
      termaccess: ['Off', Validators.required],
      chosenDateTime: [new Date(), Validators.required], 
      selectedTime: [new Date(), Validators.required] ,
     
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
  checkForEmptyvirtualDataRoomTitle(): void {
    const virtualDataRoomTitleControl = this.dataRoomForm.get('virtualDataRoomTitle');
  
    if (virtualDataRoomTitleControl) {
      if (virtualDataRoomTitleControl.hasError('required')) {
        this.isFormValid = false;
      } else {
        this.isFormValid = this.dataRoomForm.valid;
      }
    }
  }
  
  onSubmit(): void {
    console.log(this.dataRoomForm.value);
    this.checkForEmptyvirtualDataRoomTitle();
  
    if (this.isFormValid) { 
      this.GoToVirtualDataRoom();
    } /*else {
      console.log("Le formulaire n'est pas valide");
    }*/
  }
  
  GoToVirtualDataRoom(): void {
    this.router.navigate(['/virtual-data-room']);
  }
  
  onTimeSet(event: any) {
    const selectedHour = event.hour < 10 ? '0' + event.hour : event.hour;
    const selectedMinute = event.minute < 10 ? '0' + event.minute : event.minute;
    this.selectedTime = `${selectedHour}:${selectedMinute}`;
  }
 
}
