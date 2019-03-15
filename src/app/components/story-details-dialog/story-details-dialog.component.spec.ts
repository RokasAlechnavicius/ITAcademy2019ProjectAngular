import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryDetailsDialogComponent } from './story-details-dialog.component';

describe('StoryDetailsDialogComponent', () => {
    let component: StoryDetailsDialogComponent;
    let fixture: ComponentFixture<StoryDetailsDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StoryDetailsDialogComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StoryDetailsDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
});
