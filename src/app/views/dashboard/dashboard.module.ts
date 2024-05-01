import { SharedMaterialModule } from "app/shared/shared-material.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgChartsModule } from "ng2-charts";
import { NgxEchartsModule } from "ngx-echarts";
import { SharedPipesModule } from "app/shared/pipes/shared-pipes.module";
import { DashboardRoutes } from "./dashboard.routing";
import { AnalyticsComponent } from "./analytics/analytics.component";
import { HomeComponent } from './home/home.component';
import { VirtualRoomModule } from "app/virtual-room/virtual-room.module";
import { SharedModule } from "app/shared/shared.module";
import { SharedComponentsModule } from "app/shared/components/shared-components.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    SharedMaterialModule,
    SharedModule,
    SharedComponentsModule,
    FormsModule,
    VirtualRoomModule,
    FlexLayoutModule,
    NgChartsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    SharedPipesModule,
    RouterModule.forChild(DashboardRoutes)
  ],
  declarations: [AnalyticsComponent, HomeComponent],
  exports: []
})
export class DashboardModule {}
