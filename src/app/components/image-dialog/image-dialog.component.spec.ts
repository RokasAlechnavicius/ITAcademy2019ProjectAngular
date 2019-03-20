import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDialogComponent } from './image-dialog.component';
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

describe('ImageDialogComponent', () => {
    let component: ImageDialogComponent;
    let fixture: ComponentFixture<ImageDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ImageDialogComponent],
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
        fixture = TestBed.createComponent(ImageDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
});
