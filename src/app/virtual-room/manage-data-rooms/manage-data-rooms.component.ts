import { Component, Input, OnInit } from '@angular/core';

interface dataRoom {
  selected?: boolean;
}
@Component({
  selector: 'app-manage-data-rooms',
  templateUrl: './manage-data-rooms.component.html',
  styleUrls: ['./manage-data-rooms.component.scss']
})
export class ManageDataRoomsComponent implements OnInit {

  @Input() dataRooms: any[] = []; // Correction du nom de l'entrée

  sortBy: string = 'newest';

  constructor() { }

  ngOnInit(): void {
    // Initialize your data rooms data here
    this.initializeDataRooms();
    // Sort data rooms based on default sort criteria
    this.sortDataRooms(this.sortBy);
  }

  initializeDataRooms() {
    // Placeholder function to initialize data rooms data
    // You should replace this with your actual data initialization logic
    // For demonstration purposes, I'm just populating some dummy data
    this.dataRooms = [
      { name: 'E-tafakna', owner: 'Owner A', views: 100, date: '2024-04-28' },
    
      // Add more data rooms as needed
    ];
  }

  sortDataRooms(sortBy: string) {
    this.sortBy = sortBy;
    switch (sortBy) {
      case 'newest':
        this.dataRooms.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'oldest':
        this.dataRooms.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'views':
        this.dataRooms.sort((a, b) => a.views - b.views);
        break;
      case 'owner':
        this.dataRooms.sort((a, b) => a.owner.localeCompare(b.owner));
        break;
      default:
        break;
    }
  }

  viewDataRoom(index: number) {
    // Implement logic to view the data room
    console.log('View Data Room:', this.dataRooms[index]); // Placeholder for now
  }

 selectAll(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.dataRooms.forEach(room => room.selected = isChecked);
  }
  getDataRoomLink(index: number) {
    // Implement logic to get the data room link
    console.log('Get Data Room Link:', this.dataRooms[index]); // Placeholder for now
  }

  manageAccess(index: number) {
    // Implement logic to manage access permissions for the data room
    console.log('Manage Access:', this.dataRooms[index]); // Placeholder for now
  }

  deleteDataRoom(index: number) {
    this.dataRooms.splice(index, 1); // Remove the data room at the given index
  }

}
