import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogContentComponent } from './dialog-content/dialog-content.component';

const routes: Routes = [{
  path: "", component: DialogContentComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
