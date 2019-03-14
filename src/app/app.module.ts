import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule
} from '@angular/material';
import { HomePageComponent } from './components/home-page/home-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { JobRegistrationFormComponent } from './components/job-registration-form/job-registration-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './components/alert/alert.component';
import { LoginComponent } from './components/login/login.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { JobListComponent } from './components/job-list/job-list.component';
import { MatTableModule } from '@angular/material/table';
import { UserRegistrationFormComponent } from './components/user-registration-form/user-registration-form.component';
import { LogoutUserComponent } from './components/logout-user/logout-user.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { ParticipantsDialogComponent } from './components/participants-dialog/participants-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        JobRegistrationFormComponent,
        AlertComponent,
        LoginComponent,
        JobListComponent,
        UserRegistrationFormComponent,
        LogoutUserComponent,
        ParticipantsDialogComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatMenuModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatDividerModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,
        MatSelectModule,
        MatNativeDateModule,
        HttpClientModule,
        MatDialogModule,
        MatCardModule,
        MatTableModule,
        MatGridListModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatDialogModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [AlertComponent, HomePageComponent, ParticipantsDialogComponent],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
    bootstrap: [AppComponent]
})
export class AppModule {}
