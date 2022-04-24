import { AfterViewInit, Component, ViewChild, OnInit, Inject } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FormBUilderParams } from '../shared/formBuilderParameters';
import { FormBUilderProperties } from '../shared/formBuilderProperties';
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
    @Inject(MAT_DIALOG_DATA) data: { rowData: DataJsonElement, buttonShow: boolean }
  ) {

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
    this.initiateFormBuilder();
  }

  // dataFormConfig!: {};
  // dataFormparams!: FormBUilderParams;
  // dataFormProperties!: FormBUilderProperties[]
  ngOnInit(): void {
    // this.dataFormProperties = [
    //   {
    //     controllName: "name",
    //     required: true,
    //     minlength: 4,
    //     maxlength: 16,
    //     regx: "^[a-zA-Z]*$"
    //   },
    //   {
    //     controllName: "description",
    //     required: true,
    //     minlength: 10,
    //     maxlength: 64,
    //     regx: "^[a-zA-Z0-9_]*$"
    //   },
    //   {
    //     controllName: "webReference",
    //     required: true,
    //     minlength: 10,
    //     maxlength: 32,
    //     regx: "^[a-zA-Z0-9_]*$"
    //   },
    // ]

    // this.dataFormProperties.forEach(element => {
    //   Object.defineProperty(this.dataFormConfig, "element.controllName", ['', [
    //     (element.required) ? Validators.required : "",
    //     Validators.minLength(element.minlength),
    //     Validators.maxLength(element.maxlength), Validators.pattern(element.regx)
    //   ]]);
    //   Object.defineProperty(this.dataFormparams, "element.controllName", {
    //     required: element.required,
    //     minlength: element.minlength,
    //     maxlength: element.maxlength,
    //     regx: element.regx
    //   });
    // });
    // this.initiateFormBuilder();
  }


  dataFormValue!: any;
  dataForm!: FormGroup;
  hideRequiredControl = new FormControl(true);
  floatLabelControl = new FormControl('auto');
  initiateFormBuilder() {
    this.dataForm = this.fb.group({
      // ...this.dataFormConfig
      name: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(16), Validators.pattern("^[a-zA-Z]*$")
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(64), Validators.pattern("^[a-zA-Z0-9_]*$")
      ]],
      webReference: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(32), Validators.pattern("^[a-zA-Z0-9_]*$")
      ]],
    });
    console.log(this.dataForm);
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
