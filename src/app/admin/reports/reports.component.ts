import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Constants } from '@app/constants';
import { ITrain, ICategory, IStation } from '@app/models';
import { BaseService } from '@app/services';

@Component({
  templateUrl: './reports.component.html'
})
export class ReportsComponent implements OnInit, AfterViewInit {
  categories: Array<ICategory> = [];
  stations: Array<IStation> = [];
  date = new Date();
  displayedColumns: string[] = ['name', 'category', 'date', 'time', 'price', 'from', 'to', 'standStations', 'availableSeats'];
  dataSource: MatTableDataSource<ITrain> = new MatTableDataSource<ITrain>([]);
  copyDataSource: Array<ITrain> = [];
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;
  
  constructor(private baseService: BaseService) {}

  ngOnInit(): void {
    this.getCategories();
    this.getStations();
    this.getTrains();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  filter(): void {
    this.dataSource.data = this.copyDataSource.filter(t => 
      new Date(t.date).getFullYear() === this.date.getFullYear() && 
      new Date(t.date).getMonth() === this.date.getMonth() &&
      new Date(t.date).getDay() === this.date.getDay());
  }

  reset(): void {
    this.dataSource.data = this.copyDataSource;
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
      this.dataSource.data = this.copyDataSource = data;
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
