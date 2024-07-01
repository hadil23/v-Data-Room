import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { AddNewGuestComponent } from '../add-new-guest/add-new-guest.component';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddSectionDialogComponent } from '../add-section-dialog/add-section-dialog.component';
import { DraftService } from '../services/draft.service';
import { Panel } from '../models/panel';
import { VirtualRoomService } from '../services/virtual-room.service';
import { CloudinaryService } from '../services/CloudinaryService';
import { HttpClient } from '@angular/common/http';

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
    { id: '1', title: 'Legal Documents', files: [] },
    { id: '2', title: 'Financial Documents', files: [] },
    { id: '3', title: 'Products', files: [] },
    { id: '4', title: 'Intellectual Property', files: [] }
  ];
  newPanelTitle: string = '';
  showNavBar: boolean = true;
  @ViewChild('addPanelDialog') addPanelDialog: any;
  private apiUrl = 'http://localhost:3000/api/files'; // Déclaration de l'URL API

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private draftService: DraftService,
    private activatedRoute: ActivatedRoute,
    private virtualRoomService: VirtualRoomService,
    private cd: ChangeDetectorRef,
    private cloudinaryService: CloudinaryService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
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
      if (vdrId !== null) {
        const panelTitle = this.newPanelTitle.trim();
        if (panelTitle !== '') {
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
        this.panels.push({ id: Date.now().toString(), title: result, files: [] });
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

  addNewSection(): void {
    const dialogRef = this.dialog.open(AddSectionDialogComponent, {
      width: '250px',
      data: { title: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.newPanelTitle = result;
        this.panels.push({ id: Date.now().toString(), title: result, files: [] });
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
  addFileToPanel(panel: any, files: FileList) {
    const preset = 'ml_default'; // Adjust the preset as needed
    const userId = '2'; // Replace with dynamically retrieved user ID
    const panelId = panel.id; // Assuming panel ID is already set correctly

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      this.cloudinaryService.uploadFile(file, preset)
        .then((result) => {
          console.log('File uploaded to Cloudinary:', result);

          const fileUrl = result.secure_url; // Adjust this according to Cloudinary response

          this.virtualRoomService.saveFileUrlToDatabase(fileUrl, userId, panelId)
            .subscribe(
              (response) => {
                console.log('File URL saved to database successfully:', response);
              },
              (error) => {
                console.error('Error saving file URL to database:', error);
              }
            );
        })
        .catch((error) => {
          console.error('Error uploading file to Cloudinary:', error);
        });
    }
  }

  loadPanels(): void {
    // Exemple de chargement des panels depuis une API (adapté à votre logique)
    this.http.get<Panel[]>('/api/panels').subscribe(
      (panels) => {
        this.panels = panels;
      },
      (error) => {
        console.error('Erreur lors du chargement des panels:', error);
      }
    );
  }

  getFilesForPanel(panelId: string): void {
    // Méthode pour récupérer les fichiers d'un panel spécifique
    this.http.get<File[]>(`/api/files?panel_id=${panelId}`).subscribe(
      (files) => {
        console.log(`Fichiers pour le panel avec l'ID ${panelId}:`, files);
        // Faites quelque chose avec les fichiers récupérés
      },
      (error) => {
        console.error(`Erreur lors de la récupération des fichiers pour le panel avec l'ID ${panelId}:`, error);
      }
    );
  }
}
