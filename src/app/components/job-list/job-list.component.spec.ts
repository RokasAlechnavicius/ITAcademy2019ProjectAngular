import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JobListComponent } from './job-list.component';
import { MatTableModule } from '@angular/material/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatButtonModule, MatDialogModule, MatIconModule, MatProgressBarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

describe('JobListComponent', () => {
    let component: JobListComponent;
    let fixture: ComponentFixture<JobListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [JobListComponent],
            imports: [
                MatTableModule,
                HttpClientTestingModule,
                MatButtonModule,
                MatProgressBarModule,
                MatIconModule,
                MatDialogModule,
                RouterTestingModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JobListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
