import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Story} from '../models/story';

const HEROKU_URL = 'https://project-backend.herokuapp.com';
@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor(private http: HttpClient) { }

  addStory(story: Story) {
    return this.http.post('https://storyappj.herokuapp.com' + '/story', story);
  }

  getStoryList() {
    return this.http.get<Story[]>('https://storyappj.herokuapp.com/stories');
  }

  getStoryDetails(id: number) {
    return this.http.get<Story>(HEROKU_URL + '/story/' + id);
  }
}
