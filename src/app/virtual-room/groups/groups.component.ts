import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  hasGroups: boolean = true; 
  groups: any[] = [];
 

  constructor(private router : Router) { }

  ngOnInit(): void {
    this.initializeGroups();
  }
  initializeGroups(): void {
   
    this.groups = [
      { name: 'Tekupers', permission: 'Read' },
     
    ];
  }

  selectAll(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.groups.forEach((group) => group.selected = isChecked);
  }

  editGroup(index: number): void {
   
    console.log('Edit Group:', this.groups[index]); 
  }

  deleteGroup(index: number): void {
    this.groups.splice(index, 1); 
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
  goToAddGroup():void{
    this.router.navigate(['/add-group'])
  }

}
