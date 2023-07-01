import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Constants } from '@app/constants';
import { ITrain, ICategory, IStation } from '@app/models';
import { NotifyService, DialogService, BaseService } from '@app/services';
import { ConfirmDeleteComponent } from '@app/components';
import { ManageTrainComponent } from '../manage-train/manage-train.component';

@Component({
  templateUrl: './trains.component.html'
})
export class TrainsComponent implements OnInit, AfterViewInit {

  categories: Array<ICategory> = [];
  stations: Array<IStation> = [];
  displayedColumns: string[] = ['name', 'category', 'date', 'time', 'price', 'from', 'to', 'standStations', 'availableSeats', 'actions'];
  dataSource: MatTableDataSource<ITrain> = new MatTableDataSource<ITrain>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;
  
  constructor(
    private baseService: BaseService,
    private dialogService: DialogService,
    private notifyService: NotifyService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getStations();
    this.getTrains();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  add(): void {
    this.dialogService.openAddEditDialog(ManageTrainComponent, 'lg', false);
  }

  update(item: ITrain): void {
    this.dialogService.openAddEditDialog(ManageTrainComponent, 'lg', true, item);
  }

  delete(item: ITrain): void {
    this.dialogService.openDeleteDialog(ConfirmDeleteComponent, 'xs', item).afterClosed().subscribe((res: {remove: boolean}) => {
      if (res && res.remove) {
        this.baseService.delete(Constants.RealtimeDatabase.trains, item.id).then(() => {
          this.notifyService.showNotifier('Train Deleted Successfully');
        });
      }
    });
  }

  getStationById(id: string): string {
    if (this.stations.length > 0) {
      return this.stations.find(s => s.id === id)!.name;
    }
    return '';
  }

  getCategoryById(id: string): string {
    if (this.categories.length > 0) {
      return this.categories.find(s => s.id === id)!.name;
    }
    return '';
  }

  private getTrains(): void {
    this.baseService.getAll<ITrain>(Constants.RealtimeDatabase.trains).subscribe(data => {
      this.dataSource.data = data;
    });
  }

  private getCategories(): void {
    this.baseService.getAll<ICategory>(Constants.RealtimeDatabase.categories).subscribe(data => {
      this.categories = data;
    });
  }

  private getStations(): void {
    this.baseService.getAll<IStation>(Constants.RealtimeDatabase.stations).subscribe(data => {
      this.stations = data;
    });
  }
}