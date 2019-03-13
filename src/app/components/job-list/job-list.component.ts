import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { JobService } from '../services/job.service';
import { Job } from '../models';
import { MatDialog } from '@angular/material';
import { ParticipantsDialogComponent } from '../participants-dialog/participants-dialog.component';
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
    columnsToDisplay = ['expand', 'organisation', 'idea', 'city', 'category', 'date', 'join'];
    expandedElement: Job | null;
    isLoading = true;

    constructor(private jobService: JobService, public dialog: MatDialog, private alertService: AlertService) {
        this.jobService.getJobList().subscribe(
            value => {
                this.dataSource = value;
                this.isLoading = false;
            },
            error => {
                this.isLoading = false;
            }
        );
    }

    openDialog(job: Job): void {
        const dialogRef = this.dialog.open(ParticipantsDialogComponent, {
            width: '30%',
            data: job
        });
    }
    user() {
        return localStorage.getItem('currentUser');
    }

    joinJob(job: Job) {
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