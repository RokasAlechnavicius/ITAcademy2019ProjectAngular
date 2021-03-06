import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatToolbarModule
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { HomePageComponent } from './components/home-page/home-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { JobRegistrationFormComponent } from './components/job-registration-form/job-registration-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AlertComponent } from './components/alert/alert.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTableModule } from '@angular/material/table';
import { UserRegistrationFormComponent } from './components/user-registration-form/user-registration-form.component';
import { LogoutUserComponent } from './components/logout-user/logout-user.component';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
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
                FormsModule,
                ReactiveFormsModule,
                MatFormFieldModule,
                MatDatepickerModule,
                MatSelectModule,
                MatNativeDateModule,
                MatInputModule,
                MatCardModule,
                HttpClientTestingModule,
                MatTableModule,
                MatGridListModule
            ],
            declarations: [
                AppComponent,
                HomePageComponent,
                JobRegistrationFormComponent,
                AlertComponent,
                LoginComponent,
                UserRegistrationFormComponent,
                LogoutUserComponent
            ]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
});
