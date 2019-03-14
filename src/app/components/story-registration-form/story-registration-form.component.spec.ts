import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryRegistrationFormComponent } from './story-registration-form.component';

describe('StoryRegistrationFormComponent', () => {
  let component: StoryRegistrationFormComponent;
  let fixture: ComponentFixture<StoryRegistrationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryRegistrationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
