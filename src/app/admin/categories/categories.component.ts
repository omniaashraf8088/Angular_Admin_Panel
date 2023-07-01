import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Constants } from '@app/constants';
import { ICategory } from '@app/models';
import { NotifyService, DialogService, BaseService } from '@app/services';
import { ConfirmDeleteComponent } from '@app/components';
import { ManageCategoryComponent } from '../manage-category/manage-category.component';


@Component({
  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'actions'];
  dataSource: MatTableDataSource<ICategory> = new MatTableDataSource<ICategory>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;;
  
  constructor(
    private baseService: BaseService,
    private dialogService: DialogService,
    private notifyService: NotifyService
  ) {}

  ngOnInit(): void {
    this.baseService.getAll<ICategory>(Constants.RealtimeDatabase.categories).subscribe(data => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  add(): void {
    this.dialogService.openAddEditDialog(ManageCategoryComponent, 'md', false);
  }

  update(item: ICategory): void {
    this.dialogService.openAddEditDialog(ManageCategoryComponent, 'md', true, item);
  }

  delete(item: ICategory): void {
    this.dialogService.openDeleteDialog(ConfirmDeleteComponent, 'xs', item).afterClosed().subscribe((res: {remove: boolean}) => {
      if (res && res.remove) {
        this.baseService.delete(Constants.RealtimeDatabase.categories, item.id).then(() => {
          this.notifyService.showNotifier('Category Deleted Successfully');
        });
      }
    });
  }
}
