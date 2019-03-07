import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatCardModule, MatDialogModule, MatDividerModule, MatNativeDateModule } from '@angular/material';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { HomePageComponent } from './home-page/home-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { JobRegistrationFormComponent } from './job-registration-form/job-registration-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './alert/alert.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
    declarations: [AppComponent, HomePageComponent, JobRegistrationFormComponent, AlertComponent],
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
        MatTableModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [AlertComponent],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
