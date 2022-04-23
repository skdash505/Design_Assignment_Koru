import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { DataJsonElement } from './DataJsonElements';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Design_Assignment_Koru';
  buttonTitle: string = 'Show Data';
  dataList!: DataJsonElement[];

  constructor(
    public dialog: MatDialog,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    // Fect all data from Json File
    this.httpClient.get<{ data: DataJsonElement[] }>("assets/data.json").subscribe(data => {
      console.log(data.data);
      this.dataList = data.data;
    })
  }

  // on Show Data button Click
  async openDialog() {
    // define some parameter for MatDialogBox
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.dataList;
    
    // open MatDialogBox
    const dialogRef = await this.dialog.open(DialogContentComponent, dialogConfig);
    
    // after MatDialogBox closed
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
