import { Component, Input, OnInit } from '@angular/core';

export interface User {
  name: string;
  imgSrc: string;
  current: boolean; 
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() user: User;
  constructor() { }

  ngOnInit(): void {
  }

}
