import { AfterViewInit, Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';

import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { DataFormComponent } from '../data-form/data-form.component';
import { DataJsonElement } from '../shared/DataJsonElements';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss']
})
export class DialogContentComponent implements OnInit, AfterViewInit {

  // Basic Table
  displayedColumns: string[] = ['selector', 'name', 'description', 'webReference', 'action'];
  dataListPaginated!: MatTableDataSource<DataJsonElement>;
  dataList!: DataJsonElement[];


  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<DialogContentComponent>,
    private _liveAnnouncer: LiveAnnouncer,
    @Inject(MAT_DIALOG_DATA) data: DataJsonElement[]
  ) {
    this.setDataList(data);
  }

  ngOnInit(): void {
    this.consoleAllData("ngOnInit");
  }

  ngAfterViewInit() {
    this.dataListPaginated.sort = this.sort;
    this.dataListPaginated.paginator = this.paginator;
    this.consoleAllData("ngAfterViewInit");
  }

  // pagination Related
  pageSizeOption = [5, 10, 25, 100];
  selectedPageSize = this.pageSizeOption[0];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Sorting Related
  @ViewChild(MatSort) sort!: MatSort;

  // Updateing the GidData as per Soring
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  // Filter Functionality
  filterValue!: string;
  applyFilter(event: any) {
    // const filterValue = (event.target as HTMLInputElement).value;
    this.dataListPaginated.filter = this.filterValue.trim().toLowerCase();
    this.consoleAllData("applyFilter")
  }
  clearFilter(event: any) {
    this.filterValue = "";
    this.applyFilter(event);
  }

  // Set Data to DataList from Parent Screen
  setDataList(data: DataJsonElement[]) {
    this.dataList = [...data];
    this.dataList.forEach(element => {
      element.selector = false;
      if (!Boolean(element.id)) {
        element.id = Math.random().toString(36).substring(2) +
          (new Date()).getTime().toString(36);
      }
    });
    this.updatePaginationDataList(this.dataList);
    this.consoleAllData("setDataList");
  }

  // Set Updated Data to Paginated DataList 
  updatePaginationDataList(updatedDataList: DataJsonElement[]) {
    this.dataListPaginated = new MatTableDataSource<DataJsonElement>([...updatedDataList]);
    this.dataListPaginated.paginator = this.paginator;
    this.dataListPaginated.sort = this.sort;
  }

  consoleAllData(From: string) {
    console.log("Start by : ", From);
    console.log("selectAllRow : ", this.selectAllRow);
    console.log("clickedRows : ", this.clickedRows);
    console.log("dataList : ", this.dataList);
    console.log("dataListPaginated : ", this.dataListPaginated);
    console.log("paginator : ", this.paginator);
    console.log("sort : ", this.sort);
    console.log("filterValue : ", this.filterValue);
    console.log("End >>>>");
  }



  // Add new Row
  async addRow(event: any) {
    await this.openFormDialog(true);
    this.consoleAllData("addRow");
  }

  // Edit row details
  async editRow(event: any, row: DataJsonElement) {
    await this.openFormDialog(false, row);
    this.consoleAllData("editRow");
  }

  async openFormDialog(buttonShow: boolean, rowData?: DataJsonElement) {
    // define some parameter for MatDialogBox
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      rowData: rowData,
      buttonShow: buttonShow
    };

    // open MatDialogBox
    const dialogRef = await this.dialog.open(DataFormComponent, dialogConfig);

    // after MatDialogBox closed
    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog result: ", result);

      if (Boolean(result) && Boolean(result!.data!.data)) {
        this.dataList.push(result.data.data);
        this.setDataList(this.dataList);
      }
      this.consoleAllData("addRow");
    });

    // // after MatDialogBox closed
    // let DialogReasult: DataJsonElement = {
    //   name: "",
    //   description: "",
    //   webReference: "",
    //   selector: false,
    //   id: 0
    // };
    // await dialogRef.afterClosed().subscribe(result => {
    //   console.log("Dialog result: ", result);
    //   // console.log(`Dialog result: ${result}`);
    //   DialogReasult = result.data.data;
    // });
    // return DialogReasult;
  }

  /////// Custom Selector Start /////

  // highlight selectedRow
  clickedRows = new Set<DataJsonElement>();
  selectAllRow: boolean = false;

  // on click on select all checkbox
  onSelectAll(event: any) {
    this.selectAllRow = !this.selectAllRow;
    this.dataList.map(value => value.selector = this.selectAllRow);
    this.consoleAllData("onSelectAll");
  }

  // On click on individual checkbox
  onSelecter(event: any, row: DataJsonElement) {
    row.selector = !row.selector;
    this.dataList.forEach(index => {
      if (index.id == row.id) {
        index.selector = row.selector;
      }
    });
    this.selectAllRow = false;
    this.consoleAllData("onSelecter");
  }

  /////// Custom Selector End /////


  // Delete Selected Rows
  deleteSelectedRow(event: any) {

    let indexList = [];
    for (let index = 0; index < this.dataList.length; index++) {
      if (this.dataList[index].selector) {
        indexList.push(index);
      }
    }

    if (Boolean(indexList.length)) {
      if (!this.selectAllRow) {
        indexList.reverse();
        indexList.forEach(index => {
          this.dataList.splice(index, 1);
        });
      } else {
        this.dataList = [];
      }
      this.updatePaginationDataList(this.dataList);
    } else {
      console.warn("no row selected");
    }

    this.consoleAllData("deleteSelectedRow");
    if (!Boolean(this.dataList.length)) {
      this.dialogRef.close();
    }
  }

  /////// Custom Selector End /////
  // Delete only one row
  deleteRow(event: any, row: DataJsonElement) {
    for (let index = 0; index < this.dataList.length; index++) {
      if (row.id == this.dataList[index].id) {
        this.dataList.splice(index, 1);
      }
    }
    this.updatePaginationDataList(this.dataList);

    this.consoleAllData("deleteRow");
    if (!Boolean(this.dataList.length)) {
      this.dialogRef.close();
    }
  }


}
