import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../services/job.service';
import { Job } from '../../models';
import { StoryService } from '../../services/story.service';
import { AlertService } from '../../services/alert.service';

const STORY_FORM_MESSAGES = {
    successCreate: 'A new story has been created',
    errorCreate: 'An error has occured: ',
    errorFileValidation: 'These files are larger than 4Mb or not a valid image format: ',
    maxSize: 1024,
    maxFileSizeMB: 4
};

@Component({
    selector: 'app-story-registration-form',
    templateUrl: './story-registration-form.component.html',
    styleUrls: ['./story-registration-form.component.css']
})
export class StoryRegistrationFormComponent implements OnInit {
    storyForm: FormGroup;
    jobs: Job[];
    base64textString = [];
    invalidFileNames = [];
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private jobService: JobService,
        private storyService: StoryService,
        private alertService: AlertService
    ) {}

    @ViewChild('uploadEl') uploadElRef: ElementRef;

    ngOnInit() {
        this.createForm();
        this.jobService.getStoryJobList().subscribe(jobs => {
            this.jobs = jobs;
        });
    }

    public noWhiteSpaceValidator(control: FormControl) {
        const isWhitespace = (control.value || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { whitespace: true };
    }

    createForm() {
        this.storyForm = this.formBuilder.group({
            description: [
                '',
                [Validators.required, Validators.maxLength(STORY_FORM_MESSAGES.maxSize), this.noWhiteSpaceValidator]
            ],
            job: ['', Validators.required],
            images: [this.base64textString]
        });
    }

    submitForm() {
        this.storyService.addStory(this.storyForm.value).subscribe(
            data => {
                this.alertService.createSuccessAlert(STORY_FORM_MESSAGES.successCreate, true);
                this.router.navigate(['/stories']);
            },
            error => {
                this.alertService.createErrorAlert(STORY_FORM_MESSAGES.errorCreate + error.error.message);
            }
        );
    }
    onUploadChange(event: any) {
        if (event.target.files.length) {
            for (const file of event.target.files) {
                if (
                    file.size / STORY_FORM_MESSAGES.maxSize / STORY_FORM_MESSAGES.maxSize <
                        STORY_FORM_MESSAGES.maxFileSizeMB &&
                    file.type.includes('image/')
                ) {
                    const reader = new FileReader();
                    reader.onload = this.handleReaderLoaded.bind(this);
                    reader.readAsBinaryString(file);
                } else {
                    this.invalidFileNames.push(file.name + ' ');
                }
            }
            if (this.invalidFileNames.length > 0) {
                this.storyForm.controls.images.setErrors({ incorrect: true });
                this.alertService.createErrorAlert(STORY_FORM_MESSAGES.errorFileValidation + this.invalidFileNames);
            } else {
                this.storyForm.controls.images.setErrors(null);
            }
        }
    }

    handleReaderLoaded(e) {
        this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));
    }

    cancelImageUpload() {
        this.base64textString = [];
        this.uploadElRef.nativeElement.value = '';
    }
}
