import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DataJsonElement } from '../DataJsonElements';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss']
})
export class DialogContentComponent implements OnInit {

  displayedColumns: string[] = ['selector', 'name', 'description', 'webReference', 'action'];
  dataList!: DataJsonElement[];  
  clickedRows = new Set<DataJsonElement>();
  selectedRows: DataJsonElement[] = [];
  selectAllRow: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<DialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) data: DataJsonElement[]
  ) {
    this.dataList = data;
    this.dataList.forEach(element => {
      if (!element.selector) {
        element.selector = false;
      }
    });
  }

  ngOnInit(): void {
    console.log(this.dataList);
  }

  // on click on select all checkbox
  onSelectAll(event: any) {
    this.selectAllRow = !this.selectAllRow;
    this.dataList.map(value => value.selector = !value.selector);
    this.selectedRows = this.dataList;
    console.log(this.selectedRows);
    console.log(this.dataList);
  }

  // On click on individual checkbox
  onSelecter(event: any, row: DataJsonElement) {
    console.log(row);
    row.selector = !row.selector;
    this.dataList[row.id - 1].selector = row.selector;
    this.selectedRows.push(row);
    console.log(this.selectedRows);
    console.log(this.dataList);
  }
  
  // Add new Row
  addRow(event: any) {

  }

  // Edit row details
  editRow(event: any, row: DataJsonElement) {

  }

  // Delete Selected Rows
  deleteSelectedRow(event: any) {
    console.log(event);
    this.dataList = [];
  }

  // Delete only one row
  deleteRow(event: any, row: DataJsonElement) {
    console.log(row);
    console.log(event);
    for (let toremove = 0; toremove < this.dataList.length; toremove++) {
      if (row.id == this.dataList[toremove].id) {
        this.dataList.splice(toremove, 1);
      }
    }
    this.dataList = [...this.dataList];
    console.log(this.dataList);
    if (!Boolean(this.dataList.length)) {
      this.dialogRef.close();
    }
  }

}
