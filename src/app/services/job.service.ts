import { Injectable } from '@angular/core';
import { Job } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const HEROKU_URL = 'https://project-backend.herokuapp.com';

@Injectable({
    providedIn: 'root'
})
export class JobService {
    constructor(private http: HttpClient) {}
    private options = { headers: new HttpHeaders().set('Content-Type', 'text/html') };

    addJob(job: Job) {
        return this.http.post('https://team-test-backend.herokuapp.com' + '/job', job);
    }

    getJobList() {
        return this.http.get<Job[]>('https://team-test-backend.herokuapp.com' + '/jobs/all');
    }

    getStoryJobList() {
        return this.http.get<Job[]>('https://storyappj.herokuapp.com' + '/jobs/notactive');
    }

    joinJob(id: number) {
        return this.http.post('https://team-test-backend.herokuapp.com' + '/job/join', id);
    }
}
