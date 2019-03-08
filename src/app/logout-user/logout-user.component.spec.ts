import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutUserComponent } from './logout-user.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('LogoutUserComponent', () => {
    let component: LogoutUserComponent;
    let fixture: ComponentFixture<LogoutUserComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LogoutUserComponent],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LogoutUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
