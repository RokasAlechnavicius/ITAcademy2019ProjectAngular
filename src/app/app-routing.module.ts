import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { JobRegistrationFormComponent } from './job-registration-form/job-registration-form.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { JobListComponent } from './job-list/job-list.component';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { LogoutUserComponent } from './logout-user/logout-user.component';

const routes: Routes = [
    { path: 'home', component: HomePageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: UserRegistrationFormComponent },
    { path: 'logout', component: LogoutUserComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'create-job', component: JobRegistrationFormComponent },
    { path: 'jobs', component: JobListComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
