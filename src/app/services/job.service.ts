import {Injectable} from '@angular/core';
import {Job} from '../models';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const herokuUrl = 'https://project-backend.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) {
  }

  createAuthorizationHeaders(headers: HttpHeaders) {
    headers.append('Content-Type', 'application/json');
  }

  addJob(job: Job) {
    const headers = new HttpHeaders();
    this.createAuthorizationHeaders(headers);
    return this.http.post(herokuUrl + '/job', job);
  }

  getJobList() {
    return this.http.get<Job[]>(herokuUrl + '/jobs/all');
  }

}
