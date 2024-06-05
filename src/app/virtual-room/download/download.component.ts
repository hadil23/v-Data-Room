import { Component } from '@angular/core';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent {
  selectedFile: File | null = null;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onDownload() {
    if (this.selectedFile) {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(this.selectedFile);
      link.download = this.selectedFile.name;
      link.click();
      URL.revokeObjectURL(link.href);
    } else {
      alert('No file selected!');
    }
  }
}
