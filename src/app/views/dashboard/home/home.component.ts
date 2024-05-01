import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importez Router depuis '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 
  constructor(private router: Router) { } // Utilisez Router ici

  ngOnInit(): void {
  }

  goToCreateVirtualRoom(): void {
    this.router.navigate(['/create-virtual-room']);
  }
  goToSendFiles(): void {
    this.router.navigate(['/send-file']); 
  }
}
