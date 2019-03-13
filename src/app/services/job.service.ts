import { Injectable } from '@angular/core';
import { Job } from '../models';
import { HttpClient } from '@angular/common/http';
const HEROKU_URL = 'https://project-backend.herokuapp.com';

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

    joinJob(id: number) {
        return this.http.post(HEROKU_URL + '/job/join', id);
    }
}
