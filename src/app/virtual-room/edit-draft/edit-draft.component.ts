import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VirtualDataRoom } from '../models/virtual-data-room';
import { DraftService } from '../services/draft.service';
import { Panel } from '../models/panel';

@Component({
  selector: 'app-edit-draft',
  templateUrl: './edit-draft.component.html',
  styleUrls: ['./edit-draft.component.scss']
})
export class EditDraftComponent implements OnInit {
  @Input() virtualDataRoomTitle: string = 'E-tafakna';
  @Input() panels: Panel[] = [{id:'1', title: 'Legal Documents', files: [] }, {id:'2', title: 'Financial Documents', files: [] }, { id:'3',title: 'Products', files: [] }, {id:'4', title: 'Intellectual Property', files: [] }];
  virtualDataRooms: VirtualDataRoom[] = [];

  constructor(private draftService: DraftService, private router: Router) {}

  ngOnInit(): void {
    this.virtualDataRooms = this.draftService.getVirtualDataRooms();
    console.log(this.virtualDataRooms); 
  }

  saveChanges(): void {
    const updatedVirtualDataRoom: VirtualDataRoom = {
      title: this.virtualDataRoomTitle,
      panels: this.panels
    };
    this.draftService.updateVirtualDataRoom(updatedVirtualDataRoom);
    console.log('Changes saved:', updatedVirtualDataRoom);
  }

  backToVirtualDataRoom(): void {
    this.router.navigate(['/virtual-data-room']);
  }

deletePanel(panel: Panel): void {
    const virtualDataRoom = this.virtualDataRooms.find(dataRoom => dataRoom.title === this.virtualDataRoomTitle);
    if (virtualDataRoom) {
      this.draftService.deletePanel(virtualDataRoom, panel);
      // Réinitialiser les données après la suppression
      this.virtualDataRooms = this.draftService.getVirtualDataRooms();
    } else {
      console.error(`Virtual data room with title '${this.virtualDataRoomTitle}' not found.`);
    }
}


  deleteFile(panelIndex: number, fileIndex: number): void {
    if (confirm("Are you sure you want to delete this file?")) {
      const panel = this.panels[panelIndex];
      panel.files.splice(fileIndex, 1);
    }
  }
}
