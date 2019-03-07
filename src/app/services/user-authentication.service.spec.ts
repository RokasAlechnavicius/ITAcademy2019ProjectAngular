import { TestBed } from '@angular/core/testing';
import { UserAuthenticationService } from './user-authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserAuthenticationService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        })
    );

    it('should be created', () => {
        const service: UserAuthenticationService = TestBed.get(UserAuthenticationService);
        expect(service).toBeTruthy();
    });
});
