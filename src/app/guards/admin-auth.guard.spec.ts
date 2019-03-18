import { TestBed, async, inject } from '@angular/core/testing';

import { AdminAuthGuard } from './admin-auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AdminAuthGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AdminAuthGuard],
            imports: [RouterTestingModule, HttpClientTestingModule]
        });
    });

    it('should work', inject([AdminAuthGuard], (guard: AdminAuthGuard) => {
        expect(guard).toBeTruthy();
    }));
});
