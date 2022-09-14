import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { DataJsonElement } from './shared/DataJsonElements';
import { DialogContentComponent } from './dialog-content/dialog-content.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Paginated_Grid_Example';
  buttonTitle: string = 'Show Data';
  dataList!: DataJsonElement[];

  constructor(public dialog: MatDialog, private httpClient: HttpClient) {
    this.createStartTimeList();
  }

  ngOnInit(): void {
    // Fect all data from Json File
    this.httpClient
      .get<{ data: DataJsonElement[] }>('assets/source/data.json')
      .subscribe((data) => {
        console.log(data.data);
        this.dataList = data.data;
      });
  }

  // on Show Data button Click
  async openDialog() {
    // define some parameter for MatDialogBox
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.dataList;

    // open MatDialogBox
    const dialogRef = await this.dialog.open(
      DialogContentComponent,
      dialogConfig
    );

    // after MatDialogBox closed
    let DialogReasult: DataJsonElement = {
      name: '',
      description: '',
      webReference: '',
      selector: false,
      id: 0,
    };
    await dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog result: ', result);
      // console.log(`Dialog result: ${result}`);
      DialogReasult = result.data.data;
    });
    return DialogReasult;
  }

  start_time = new FormControl('');
  end_time = new FormControl('');

  start_time_List: timeList[] = [];
  end_time_List: timeList[] = [];

  createStartTimeList() {
    debugger;
    this.start_time_List = [];
    for (let i = 0; i < 48; i++) {
      if (i % 2 == 0) {
        let obj: timeList = {
          value: i,
          viewValue: i < 20 ? `0${i / 2}:00` : `${i / 2}:00`,
          disabled: false,
        };
        this.start_time_List.push(obj);
      } else {
        let obj: timeList = {
          value: i,
          viewValue: i < 20 ? `0${i / 2 - 0.5}:30` : `${i / 2 - 0.5}:30`,
          disabled: false,
        };
        this.start_time_List.push(obj);
      }
    }
  }

  creatEndTimeList(start_Time: number) {
    debugger;
    this.end_time_List = [];
    for (let i = 0; i < 48; i++) {
      if (i % 2 == 0) {
        let obj: timeList = {
          value: i,
          viewValue: i < 20 ? `0${i / 2}:00` : `${i / 2}:00`,
          disabled: !(start_Time < i),
        };
        this.end_time_List.push(obj);
      } else {
        let obj: timeList = {
          value: i,
          viewValue: i < 20 ? `0${i / 2 - 0.5}:30` : `${i / 2 - 0.5}:30`,
          disabled: !(start_Time < i),
        };
        this.end_time_List.push(obj);
      }
    }
  }

  onStartTimeChange(event: any) {
    debugger
    console.log(this.start_time.value);
    let start_time_ViewValue : string = this.start_time.value;
    let start_time_Value! : number;
    this.start_time_List.forEach(element => {
      if(element.viewValue == start_time_ViewValue){
        start_time_Value = element.value
      }      
    });
    this.creatEndTimeList(start_time_Value)
    console.log(start_time_Value);
  }
  onEndTimeChange(event: any) {
    console.log(this.start_time.value);
  }
}
import { FormControl } from '@angular/forms';

interface timeList {
  value: number;
  viewValue: string;
  disabled?: boolean;
}
