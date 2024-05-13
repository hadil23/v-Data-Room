import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VirtualDataRoom } from '../models/virtual-data-room';
import { DraftService } from '../services/draft.service';
import { Observable } from 'rxjs';
import { Panel } from '../models/panel';


@Component({
  selector: 'app-edit-draft',
  templateUrl: './edit-draft.component.html',
  styleUrls: ['./edit-draft.component.scss']
})
export class EditDraftComponent implements OnInit {
  @Input() virtualDataRoomTitle: string = 'E-tafakna';
  @Input() panels: Panel[] = [{ title: 'Legal Documents', files: [] }, { title: 'Financial Documents', files: [] }, { title: 'Products', files: [] }, { title: 'Intellectual Property', files: [] }];
virtualDataRooms: VirtualDataRoom[] = [];
  constructor(private draftService: DraftService, private router: Router) {}
 
  ngOnInit(): void {
    this.virtualDataRooms = this.draftService.getVirtualDataRooms();
    console.log(this.virtualDataRooms); 
  }

  saveChanges(): void {
    this.draftService.updateVirtualDataRoom({
      title: this.virtualDataRoomTitle,
      panels: this.panels
    });
  

    console.log('Changes saved:', this.virtualDataRoomTitle, this.panels);
  }

  backToVirtualDataRoom(): void {
    this.router.navigate(['/virtual-data-room']);
  }
  
  deletePanel(panel: Panel): void {
    this.draftService.deletePanel(this.virtualDataRooms.find(dataRoom => dataRoom.title === this.virtualDataRoomTitle), panel);
  }
  deleteFile(panelIndex: number, fileIndex: number): void {
    if (confirm("Are you sure you want to delete this file?")) {
      const panel = this.panels[panelIndex];
      panel.files.splice(fileIndex, 1);
    }
  }
}
  

