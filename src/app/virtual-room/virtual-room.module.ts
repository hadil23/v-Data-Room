import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AskQuestionComponent } from './ask-question/ask-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { AppFormsModule } from 'app/views/forms/forms.module';
import { CreateVirtualRoomComponent } from './create-virtual-room/create-virtual-room.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { SharedComponentsModule } from 'app/shared/components/shared-components.module';
import { MatSelectModule } from '@angular/material/select';
import { AddNewGuestComponent } from './add-new-guest/add-new-guest.component';
import { UtilitiesModule } from 'app/views/utilities/utilities.module';
import { CreateGroupComponent } from './create-group/create-group.component';
import { PermissionOverviewComponent } from './permission-overview/permission-overview.component';
import { MatTableModule } from '@angular/material/table';
import { SharedMaterialModule } from "app/shared/shared-material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgChartsModule } from "ng2-charts";
import { NgxEchartsModule } from "ngx-echarts";
import { SharedPipesModule } from "app/shared/pipes/shared-pipes.module";
import { MatMenuModule } from '@angular/material/menu';
import { GuestsComponent } from './guests/guests.component';
import { GroupsComponent } from './groups/groups.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FileUploadModule } from 'ng2-file-upload';
import { SharedModule } from 'app/shared/shared.module';
import { AddSectionDialogComponent } from './add-section-dialog/add-section-dialog.component';
import { VirtualDataRoomComponent } from './virtual-data-room/virtual-data-room.component';
import { ManageDataRoomsComponent } from './manage-data-rooms/manage-data-rooms.component';
import { SearchModule } from 'app/shared/search/search.module';
import { DraftComponent } from './draft/draft.component';
import { ObserversModule } from '@angular/cdk/observers';
import { EditDraftComponent } from './edit-draft/edit-draft.component';
import { UserComponent } from './user/user.component';

import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  declarations: [
    AskQuestionComponent,
    CommentComponent,
    ManageDataRoomsComponent,
    EditDraftComponent,
    CreateVirtualRoomComponent,
    AddNewGuestComponent,
    CreateGroupComponent,
    PermissionOverviewComponent,
    GuestsComponent,
    GroupsComponent,
    VirtualDataRoomComponent,
    AddSectionDialogComponent,
     DraftComponent,
     UserComponent,
     
  

   
   
  ],
  imports: [
    CommonModule,
    NzDrawerModule,
       FormsModule,
    ObserversModule,
    SearchModule,
    SharedPipesModule,
    MatMenuModule,
    FlexLayoutModule,
    SharedMaterialModule,
    MatCardModule,
    MatTableModule,
    UtilitiesModule,
    ReactiveFormsModule,
    SharedComponentsModule ,
    MatSelectModule,
    NgxMaterialTimepickerModule, 
    MatButtonModule,
    AppFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    FormsModule,

   
    FormsModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatChipsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTabsModule,
    MatInputModule,
    MatProgressBarModule,
    FlexLayoutModule,
    NgChartsModule,
    FileUploadModule,
  SharedModule,
  SharedComponentsModule,




    MatFormFieldModule,
    AppFormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
   
   
  ],
  exports:[]
 
  
})
export class VirtualRoomModule { }
