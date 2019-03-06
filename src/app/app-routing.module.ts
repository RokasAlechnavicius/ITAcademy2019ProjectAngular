import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { JobRegistrationFormComponent } from './job-registration-form/job-registration-form.component';

const routes: Routes = [
    { path: 'home', component: HomePageComponent },
    { path: 'login', component: HomePageComponent },
    { path: 'create-job', component: JobRegistrationFormComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
