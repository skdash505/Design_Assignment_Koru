import {
  AfterViewInit,
  Component,
  ViewChild,
  OnInit,
  Inject,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss'],
})
export class DialogContentComponent implements OnInit, AfterViewInit {
  // Basic Table
  displayedColumns: string[] = [
    'groupNo',
    'groupName',
    'description',
    'action',
  ];
  groupListPaginated!: MatTableDataSource<any>;
  groupList!: any[];

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  ngOnInit(): void {
    let DemoData = [
      {
        groupNo: 1,
        groupName: 'shgij',
        description: 'gsdhfvf',
      },
      {
        groupNo: 2,
        groupName: 'sgsdfg',
        description: 'gsdsfshdhhfvf',
      },
    ];
    this.setDataList(DemoData);
  }

  ngAfterViewInit() {
    this.groupListPaginated.sort = this.sort;
    this.groupListPaginated.paginator = this.paginator;
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
    this.groupListPaginated.filter = this.filterValue.trim().toLowerCase();
  }
  clearFilter(event: any) {
    this.filterValue = '';
    this.applyFilter(event);
  }

  // Set Data to DataList from Parent Screen
  setDataList(data: any[]) {
    this.groupList = [...data];
    this.updatePaginationDataList(this.groupList);
  }

  // Set Updated Data to Paginated DataList
  updatePaginationDataList(updatedGroupDataList: any[]) {
    this.groupListPaginated = new MatTableDataSource<any>([
      ...updatedGroupDataList,
    ]);
    this.groupListPaginated.paginator = this.paginator;
    this.groupListPaginated.sort = this.sort;
  }

  // Add new Row
  async addRow(event: any) {}

  // Edit row details
  async editRow(event: any, row: any) {}

  /////// Custom Selector Start /////

  // highlight selectedRow
  clickedRows = new Set<any>();

  /////// Custom Selector End /////
  // Delete only one row
  deleteRow(event: any, row: any) {
    for (let index = 0; index < this.groupList.length; index++) {
      if (row.id == this.groupList[index].id) {
        this.groupList.splice(index, 1);
      }
    }
    this.updatePaginationDataList(this.groupList);
  }
}
