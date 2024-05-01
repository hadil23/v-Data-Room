import { Component, OnInit, Input } from '@angular/core';



 interface File {
  lastModified: string | number | Date;
  name: string;
  selected: boolean; // Ajoutez cette ligne pour déclarer la propriété selected
}
@Component({
  selector: 'app-manage-send-files',
  templateUrl: './manage-send-files.component.html',
  styleUrls: ['./manage-send-files.component.scss']
})
export class ManageSendFilesComponent implements OnInit {

  @Input() files: File[] = [];
  sortBy: string = 'newest';

  constructor() { }

  ngOnInit(): void {
    this.sortFiles(this.sortBy);
  }

  sortFiles(sortBy: string) {
    this.sortBy = sortBy;
    switch (sortBy) {
      case 'newest':
        this.files.sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());
        break;
      case 'oldest':
        this.files.sort((a, b) => new Date(a.lastModified).getTime() - new Date(b.lastModified).getTime());
        break;
      case 'views':
        // Add logic for sorting by views if needed
        break;
      default:
        // Handle default case
        break;
    }
  }

  viewFile(index: number) {
    // Implement logic to view the file (e.g., open in a new tab/window)
    console.log('View File:', this.files[index]); // Placeholder for now
  }

  selectAll(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.files.forEach((file) => file.selected = isChecked);
  }

  downloadFile(index: number) {
    // Implement logic to download the file
    console.log('Download File:', this.files[index]); // Placeholder for now
  }

  getFileLink(index: number) {
    // Implement logic to generate and share a secure file link
    console.log('Get File Link:', this.files[index]); // Placeholder for now
  }

  manageAccess(index: number) {
    // Implement logic to manage access permissions for the file
    console.log('Manage Access:', this.files[index]); // Placeholder for now
  }

  deleteFile(index: number) {
    this.files.splice(index, 1); // Remove the file at the given index
  }
}
