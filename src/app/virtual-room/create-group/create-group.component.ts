import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {
  GroupForm: FormGroup;
  guests: string[] = []; // Liste des invités
  showDatePicker = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.GroupForm = this.formBuilder.group({
      groupName: ['', Validators.required],
      selectedGuest: [''],
      permission: ['no access', Validators.required],
      accessExpiry: ['1', Validators.required],
      startsToggleControl: [''],
      endsToggleControl: ['']
    });
  }

  addGuest(): void {
    // Code pour ajouter un invité à la liste
    // Exemple:
    // this.guests.push('Nouvel invité');
  }

  hasGuests(): boolean {
    return this.guests.length > 0;
  }

  onSubmit(): void {
    if (this.GroupForm.valid) {
      const formData = this.GroupForm.value;
      // Traitement des données du formulaire
      console.log(formData);
    } else {
      console.log("Le formulaire n'est pas valide");
    }
  }

  expiryDateToggleChanged(): void {
    this.showDatePicker = !this.showDatePicker;
  }
}
