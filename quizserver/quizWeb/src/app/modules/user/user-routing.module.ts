import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaketestComponent } from './taketest/taketest.component';
import { UserTestResultsComponent } from './components/user-test-results/user-test-results.component'; 

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'take-test/:id', component: TaketestComponent },
  { path: 'user/view-test-results', component: UserTestResultsComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
