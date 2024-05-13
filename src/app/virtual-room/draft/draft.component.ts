import { Component, OnInit } from '@angular/core';
import { DraftService } from '../services/draft.service';
import { VirtualDataRoom } from '../models/virtual-data-room';
import { Router } from '@angular/router';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.scss']
})
export class DraftComponent implements OnInit {
  virtualDataRooms: VirtualDataRoom[] = [];

  constructor(private draftService: DraftService , private router : Router) { }

  ngOnInit(): void {
    this.virtualDataRooms = this.draftService.getVirtualDataRooms();
    console.log(this.virtualDataRooms); 
  }
  BackToVirtualDataRoom():void{
    this.router.navigate(['/virtual-data-room'])
  }
 gotTopermission():void{

 }
 goToEditDraft():void{

 }
  
}
