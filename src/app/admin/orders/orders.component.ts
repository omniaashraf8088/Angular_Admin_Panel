import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Constants } from '@app/constants';
import { IOrder } from '@app/models';
import { NotifyService, DialogService, BaseService } from '@app/services';
import { ConfirmDeleteComponent } from '@app/components';

@Component({
  templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['userName', 'date', 'status', 'actions'];
  dataSource: MatTableDataSource<IOrder> = new MatTableDataSource<IOrder>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;
  
  constructor(
    private baseService: BaseService,
    private dialogService: DialogService,
    private notifyService: NotifyService
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  delete(item: IOrder): void {
    this.dialogService.openDeleteDialog(ConfirmDeleteComponent, 'xs', item).afterClosed().subscribe((res: {remove: boolean}) => {
      if (res && res.remove) {
        this.baseService.delete(Constants.RealtimeDatabase.trains, item.id).then(() => {
          this.notifyService.showNotifier('Order Deleted Successfully');
        });
      }
    });
  }

  private getOrders(): void {
    this.baseService.getAll<IOrder>(Constants.RealtimeDatabase.orders).subscribe(data => {
      this.dataSource.data = data;
    });
  }
}
