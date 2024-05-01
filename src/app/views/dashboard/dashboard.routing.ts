import { Routes } from "@angular/router";

import { AnalyticsComponent } from "./analytics/analytics.component";
import { HomeComponent } from "./home/home.component";
export const DashboardRoutes: Routes = [
  {
    path: "dashboard/analytics",component: AnalyticsComponent,
    data: { title: 'Analytics', breadcrumb: 'Analytics'}
   
  },
  { path:'home',component:HomeComponent}
];
