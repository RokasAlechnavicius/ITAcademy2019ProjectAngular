import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../services/job.service';
import { Job } from '../../models';
import { StoryService } from '../../services/story.service';
import { AlertService } from '../../services/alert.service';

@Component({
    selector: 'app-story-registration-form',
    templateUrl: './story-registration-form.component.html',
    styleUrls: ['./story-registration-form.component.css']
})
export class StoryRegistrationFormComponent implements OnInit {
    storyForm: FormGroup;
    jobs: Job[];
    // selectedFiles: File[] = [];
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private jobService: JobService,
        private storyService: StoryService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.createForm();
        this.jobService.getJobList().subscribe(jobs => {
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
            description: ['', [Validators.required, Validators.maxLength(1024), this.noWhiteSpaceValidator]],
            job: ['', Validators.required],
            images: []
        });
    }

    submitForm() {
        console.log(this.storyForm.value);
        this.storyService.addStory(this.storyForm.value).subscribe(
            data => {
                this.alertService.createSuccessAlert('A new story has been created', true);
                this.router.navigate(['/home']);
            },
            error => {
                this.alertService.createErrorAlert('An error has occured: ' + error.error.message);
            }
        );
    }

    // onSelectFile(event) {
    //     if (event.target.files.length) {
    //         for (let i = 0; i < event.target.files.length; i++) {
    //             this.selectedFiles.push(<File>event.target.files[i]);
    //         }
    //     }
    // }
}
