import { Injectable } from '@angular/core';
import { Job } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const HEROKU_URL = 'https://team-test-backend.herokuapp.com';

@Injectable({
    providedIn: 'root'
})
export class JobService {
    constructor(private http: HttpClient) {}
    private options = { headers: new HttpHeaders().set('Content-Type', 'text/html') };

    addJob(job: Job) {
        return this.http.post(HEROKU_URL + '/job', job);
    }

    getJobList() {
        return this.http.get<Job[]>(HEROKU_URL + '/jobs/all');
    }

    getStoryJobList() {
        return this.http.get<Job[]>(HEROKU_URL + '/jobs/notactive');
    }

    joinJob(id: number) {
        return this.http.post(HEROKU_URL + '/job/join', id);
    }

    leaveJob(id: number) {
      return this.http.post(HEROKU_URL + '/job/leave', id);
    }
}
