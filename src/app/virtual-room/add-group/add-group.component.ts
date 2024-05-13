import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  goToCreateGroup():void{
    this.router.navigate(['/create-group'])
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

}
