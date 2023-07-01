import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Constants } from '@app/constants';
import { IStation } from '@app/models';
import { ConfirmDeleteComponent } from '@app/components';
import { NotifyService, DialogService, BaseService } from '@app/services';
import { ManageStationComponent } from './../manage-station/manage-station.component';

@Component({
  templateUrl: './stations.component.html'
})
export class StationsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'actions'];
  dataSource: MatTableDataSource<IStation> = new MatTableDataSource<IStation>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;
  
  constructor(
    private baseService: BaseService,
    private dialogService: DialogService,
    private notifyService: NotifyService,
  ) {}

  ngOnInit(): void {
    this.baseService.getAll<IStation>(Constants.RealtimeDatabase.stations).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  add(): void {
    this.dialogService.openAddEditDialog(ManageStationComponent, 'md', false);
  }

  update(item: IStation): void {
    this.dialogService.openAddEditDialog(ManageStationComponent, 'md', true, item);
  }

  delete(item: IStation): void {
    this.dialogService.openDeleteDialog(ConfirmDeleteComponent, 'xs', item).afterClosed().subscribe((res: {remove: boolean}) => {
      if (res && res.remove) {
        this.baseService.delete(Constants.RealtimeDatabase.stations, item.id).then(() => {
          this.notifyService.showNotifier('Station Deleted Successfully');
        });
      }
    });
  }

}
