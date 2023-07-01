import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Constants } from '@app/constants';
import { ICategory, IStation, ITrain } from '@app/models';
import { BaseService, NotifyService } from '@app/services';
import { mustDifferent } from '@app/validators';

@Component({
  templateUrl: './manage-train.component.html',
  styleUrls: ['./manage-train.component.scss']
})
export class ManageTrainComponent implements OnInit {

  form: FormGroup;
  categories: Array<ICategory> = [];
  stations: Array<IStation> = [];
  minDate: Date = new Date();

  constructor(
    public dialogRef: MatDialogRef<ManageTrainComponent>,
    private fb: FormBuilder,
    private baseService: BaseService,
    private notifyService: NotifyService,
    @Inject(MAT_DIALOG_DATA) public data: ITrain
    ) {
      this.form = this.fb.group({
        name: ['', Validators.required],
        from: ['', Validators.required],
        to: ['', Validators.required],
        price: ['', [Validators.required, Validators.min(1)]],
        date: ['', Validators.required],
        time: ['', Validators.required],
        category: ['', Validators.required],
        availableSeats: ['', [Validators.required, Validators.min(1)]],
        standStations: ['', [Validators.required, Validators.min(1)]],
      },
      { validator: mustDifferent('from', 'to') }
      );
      this.minDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    }

  ngOnInit(): void {
    this.getCategories();
    this.getStations();
    this.patchForm();
  }

  save(categoryForm: FormGroupDirective): void {
    if (this.form.valid) {
      if (this.data) {
        this.update();
      } else {
        this.add();
      }
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  private patchForm(): void {
    if (this.data) {
      this.form.patchValue({
        id: this.data.id,
        name: this.data.name,
        from: this.data.from,
        to: this.data.to,
        category: this.data.category,
        availableSeats: this.data.availableSeats,
        price: this.data.price,
        standStations: this.data.standStations,
        time: this.data.time,
        date: this.data.date
      });
    }
  }

  private add(): void {
    this.baseService.create<ITrain>(Constants.RealtimeDatabase.trains, this.form.value).then(() => {
      this.close();
      this.notifyService.showNotifier('Train Added Successfully');
    });
  }

  private update(): void {
    this.baseService.update<ITrain>(Constants.RealtimeDatabase.trains, this.data.id, this.form.value).then(() => {
      this.close();
      this.notifyService.showNotifier('Train Updated Successfully');
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
