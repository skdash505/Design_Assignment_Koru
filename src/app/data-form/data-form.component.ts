import { AfterViewInit, Component, ViewChild, OnInit, Inject } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataJsonElement } from '../shared/DataJsonElements';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent implements OnInit {

  selectedData: DataJsonElement;
  buttonShow: boolean = true;
  Title!: string;
  constructor(
    public fb: FormBuilder,
    private dialogRef: MatDialogRef<DataFormComponent>,
    @Inject(MAT_DIALOG_DATA) data: {rowData: DataJsonElement, buttonShow: boolean}
  ) {
    this.initiateFormBuilder();

    if (!data.buttonShow) {
      this.selectedData = data.rowData;
      this.buttonShow = data.buttonShow;
      this.Title = "Edit";
    } else {
      this.buttonShow = data.buttonShow;
      this.Title = "Add New";
      this.selectedData = {
        name: "",
        description: "",
        webReference: "",
        selector: false,
        id: 0
      };
    }
  }

  ngOnInit(): void {
  }

  dataFormValue!: any;
  dataForm!: any;
  initiateFormBuilder() {
    this.dataForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      webReference: ['', [Validators.required]],
    });
  }

  onCancel(event: any) {
    // closing itself and sending data to parent component
    console.warn("cancel");
    this.dialogRef.close({ data: 'you cancelled' })
  }

  onSubmit(event: any) {
    if (this.dataForm.dirty && this.dataForm.valid) {
      console.log(this.dataForm);
      this.dataFormValue = this.dataForm.value;
      console.log(this.dataFormValue);

      // closing itself and sending data to parent component
      this.dialogRef.close({
        data: {
          message: "Detail Captured",
          data: {
            ...this.dataFormValue,
            id: this.selectedData.id
          }
        }
      });
    } else {
      console.log(" Pleascheck Details");
    }
  }
}
