import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { DraftService } from '../services/draft.service';
import { Panel } from '../models/panel';
import { VirtualRoomService } from '../services/virtual-room.service';
import { CloudinaryService } from '../services/CloudinaryService';
import { HttpClient } from '@angular/common/http';
import { AddNewGuestComponent } from '../add-new-guest/add-new-guest.component';
import { AddSectionDialogComponent } from '../add-section-dialog/add-section-dialog.component';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export enum Permission {
  NoAccess = 'No Access',
  OnlyView = 'Only View',
  Download = 'Download',
  Edit = 'Edit'
}

@Component({
  selector: 'app-virtual-data-room',
  templateUrl: './virtual-data-room.component.html',
  styleUrls: ['./virtual-data-room.component.scss']
})
export class VirtualDataRoomComponent implements OnInit {
  @Input() virtualDataRoomTitle: string = '';
  @Input() access: string = '';
  @Input() defaultGuestPermission: Permission = Permission.Download; 
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
  private apiUrl = 'http://localhost:3000/api/files';

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
      const permissionParam = params['defaultGuestPermission'];
      if (permissionParam) {
        this.defaultGuestPermission = permissionParam as Permission; // cast to Permission enum
      } else {
        this.defaultGuestPermission = Permission.NoAccess; // set default value if parameter is not present
      }
  
      console.log('VirtualRoomId:', virtualRoomIdString);
      const virtualRoomId = parseInt(virtualRoomIdString, 10);
      if (!isNaN(virtualRoomId)) {
        this.virtualRoomService.setVirtualRoomId(virtualRoomId);
      } else {
        console.error('Invalid virtualRoomId:', virtualRoomIdString);
      }
    });
  }

  // Panel Methods
  createPanel(): void {
    this.virtualRoomService.getVirtualRoomId().subscribe(vdrId => {
      if (vdrId !== null) {
        const panelTitle = this.newPanelTitle.trim();
        if (panelTitle !== '') {
          this.virtualRoomService.createPanel(vdrId.toString(), panelTitle).subscribe(
            response => {
              console.log('Panel créé avec succès :', response);
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

  loadPanels(): void {
    this.http.get<Panel[]>('/api/panels').subscribe(
      (panels) => {
        this.panels = panels;
      },
      (error) => {
        console.error('Erreur lors du chargement des panels:', error);
      }
    );
  }

  // File Methods
  dropFile(panel: Panel, event: CdkDragDrop<File[]>) {
    const previousIndex = event.previousContainer.data.indexOf(event.item.data);
    const currentIndex = event.container.data.indexOf(event.item.data);

    if (previousIndex > -1 && currentIndex > -1) {
      this.moveItemInArray(panel.files, previousIndex, currentIndex);
    }
  }

  addFileToPanel(panel: any, files: FileList) {
    if (!this.canEdit()) {
      alert('Denied permission...');
      return;
    }

    const preset = 'ml_default';
    const userId = '17';
    const panelId = panel.id;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      this.cloudinaryService.uploadFile(file, preset)
        .then((result) => {
          console.log('File uploaded to Cloudinary:', result);

          const fileUrl = result.secure_url;

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

  getFilesForPanel(panelId: string): void {
    this.http.get<File[]>(`/api/files?panel_id=${panelId}`).subscribe(
      (files) => {
        console.log(`Fichiers pour le panel avec l'ID ${panelId}:`, files);
      },
      (error) => {
        console.error(`Erreur lors de la récupération des fichiers pour le panel avec l'ID ${panelId}:`, error);
      }
    );
  }

  // Permission Methods
  canEdit(): boolean {
    return this.defaultGuestPermission === Permission.Edit;
  }

  onEditClick(): void {
    if (!this.canEdit()) {
      alert('Denied permission...');
    } else {
      this.goToDraft();
    }
  }

  goToDraft(): void {
    // Récupérer l'ID de la salle de données virtuelle
    const virtualRoomId = this.virtualRoomService.getVirtualRoomId();

    // Préparer les panels avec leurs fichiers
    const panelsWithFiles = this.panels.map(panel => ({
      id: panel.id,
      title: panel.title,
      files: panel.files.map(file => ({
        name: file.name,
        url: file.url
      }))
    }));

    // Navigation vers la page d'édition avec les queryParams
    this.router.navigate(['/edit'], {
      queryParams: {
        id: virtualRoomId,
        panels: JSON.stringify(panelsWithFiles) // Convertir les panels en JSON pour le passer en queryParams
      }
    });
  }
  

  canDownloadFiles(): boolean {
    console.log('Checking download permission:', this.defaultGuestPermission);
    return this.defaultGuestPermission === Permission.Download || this.defaultGuestPermission === Permission.Edit;
  }

  // Method to download all files
  downloadAllFiles(): void {
    console.log('Attempting to download files with permission:', this.defaultGuestPermission);

    if (!this.canDownloadFiles()) {
      alert('Denied permission to download files.');
      return;
    }

    const zip = new JSZip();
    const folder = zip.folder('virtual-data-room');

    const filePromises: Promise<any>[] = [];

    this.panels.forEach(panel => {
      panel.files.forEach(file => {
        const filePromise = this.http.get(file.url, { responseType: 'blob' }).toPromise().then(blob => {
          folder.file(file.name, blob);
        });
        filePromises.push(filePromise);
      });
    });

    Promise.all(filePromises).then(() => {
      zip.generateAsync({ type: 'blob' }).then(content => {
        saveAs(content, 'virtual-data-room.zip');
      }).catch(error => {
        console.error('Error generating ZIP file:', error);
      });
    }).catch(error => {
      console.error('Error fetching files:', error);
    });
  }

  // Dialog Methods
  openAddGuestDialog(): void {
    const dialogRef = this.dialog.open(AddNewGuestComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
}

  addNewSection(): void {
    if (!this.canEdit()) {
      alert('Denied permission...');
      return;
    }

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

  // Navigation Methods
  toggleNavBarVisibility() {
    this.showNavBar = !this.showNavBar;
  }

  goToAddNewGuest(access: string): void {
    this.router.navigate(['/add-new-guest'], { queryParams: { 
      access: access, 
      permissionParam: this.defaultGuestPermission 
    } });
  }
  

  saveChanges(): void {
    if (!this.canEdit()) {
      alert('Denied permission...');
      return;
    }

    console.log('Changes saved successfully');
  }

  // Utility Methods
  private moveItemInArray(array: any[], fromIndex: number, toIndex: number) {
    if (fromIndex < 0 || fromIndex >= array.length || toIndex < 0 || toIndex >= array.length) {
      return;
    }

    const item = array[fromIndex];
    array.splice(fromIndex, 1);
    array.splice(toIndex, 0, item);
  }
}
