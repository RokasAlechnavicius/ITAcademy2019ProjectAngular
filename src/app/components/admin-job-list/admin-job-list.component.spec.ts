import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJobListComponent } from './admin-job-list.component';
import {
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatTableModule
} from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdminJobListComponent', () => {
    let component: AdminJobListComponent;
    let fixture: ComponentFixture<AdminJobListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AdminJobListComponent],
            imports: [
                MatTableModule,
                HttpClientTestingModule,
                MatButtonModule,
                MatProgressBarModule,
                MatIconModule,
                MatDialogModule,
                RouterTestingModule,
                MatPaginatorModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AdminJobListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
