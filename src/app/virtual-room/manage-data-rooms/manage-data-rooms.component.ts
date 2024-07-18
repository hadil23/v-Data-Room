import { Component, OnInit } from '@angular/core';
import { VirtualRoomService } from '../services/virtual-room.service';
import { Router } from '@angular/router';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { Panel } from '../models/panel';
interface DataRoom {
  selected?: boolean;
  name: string;
  date: string;
  status: string;
  id: number;
}

@Component({
  selector: 'app-manage-data-rooms',
  templateUrl: './manage-data-rooms.component.html',
  styleUrls: ['./manage-data-rooms.component.scss']
})
export class ManageDataRoomsComponent implements OnInit {
  dataRooms: DataRoom[] = [];

  sortBy: string = 'newest';
  searchQuery = '';
  panels: any;

  constructor(private virtualRoomService: VirtualRoomService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchDataRooms();
    this.fetchInvitationStatus();
  }

  fetchDataRooms() {
    this.virtualRoomService.getAllVirtualDataRooms().subscribe(
      (dataRooms: any[]) => {
        this.dataRooms = dataRooms.map(room => ({
          name: room.name,
          date: room.createdAt,
          status: room.status,
          id: room.id
        }));
        this.sortDataRooms(this.sortBy);
        
       
        this.panels = dataRooms.map(room => ({
          
          id: room.id,
          files: room.files 
        }));
      },
      (error) => {
        console.error('Error fetching data rooms:', error);
      }
    );
  }
  

  sortDataRooms(sortBy: string) {
    this.sortBy = sortBy;
    switch (sortBy) {
      case 'newest':
        this.dataRooms.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'oldest':
        this.dataRooms.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'status':
        this.dataRooms.sort((a, b) => a.status.localeCompare(b.status));
        break;
      default:
        break;
    }
  }

  selectAll(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.dataRooms.forEach(room => room.selected = isChecked);
  }

  editDataRoom(index: number) {
    const roomId = this.dataRooms[index].id;
    console.log('Edit Data Room:', this.dataRooms[index]);

    
    this.router.navigate(['/edit']);
  }

 
  

  
  viewDataRoom(index: number) {
    if (index < 0 || index >= this.dataRooms.length) {
      console.error('Invalid index:', index);
      return;
    }
  
    console.log('this.dataRooms:', this.dataRooms);
    console.log('index:', index);
  
    const virtualDataRoomId = this.dataRooms[index].id;
    console.log('View Data Room:', this.dataRooms[index]);
  
    this.virtualRoomService.getVirtualDataRoom(virtualDataRoomId).subscribe(
      (virtualDataRoom: any) => {
        console.log('Virtual Data Room Details:', virtualDataRoom);
        this.router.navigate(['/virtual-data-room', virtualDataRoomId], { state: { virtualDataRoom } });
      },
      (error) => {
        console.error('Error fetching virtual data room:', error);
      }
    );
  }
  

  getDataRoomLink(index: number) {
    console.log('Get Data Room Link:', this.dataRooms[index]);
    
  }

  manageAccess(index: number) {
    console.log('Manage Access:', this.dataRooms[index]);
    
  }

  deleteDataRoom(index: number) {
    this.dataRooms.splice(index, 1);

  }

  filterDataRooms() {
    if (this.searchQuery) {
      this.dataRooms = this.dataRooms.filter(room =>
        room.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        room.status.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.fetchDataRooms(); 
    }
  }


  fetchInvitationStatus(): void {
    this.virtualRoomService.checkInvitationTab().subscribe(
      (invitationStatus: any[]) => {
        console.log('Invitation Status:', invitationStatus); // Vérifiez les données reçues
        this.dataRooms.forEach(room => {
          const foundStatus = invitationStatus.find(status => status.virtualDataRoomId === room.id);
          room.status = foundStatus ? foundStatus.status : 'drafted';
          console.log('Updated Room:', room); // Vérifiez les mises à jour de la salle
        });
      },
      (error) => {
        console.error('Error fetching invitation status:', error);
      }
    );
  } 
  
  downloadAllFiles(): void {
    if (!this.panels || !Array.isArray(this.panels)) {
      console.error('No panels data available.');
      return;
    }
  
    const zipFile = new JSZip();
    const folder = zipFile.folder('virtual-data-room');
  
    const filePromises: Promise<any>[] = [];
  
    this.panels.forEach(panel => {
      if (panel.files && Array.isArray(panel.files)) {
        panel.files.forEach(file => {
          const filePromise = this.http.get(file.url, { responseType: 'blob' }).toPromise().then(blob => {
            folder.file(file.name, blob);
          });
          filePromises.push(filePromise);
        });
      }
    });
  
    Promise.all(filePromises).then(() => {
      zipFile.generateAsync({ type: 'blob' }).then(content => {
        saveAs(content, 'virtual-data-room.zip');
      }).catch(error => {
        console.error('Error generating ZIP file:', error);
      });
    }).catch(error => {
      console.error('Error fetching files:', error);
    });
  }
  
  
}