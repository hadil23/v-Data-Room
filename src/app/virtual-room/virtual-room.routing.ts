import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AskQuestionComponent } from './ask-question/ask-question.component';
import { CreateVirtualRoomComponent } from './create-virtual-room/create-virtual-room.component';
import { AddNewGuestComponent } from './add-new-guest/add-new-guest.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { PermissionOverviewComponent } from './permission-overview/permission-overview.component';
import { ManageDataRoomsComponent } from './manage-data-rooms/manage-data-rooms.component';
import { GuestsComponent } from './guests/guests.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { GroupsComponent } from './groups/groups.component';
import { VirtualDataRoomComponent } from './virtual-data-room/virtual-data-room.component';
import { DraftComponent } from './draft/draft.component';
import { EditDraftComponent } from './edit-draft/edit-draft.component';
import { CommentComponent } from './comment/comment.component';
import { DownloadComponent } from './download/download.component';

const routes: Routes = [
  { path: 'ask-question', component: AskQuestionComponent },
  {path:'create-virtual-room',component:CreateVirtualRoomComponent},
  { path: 'virtual-data-room/:id', component: VirtualDataRoomComponent },
  {path:'add-new-guest',component:AddNewGuestComponent},

  {path:'create-group',component:CreateGroupComponent},
  {path:'permission',component:PermissionOverviewComponent},
  {path:'manage-data-rooms',component:ManageDataRoomsComponent},
  {path:'guests',component:GuestsComponent},
  {path:'add-group',component:AddGroupComponent},
  {path:'group',component:GroupsComponent},
  {path:'virtual-data-room',component:VirtualDataRoomComponent},
  {path:'draft', component:DraftComponent},
  {path:'edit',component:EditDraftComponent},
  {path:'comment',component:CommentComponent},
  {path:'download',component:DownloadComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VirtualRoomRoutingModule { }
