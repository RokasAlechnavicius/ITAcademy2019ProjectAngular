import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { JobService } from '../../services/job.service';
import { Job } from '../../models';
import { AlertService } from '../../services/alert.service';

@Component({
    selector: 'app-job-list',
    templateUrl: './job-list.component.html',
    styleUrls: ['./job-list.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
        ])
    ]
})
export class JobListComponent {
    dataSource: Job[];
    columnsToDisplay = ['organisation', 'idea', 'city', 'category', 'date', 'button'];
    expandedElement: Job | null;

    constructor(private jobService: JobService, private alertService: AlertService) {
        this.jobService.getJobList().subscribe(value => {
            this.dataSource = value;
        });
    }
    user() {
        return localStorage.getItem('currentUser');
    }

    joinAJob(job: Job) {
        this.jobService.joinJob(job.id).subscribe(
            success => {
                this.alertService.createSuccessAlert('You have been succesfully added to the job');
            },
            error => {
                this.alertService.createErrorAlert('An error occurred:' + error);
            }
        );
    }
}
