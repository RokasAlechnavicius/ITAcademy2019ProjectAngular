import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { MatDividerModule, MatGridListModule } from '@angular/material';

describe('HomePageComponent', () => {
    let component: HomePageComponent;
    let fixture: ComponentFixture<HomePageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomePageComponent],
            imports: [MatDividerModule, MatGridListModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
