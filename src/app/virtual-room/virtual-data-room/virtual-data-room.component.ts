import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { AddNewGuestComponent } from '../add-new-guest/add-new-guest.component';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddSectionDialogComponent } from '../add-section-dialog/add-section-dialog.component';
import { DraftService } from '../services/draft.service';
import { Panel } from '../models/panel';
import { VirtualRoomService } from '../services/virtual-room.service';

@Component({
  selector: 'app-virtual-data-room',
  templateUrl: './virtual-data-room.component.html',
  styleUrls: ['./virtual-data-room.component.scss']
})
export class VirtualDataRoomComponent implements OnInit {
  privileges: any | null = null;
  @Input() virtualDataRoomTitle: string = '';
  @Input() access: string = '';
  @Input() defaultGuestPermission: any;
  @Input() expiryDate: Date;
  panels: Panel[] = [
    { title: 'Legal Documents', files: [] },
    { title: 'Financial Documents', files: [] },
    { title: 'Products', files: [] },
    { title: 'Intellectual Property', files: [] }
  ];
  newPanelTitle: string = '';
  showNavBar: boolean = true;
  @ViewChild('addPanelDialog') addPanelDialog: any;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private draftService: DraftService,
    private activatedRoute: ActivatedRoute,
    private virtualRoomService: VirtualRoomService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      // ...
      this.virtualDataRoomTitle = params['title'];
      const virtualRoomIdString = params['id'];
      console.log('VirtualRoomId:', virtualRoomIdString);
      const virtualRoomId = parseInt(virtualRoomIdString, 10);
      if (!isNaN(virtualRoomId)) {
        this.virtualRoomService.setVirtualRoomId(virtualRoomId);
      } else {
        console.error('Invalid virtualRoomId:', virtualRoomIdString);
      }
    });
  }
  
  
  

  createPanel(): void {
    this.virtualRoomService.getVirtualRoomId().subscribe(vdrId => {
      if (vdrId!== null) {
        const panelTitle = this.newPanelTitle.trim(); // Trim the title to remove any whitespace
        if (panelTitle!== '') { // Check if the title is not empty
          this.virtualRoomService.createPanel(vdrId.toString(), panelTitle).subscribe(
            response => {
              console.log('Panel créé avec succès :', response);
              // Traitez la réponse de l'API si nécessaire
            },
            error => {
              console.error('Erreur lors de la création du panel :', error);
            }
          );
        } else {
          console.error('Le titre du panel est vide');
        }
      }
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
        this.newPanelTitle = result;
      this.panels.push({ title: result, files: [] });
        this.cd.detectChanges();
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
    this.router.navigate(['/permission']);
  }

  goToAddNewGuest(): void {
    this.router.navigate(['/add-new-guest']);
  }
}
