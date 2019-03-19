import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { JobService } from '../../services/job.service';
import { Job } from '../../models';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { ParticipantsDialogComponent } from '../participants-dialog/participants-dialog.component';
import { AlertService } from '../../services/alert.service';

const JOB_LIST_OPTIONS = {
    maxParticipantsCount: 14,
    itemsPerPage: 10,
    bigWidth: 1240,
    mediumWidth: 900,
    mediumCollumns: ['expand', 'idea'],
    bigCollumns: ['expand', 'organisation', 'idea', 'city', 'date'],
    allCollumns: ['expand', 'organisation', 'idea', 'city', 'category', 'date'],
};

const ALERT_MESSAGES = {
    successJoin: 'You have been succesfully added to the job',
    successLeave: 'You have successfully left the job'
};

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
export class JobListComponent implements OnInit {
    jobListOptions = JOB_LIST_OPTIONS;
    jobsData = new MatTableDataSource<Job>();
    columnsToDisplay: string[];
    expandedElement: Job;
    isLoading = true;
    dialogRef;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private jobService: JobService, public dialog: MatDialog, private alertService: AlertService) {
        this.getJobs();
        this.adjustTable(window);
    }

    ngOnInit() {
        this.jobsData.paginator = this.paginator;
    }

    adjustTable(event) {
        if (window.innerWidth <= JOB_LIST_OPTIONS.mediumWidth) {
            this.columnsToDisplay = JOB_LIST_OPTIONS.mediumCollumns;
        } else if (window.innerWidth <= JOB_LIST_OPTIONS.bigWidth) {
            this.columnsToDisplay = JOB_LIST_OPTIONS.bigCollumns;
        } else {
            this.columnsToDisplay = JOB_LIST_OPTIONS.allCollumns;
        }
        if (this.user()) {
            this.columnsToDisplay.push('join');
        }
    }

    getJobs() {
        this.jobService.getJobList().subscribe(
            value => {
                this.jobsData.data = value;
                this.isLoading = false;
            },
            error => {
                this.isLoading = false;
            }
        );
    }

    openDialog(job: Job): void {
        this.dialogRef = this.dialog.open(ParticipantsDialogComponent, {
            width: '30%',
            data: job
        });
    }
    user() {
        return localStorage.getItem('currentUser');
    }
    userEmail() {
        return localStorage.getItem('currentUserEmail');
    }

    joinJob(job: Job) {
        this.jobService.joinJob(job.id).subscribe(
            success => {
                this.alertService.createSuccessAlert(ALERT_MESSAGES.successJoin);
                window.scroll(0, 0);
                event.stopPropagation();
                this.getJobs();
            },
            error => {
                this.alertService.createErrorAlert(error.error.message);
                window.scroll(0, 0);
            }
        );
    }

    leaveJob(job: Job) {
        this.jobService.leaveJob(job.id).subscribe(
            success => {
                this.alertService.createSuccessAlert(ALERT_MESSAGES.successLeave);
                window.scroll(0, 0);
                event.stopPropagation();
                this.getJobs();
            },
            error => {
                this.alertService.createErrorAlert(error.error.message);
                window.scroll(0, 0);
            }
        );
    }
}
