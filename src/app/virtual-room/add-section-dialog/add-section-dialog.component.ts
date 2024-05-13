import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-section-dialog',
  templateUrl: './add-section-dialog.component.html',
  styleUrls: ['./add-section-dialog.component.scss']
})
export class AddSectionDialogComponent implements OnInit {

  newPanelTitle: string = ''; // Variable to hold the user input for the new section title

  constructor(
    public dialogRef: MatDialogRef<AddSectionDialogComponent>, // Reference to the dialog
    @Inject(MAT_DIALOG_DATA) public data: any // Injected data if needed
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
