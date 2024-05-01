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
import { SendFilesComponent } from './send-files/send-files.component';
import { UtilitiesModule } from 'app/views/utilities/utilities.module';
import { CreateGroupComponent } from './create-group/create-group.component';
import { PermissionOverviewComponent } from './permission-overview/permission-overview.component';
import { MatTableModule } from '@angular/material/table';
import { SharedMaterialModule } from "app/shared/shared-material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgChartsModule } from "ng2-charts";
import { NgxEchartsModule } from "ngx-echarts";
import { SharedPipesModule } from "app/shared/pipes/shared-pipes.module";
import { ManageSendFilesComponent } from './manage-send-files/manage-send-files.component';
import { MatMenuModule } from '@angular/material/menu';
import { ManageDataRoomsComponent } from './manage-data-rooms/manage-data-rooms.component';
import { GuestsComponent } from './guests/guests.component';

@NgModule({
  declarations: [
    AskQuestionComponent,
    CreateVirtualRoomComponent,
    AddNewGuestComponent,
    SendFilesComponent,
    CreateGroupComponent,
    PermissionOverviewComponent,
    ManageSendFilesComponent,
    ManageDataRoomsComponent,
    GuestsComponent
   
  ],
  imports: [
    CommonModule,
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

    MatFormFieldModule,
    AppFormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
   
   
  ],
  exports:[SendFilesComponent]
 
  
})
export class VirtualRoomModule { }
