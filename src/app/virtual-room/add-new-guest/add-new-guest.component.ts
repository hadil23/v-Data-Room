import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-guest',
  templateUrl: './add-new-guest.component.html',
  styleUrls: ['./add-new-guest.component.scss']
})
export class AddNewGuestComponent implements OnInit {
  GuestForm: FormGroup;
  startsToggleControl: FormControl;
  endsToggleControl: FormControl;
  showDatePicker: boolean = false; // Ajoutez cette propriété

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.GuestForm = this.formBuilder.group({
      invitation: ['', Validators.required],
      permission: ['no access', Validators.required],
      accessExpiry: ['1', Validators.required],
      startsToggleControl: [false],
      endsToggleControl: [false],
      chosenDateTime: [new Date(), Validators.required],
      message: ['', Validators.required]
    });

    this.startsToggleControl = this.GuestForm.get('startsToggleControl') as FormControl;
    this.endsToggleControl = this.GuestForm.get('endsToggleControl') as FormControl;
  }

  onSubmit(): void {
    if (this.GuestForm.valid) {
      // Submit the form data
      console.log(this.GuestForm.value);
    } else {
      console.log("Form is invalid");
    }
  }

  startsToggleChanged(): void {
    // Handle starts toggle change event
  }

  endsToggleChanged(): void {
    // Handle ends toggle change event
  }
}
