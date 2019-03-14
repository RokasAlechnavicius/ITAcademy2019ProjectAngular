import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantsDialogComponent } from './participants-dialog.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('ParticipantsDialogComponent', () => {
    let component: ParticipantsDialogComponent;
    let fixture: ComponentFixture<ParticipantsDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ParticipantsDialogComponent],
            imports: [MatDialogModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ParticipantsDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
