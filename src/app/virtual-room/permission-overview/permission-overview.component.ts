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
  
  dataRooms: DataRoom[] = []; 
  

  constructor() {}
  

  ngOnInit() {
    
    this.dataRooms = [
      { dataRoomName: 'e-tafakna', permission: 'noAccess', selected: false },
      // Add more dataRooms as needed
    ];
  }

  selectAll(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.dataRooms.forEach(room => room.selected = isChecked);
  }

  saveChanges() {
    console.log('changes was succesfully saved ')
    
  }

  cancelChanges() {
   
  }
}