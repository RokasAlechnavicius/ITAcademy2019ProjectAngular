import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryListComponent } from './story-list.component';
import {
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatProgressBarModule,
    MatTableModule
} from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('StoryListComponent', () => {
    let component: StoryListComponent;
    let fixture: ComponentFixture<StoryListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StoryListComponent],
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
        fixture = TestBed.createComponent(StoryListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
