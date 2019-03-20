import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { Job } from '../../models';
import { JobService } from '../../services/job.service';
import { AlertService } from '../../services/alert.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

const ADMIN_JOB_LIST_OPTIONS = {
    itemsPerPage: 15,
    breakWidth: 1000
};
const ALERT_MESSAGES = {
    successApprove: 'Job was approved',
    successReject: 'Job was rejected'
};
@Component({
    selector: 'app-admin-job-list',
    templateUrl: './admin-job-list.component.html',
    styleUrls: ['./admin-job-list.component.scss', '../job-list/job-list.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
            state('expanded', style({ height: '*', width: '100%' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
        ])
    ]
})
export class AdminJobListComponent implements OnInit {
    jobListOptions = ADMIN_JOB_LIST_OPTIONS;
    jobsData = new MatTableDataSource<Job>();
    columnsToDisplay: string[];
    expandedElement: Job;
    isLoading = true;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private jobService: JobService, public dialog: MatDialog, private alertService: AlertService) {
        this.getJobs();
        this.adjustTable(window);
    }

    ngOnInit() {
        this.jobsData.paginator = this.paginator;
    }

    getJobs() {
        this.jobService.getJobAdminList().subscribe(
            value => {
                this.jobsData.data = value;
                this.isLoading = false;
            },
            error => {
                this.isLoading = false;
            }
        );
    }

    adjustTable(event) {
        if (window.innerWidth <= ADMIN_JOB_LIST_OPTIONS.breakWidth) {
            this.columnsToDisplay = ['expand', 'idea', 'join'];
        } else {
            this.columnsToDisplay = ['expand', 'idea', 'region', 'date', 'join'];
        }
    }

    rejectJob(job: Job) {
        event.stopPropagation();
        this.jobService.rejectJob(job.id).subscribe(
            success => {
                this.alertService.createSuccessAlert(ALERT_MESSAGES.successReject);
                window.scroll(0, 0);
                this.getJobs();
            },
            error => {
                this.alertService.createErrorAlert(error.error.message);
                window.scroll(0, 0);
            }
        );
    }

    approveJob(job: Job) {
        event.stopPropagation();
        this.jobService.approveJob(job.id).subscribe(
            success => {
                this.alertService.createSuccessAlert(ALERT_MESSAGES.successApprove);
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
