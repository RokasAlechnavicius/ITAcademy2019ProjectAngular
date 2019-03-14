import { TestBed } from '@angular/core/testing';

import { StoryService } from './story.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('StoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: StoryService = TestBed.get(StoryService);
    expect(service).toBeTruthy();
  });
});
