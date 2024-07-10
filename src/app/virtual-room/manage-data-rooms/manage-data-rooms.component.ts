import { Component, OnInit } from '@angular/core';
import { VirtualRoomService } from '../services/virtual-room.service';
import { Router } from '@angular/router';

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

  constructor(private virtualRoomService: VirtualRoomService, private router: Router) { }

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

    // Rediriger vers la page d'édition de la salle de données virtuelle avec l'ID
    this.router.navigate(['/edit']);
  }

  viewDataRoom(index: number) {
    console.log('View Data Room:', this.dataRooms[index]);
    // Implémentez la logique pour afficher une salle de données virtuelle
  }

  getDataRoomLink(index: number) {
    console.log('Get Data Room Link:', this.dataRooms[index]);
    // Implémentez la logique pour obtenir le lien d'une salle de données virtuelle
  }

  manageAccess(index: number) {
    console.log('Manage Access:', this.dataRooms[index]);
    // Implémentez la logique pour gérer les accès à une salle de données virtuelle
  }

  deleteDataRoom(index: number) {
    this.dataRooms.splice(index, 1);
    // Implémentez la logique pour supprimer une salle de données virtuelle
  }

  filterDataRooms() {
    if (this.searchQuery) {
      this.dataRooms = this.dataRooms.filter(room =>
        room.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        room.status.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.fetchDataRooms(); // Recharger les données initiales si la recherche est vide
    }
  }

  fetchInvitationStatus() {
    this.virtualRoomService.checkInvitationTab().subscribe(
      (invitationStatus: any[]) => {
        this.dataRooms.forEach(room => {
          const foundStatus = invitationStatus.find(status => status.id === room.id);
          room.status = foundStatus ? foundStatus.status : 'draft';
        });
      },
      (error) => {
        console.error('Error fetching invitation status:', error);
      }
    );
  }
}
