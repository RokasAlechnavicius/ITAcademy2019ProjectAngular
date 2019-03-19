import { Injectable } from '@angular/core';
import { Job } from '../models';
import { HttpClient } from '@angular/common/http';
const HEROKU_URL = 'https://response-test-backend.herokuapp.com';

@Injectable({
    providedIn: 'root'
})
export class JobService {
    constructor(private http: HttpClient) {}

    addJob(job: Job) {
        return this.http.post(HEROKU_URL + '/job', job);
    }

    getJobList() {
        return this.http.get<Job[]>(HEROKU_URL + '/jobs/all');
    }

    getJobAdminList() {
      return this.http.get<Job[]>(HEROKU_URL + '/jobs/admin');
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

    approveJob(id: number) {
        return this.http.post(HEROKU_URL + '/job/admin/approve/' + id, id);
    }

    rejectJob(id: number) {
        return this.http.post('https://response-test-backend.herokuapp.com' + '/job/admin/cancel/' + id, id);
    }
}
