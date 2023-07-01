import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


import { Constants } from '@app/constants';
import { IStation } from '@app/models';
import { NotifyService, BaseService } from '@app/services';

@Component({
  templateUrl: './manage-station.component.html'
})
export class ManageStationComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ManageStationComponent>,
    private fb: FormBuilder,
    private baseService: BaseService,
    private notifyService: NotifyService,
    @Inject(MAT_DIALOG_DATA) public data: IStation
    ) {
      this.form = this.fb.group({
        name: ['', Validators.required]
      });
    }

  ngOnInit(): void {
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
        name: this.data.name
      });
    }
  }

  private add(): void {
    this.baseService.create(Constants.RealtimeDatabase.stations, this.form.value).then(() => {
      this.close();
      this.notifyService.showNotifier('Station Added Successfully');
    });
  }

  private update(): void {
    this.baseService.update(Constants.RealtimeDatabase.stations, this.data.id, this.form.value).then(() => {
      this.close();
      this.notifyService.showNotifier('Station Updated Successfully');
    });
  }
}
