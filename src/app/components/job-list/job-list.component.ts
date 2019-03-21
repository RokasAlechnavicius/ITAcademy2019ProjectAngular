import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { JobService } from '../../services/job.service';
import { Job } from '../../models';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { ParticipantsDialogComponent } from '../participants-dialog/participants-dialog.component';
import { AlertService } from '../../services/alert.service';
import { JOB_LIST_OPTIONS, ALERT_MESSAGES } from '../../constants/job-list-constants';

@Component({
    selector: 'app-job-list',
    templateUrl: './job-list.component.html',
    styleUrls: ['./job-list.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
            state('expanded', style({ height: '*', width: '100%' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
        ])
    ]
})
export class JobListComponent implements OnInit {
    jobListOptions = JOB_LIST_OPTIONS;
    jobsData = new MatTableDataSource<Job>();
    columnsToDisplay;
    expandedElement: Job;
    isLoading = true;
    dialogRef;
    loggedIn: boolean;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private jobService: JobService, public dialog: MatDialog, private alertService: AlertService) {
        this.getJobs();
        this.adjustTable(window);
    }

    ngOnInit() {
        this.jobsData.paginator = this.paginator;
    }

    adjustTable(event) {
        if (window.innerWidth <= JOB_LIST_OPTIONS.breakWidth) {
            this.columnsToDisplay = ['expand', 'idea'];
        } else {
            this.columnsToDisplay = ['expand', 'idea', 'region', 'date'];
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
        this.loggedIn = !!this.user();
        this.dialogRef = this.dialog.open(ParticipantsDialogComponent, {
            width: '450px',
            data: { loggedIn: this.loggedIn, job }
        });

        this.dialogRef.afterClosed().subscribe(result => {
            if (result.join) {
                this.joinJob(result.job);
            }
        });
    }

    user() {
        return localStorage.getItem('currentUser');
    }
    userEmail() {
        return localStorage.getItem('currentUserEmail');
    }

    joinJob(job: Job) {
        event.stopPropagation();
        this.jobService.joinJob(job.id).subscribe(
            success => {
                this.alertService.createSuccessAlert(ALERT_MESSAGES.successJoin);
                window.scroll(0, 0);
                this.getJobs();
            },
            error => {
                this.alertService.createErrorAlert(error.error.message);
                window.scroll(0, 0);
            }
        );
    }

    leaveJob(job: Job) {
        event.stopPropagation();
        this.jobService.leaveJob(job.id).subscribe(
            success => {
                this.alertService.createSuccessAlert(ALERT_MESSAGES.successLeave);
                // event.stopPropagation();
                window.scroll(0, 0);
                this.getJobs();
            },
            error => {
                this.alertService.createErrorAlert(error.error.message);
                window.scroll(0, 0);
            }
        );
    }
}
