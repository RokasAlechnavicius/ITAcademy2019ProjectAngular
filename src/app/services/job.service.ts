import { Injectable } from '@angular/core';
import { Job } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const herokuUrl = 'https://project-backend.herokuapp.com';

@Injectable({
    providedIn: 'root'
})
export class JobService {
    constructor(private http: HttpClient) {}

    addJob(job: Job) {
        return this.http.post(herokuUrl + '/job', job);
    }

    getJobList() {
        return this.http.get<Job[]>(herokuUrl + '/jobs/all');
    }
}
