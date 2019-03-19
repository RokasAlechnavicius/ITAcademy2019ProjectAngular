import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Story } from '../models/story';

const HEROKU_URL = 'https://team-test-backend.herokuapp.com';
@Injectable({
    providedIn: 'root'
})
export class StoryService {
    constructor(private http: HttpClient) {}

    createAuthorizationHeader(headers: HttpHeaders) {
        headers.append('Content-Type', 'multipart/form-data');
    }

    addStory(story: Story) {
        const headers = new HttpHeaders();
        this.createAuthorizationHeader(headers);
        return this.http.post(HEROKU_URL + '/story', story);
    }

    getStoryList() {
        return this.http.get<Story[]>(HEROKU_URL + '/stories');
    }

    getStoryDetails(id: number) {
        return this.http.get<Story>(HEROKU_URL + '/story/' + id);
    }
}
