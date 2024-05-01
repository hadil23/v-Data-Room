import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-send-files',
  templateUrl: './send-files.component.html',
  styleUrls: ['./send-files.component.scss']
})
export class SendFilesComponent implements OnInit {
  FileForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.FileForm = this.formBuilder.group({
      permission: ['no access', Validators.required],
      access: ['1', Validators.required],
      expiry: ['off', Validators.required],
      startsToggleControl: [''],
      startsDateTime: [''],
      endsToggleControl: [''],
      endsDateTime: [''],
      recipient: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.FileForm.valid) {
      // Envoyer les données du formulaire
      console.log(this.FileForm.value);
    } else {
      // Gérer les cas où le formulaire est invalide
      console.log("Le formulaire n'est pas valide");
    }
    
  }
  
}
