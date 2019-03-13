import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegistrationFormComponent } from './user-registration-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatGridListModule, MatInputModule, MatSelectModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UserRegistrationFormComponent', () => {
    let component: UserRegistrationFormComponent;
    let fixture: ComponentFixture<UserRegistrationFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserRegistrationFormComponent],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                MatInputModule,
                MatCardModule,
                RouterTestingModule,
                MatSelectModule,
                HttpClientTestingModule,
                BrowserAnimationsModule,
                MatGridListModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserRegistrationFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
