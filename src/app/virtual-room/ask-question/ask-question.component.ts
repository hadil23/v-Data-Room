import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RichTextEditorComponent } from 'app/views/forms/rich-text-editor/rich-text-editor.component';
@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.scss']
})
export class AskQuestionComponent implements OnInit {
 questionForm:FormGroup
 constructor(private fb: FormBuilder) { }

 ngOnInit(): void {
   this.createForm();
 }

 createForm() {
   this.questionForm = this.fb.group({
     subject: ['', Validators.required],
     message: [''] // Peut-être que vous voulez ajouter des validateurs ici
   });
 }

 onSubmit() {
   if (this.questionForm.valid) {
     
     console.log('Formulaire soumis avec succès!', this.questionForm.value);
   } else {
   
     console.log('Veuillez remplir tous les champs requis.');
   }
 }
  

}
