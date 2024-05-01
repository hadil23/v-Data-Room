import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AskQuestionComponent } from './ask-question/ask-question.component';
import { CreateVirtualRoomComponent } from './create-virtual-room/create-virtual-room.component';
import { AddNewGuestComponent } from './add-new-guest/add-new-guest.component';
import { SendFilesComponent } from './send-files/send-files.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { PermissionOverviewComponent } from './permission-overview/permission-overview.component';
import { ManageSendFilesComponent } from './manage-send-files/manage-send-files.component';
import { ManageDataRoomsComponent } from './manage-data-rooms/manage-data-rooms.component';
const routes: Routes = [
  { path: 'ask-question', component: AskQuestionComponent },
  {path:'create-virtual-room',component:CreateVirtualRoomComponent},
  {path:'add-new-guest',component:AddNewGuestComponent},
  {path:'send-file',   component:SendFilesComponent},
  {path:'create-group',component:CreateGroupComponent},
  {path:'permission',component:PermissionOverviewComponent},
  {path:'manage-send-files',component:ManageSendFilesComponent},
  {path:'manage-data-rooms',component:ManageDataRoomsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VirtualRoomRoutingModule { }
