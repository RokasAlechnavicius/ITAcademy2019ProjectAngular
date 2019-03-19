import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { JobRegistrationFormComponent } from './components/job-registration-form/job-registration-form.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { JobListComponent } from './components/job-list/job-list.component';
import { UserRegistrationFormComponent } from './components/user-registration-form/user-registration-form.component';
import { LogoutUserComponent } from './components/logout-user/logout-user.component';
import { StoryRegistrationFormComponent } from './components/story-registration-form/story-registration-form.component';
import { StoryListComponent } from './components/stories-list/story-list.component';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import {AdminJobListComponent} from './components/admin-job-list/admin-job-list.component';

const routes: Routes = [
    { path: 'home', component: HomePageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: UserRegistrationFormComponent },
    { path: 'logout', component: LogoutUserComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'create-job', component: JobRegistrationFormComponent, canActivate: [AuthGuard] },
    { path: 'jobs', component: JobListComponent },
    { path: 'create-story', component: StoryRegistrationFormComponent, canActivate: [AuthGuard] },
    { path: 'stories', component: StoryListComponent },
    { path: 'admin/jobs', component: AdminJobListComponent, canActivate: [AdminAuthGuard]},
    { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
