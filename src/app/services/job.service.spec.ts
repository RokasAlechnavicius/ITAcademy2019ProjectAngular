import { TestBed } from '@angular/core/testing';

import { JobService } from './job.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('JobService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        })
    );

    it('should be created', () => {
        const service: JobService = TestBed.get(JobService);
        expect(service).toBeTruthy();
    });
});
