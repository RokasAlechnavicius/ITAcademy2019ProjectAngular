import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { JobService } from '../../services/job.service';
import { Job } from '../../models';
import { MatDialog } from '@angular/material';
import { ParticipantsDialogComponent } from '../participants-dialog/participants-dialog.component';
import { AlertService } from '../../services/alert.service';

const JOB_LIST_OPTIONS = {
    maxParticipantsCount: 14
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
export class JobListComponent {
    jobListOptions = JOB_LIST_OPTIONS;
    jobsData: Job[];
    columnsToDisplay;
    expandedElement: Job;
    isLoading = true;
    dialogRef;

    constructor(private jobService: JobService, public dialog: MatDialog, private alertService: AlertService) {
        this.getJobs();
        this.adjustTable(window);
    }

    adjustTable(event) {
        if (window.innerWidth <= 900) {
            this.columnsToDisplay = ['expand', 'idea'];
        } else if (window.innerWidth <= 1240) {
            this.columnsToDisplay = ['expand', 'organisation', 'idea', 'city', 'date'];
        } else {
            this.columnsToDisplay = ['expand', 'organisation', 'idea', 'city', 'category', 'date'];
        }
        if (this.user()) {
            this.columnsToDisplay.push('join');
        }
    }

    getJobs() {
        this.jobService.getJobList().subscribe(
            value => {
                this.jobsData = value;
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
                this.alertService.createSuccessAlert('You have been succesfully added to the job');
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
    this.jobService.leaveJob(job.id).subscribe(
      success => {
        this.alertService.createSuccessAlert('You have successfully left the job');
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
