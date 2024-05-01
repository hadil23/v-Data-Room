import { Component, OnInit } from '@angular/core';

// Interface or class for dataRoom object (assuming properties)
interface DataRoom {
  dataRoomName: string;
  permission: string;
  selected?: boolean; // Optional property for selection state
}

@Component({
  selector: 'app-permission-overview',
  templateUrl: './permission-overview.component.html',
  styleUrls: ['./permission-overview.component.scss']
})
export class PermissionOverviewComponent implements OnInit {
  dataRoomName: string = 'E-tafakna';
  guests: any[] = []; // Replace with actual guest data
  dataRooms: DataRoom[] = []; // Replace with actual dataRoom data
  

  constructor() {}
  

  ngOnInit() {
    this.guests = [
    
      { name: 'hadil', avatar: '../../assets/images/avatars/002-woman.svg' },
      { name: 'Ahmed', avatar: '../../assets/images/avatars/005-man-2.svg' } 
     
   ];
    this.dataRooms = [
      { dataRoomName: 'Room 1', permission: 'noAccess', selected: false },
      // Add more dataRooms as needed
    ];
  }

  selectAll(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.dataRooms.forEach(room => room.selected = isChecked);
  }

  saveChanges() {
    
  }

  cancelChanges() {
   
  }
}