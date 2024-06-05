import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AddNewGuestComponent } from '../add-new-guest/add-new-guest.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddSectionDialogComponent } from '../add-section-dialog/add-section-dialog.component';
import { AnimationEvent } from 'chart.js';
import { DraftService } from '../services/draft.service';
import { Panel } from '../models/panel';
import { HttpClient } from '@angular/common/http';
import { VirtualDataRoomPrivileges } from '../create-virtual-room/create-virtual-room.component';

@Component({
  selector: 'app-virtual-data-room',
  templateUrl: './virtual-data-room.component.html',
  styleUrls: ['./virtual-data-room.component.scss']
})
export class VirtualDataRoomComponent implements OnInit{
  privileges: VirtualDataRoomPrivileges | null = null;
  @Input() virtualDataRoomTitle: string = '';
  panels: Panel[] = [{ title: 'Legal Documents', files: [] }, { title: 'Financial Documents', files: [] }, { title: 'Products', files: [] }, { title: 'Intellectual Property', files: [] }];
  paneles: { title: string, files: any[] }[] = [];
  newPanelTitle: string = ''
  showNavBar: boolean = true;
  @ViewChild('addPanelDialog') addPanelDialog: any;

  constructor(private router: Router, public dialog: MatDialog, private draftService: DraftService, private http: HttpClient, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.virtualDataRoomTitle = params['title'];
    });
    this.activatedRoute.queryParams.subscribe(params => {
      this.privileges = params as VirtualDataRoomPrivileges; // Assuming privileges are passed as query params
    });
  }
  toggleNavBarVisibility() {
    this.showNavBar = !this.showNavBar;
  }

  openAddGuestDialog(): void {
    const dialogRef = this.dialog.open(AddNewGuestComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openAddPanelDialog() {
    const dialogRef = this.dialog.open(this.addPanelDialog, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.panels.push({ title: result, files: [] });
      }
    });
  }

  dropFile(panel: Panel, event: CdkDragDrop<File[]>) {
    const previousIndex = event.previousContainer.data.indexOf(event.item.data);
    const currentIndex = event.container.data.indexOf(event.item.data);

    if (previousIndex > -1 && currentIndex > -1) {
      this.moveItemInArray(panel.files, previousIndex, currentIndex);
    }
  }

  addFileToPanel(panel: Panel, files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileReader = new FileReader();

      
    }
  }

  addNewSection(): void {
    const dialogRef = this.dialog.open(AddSectionDialogComponent, {
      width: '250px',
      data: { title: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.panels.push({ title: result, files: [] });
      }
    });
  }

  private moveItemInArray(array: any[], fromIndex: number, toIndex: number) {
    if (fromIndex < 0 || fromIndex >= array.length || toIndex < 0 || toIndex >= array.length) {
      return;
    }

    const item = array[fromIndex];
    array.splice(fromIndex, 1);
    array.splice(toIndex, 0, item);
  }

  GoToPermission(): void {
    this.router.navigate(['/permission'])

  }

  goToAddNewGuest(): void {
    this.router.navigate(['/add-new-guest'])
  }

  goToDraft(): void {
    this.draftService.saveVirtualDataRooms({
      title: this.virtualDataRoomTitle,
      panels: this.panels
    });
    this.router.navigate(['/edit']);
  }
}