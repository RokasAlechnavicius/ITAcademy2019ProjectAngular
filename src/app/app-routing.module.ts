import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { JobRegistrationFormComponent } from './job-registration-form/job-registration-form.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'create-job', component: JobRegistrationFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
