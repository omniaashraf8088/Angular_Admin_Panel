import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { TrainsComponent } from './trains/trains.component';
import { ManageTrainComponent } from './manage-train/manage-train.component';
import { CategoriesComponent } from './categories/categories.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { StationsComponent } from './stations/stations.component';
import { LoadingModule } from '../shared/loading/loading.module';
import { ManageStationComponent } from './manage-station/manage-station.component';
import { OrdersComponent } from './orders/orders.component';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportsComponent } from './reports/reports.component';


@NgModule({
  declarations: [
    AdminComponent,
    TrainsComponent,
    ManageTrainComponent,
    CategoriesComponent,
    ManageCategoryComponent,
    StationsComponent,
    ManageStationComponent,
    OrdersComponent,
    UsersComponent,
    DashboardComponent,
    ReportsComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
    LoadingModule
  ]
})
export class AdminModule { }
