import { TestBed } from '@angular/core/testing';
import { JobService } from './job.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('JobService', () => {
  let service: JobService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JobService]
    });

    // inject the service
    service = TestBed.get(JobService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    service = TestBed.get(JobService);
    expect(service).toBeTruthy();
  });

  it('should fetch jobs data successfully', () => {
    service.getJobList().subscribe((data: any) => {
      expect(data[1].idea).toEqual('else');
    });

    const req = httpMock.expectOne(`https://project-backend.herokuapp.com/jobs/all`);
    expect(req.request.method).toBe('GET');

    req.flush([
      {
        idea: 'something'
      },
      {
        idea: 'else'
      }
    ]);
  });

  it('should send body for job creation', () => {
    const job = {
      id: 1,
      date: '2019-03-20',
      idea: 'Ideja 1223',
      organisation: 'Tikrai ne bankas',
      city: 'Ignalinos rajono savivaldybė',
      category: 'Time for the environment',
      email: '',
      contactName: 'Kontaktas viens du trys',
      website: '',
      phone: '123',
      description: 'asdasd',
      hashtags: null
    };

    service.addJob(job).subscribe((data: any) => {
      expect(data.organisation).toBe('Tikrai ne bankas');
    });

    const req = httpMock.expectOne(`https://project-backend.herokuapp.com/job`);
    expect(req.request.method).toBe('POST');

    req.flush(job);
  });
});
