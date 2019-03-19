import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryRegistrationFormComponent } from './story-registration-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule, MatSelectModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';

describe('StoryRegistrationFormComponent', () => {
    let component: StoryRegistrationFormComponent;
    let fixture: ComponentFixture<StoryRegistrationFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StoryRegistrationFormComponent],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                MatDatepickerModule,
                MatInputModule,
                MatSelectModule,
                MatNativeDateModule,
                RouterTestingModule,
                HttpClientTestingModule,
                BrowserAnimationsModule,
                MatCardModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StoryRegistrationFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
