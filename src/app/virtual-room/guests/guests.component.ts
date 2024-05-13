import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.scss']
})
export class GuestsComponent implements OnInit {
  hasGroups: boolean = false;
  @Input() guests: any[] = []; 
  @Input() groups: any[] = [];
 
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.hasGroups = this.checkIfGroupsExist();
    
    this.guests.push({
      name: 'John Doe',
      group: ['Group 1', 'Group 2'],
      permission: 'Read',
      dateAdded: '2024-05-01',
      lastVisit: '2024-05-02'
    });
  }

  selectAll(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.guests.forEach((guest) => guest.selected = isChecked);
  }
  goToAddGroup():void{
    this.router.navigate(['/add-group'])
  }
  editGuest(index: number) {
    
    console.log('Edit Guest:', this.guests[index]); 
  }

  getDataRoomLink(index: number) {
   
    console.log('Get DataRoom Link:', this.guests[index]); 
  }

  manageAccess(index: number) {
    
    console.log('Manage Access:', this.guests[index]); 
  }

  deleteGuest(index: number) {
    this.guests.splice(index, 1); 
  }

  goToPermission(): void {
    this.router.navigate(['/permission']);
  }
  goToGuests():void {
    this.router.navigate(['/guests'])
  }
  goToGroup():void{
    this.router.navigate(['/create-group'])
  }
  goToAddGuest():void {
    this.router.navigate(['/add-new-guest'])
  }
  
    
    checkIfGroupsExist(): boolean {
     
      if (this.groups && this.groups.length > 0) {
        return true; 
      } else {
        return false; 
      }

}

}
