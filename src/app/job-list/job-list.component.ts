import {Component} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {JobService} from '../services/job.service';
import {Job} from '../models';

@Component({
    selector: 'app-job-list',
    templateUrl: './job-list.component.html',
    styleUrls: ['./job-list.component.css'],
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

    constructor(private jobService: JobService) {
        this.jobService.getJobList().subscribe(value => {
            console.log(value);
            this.dataSource = value;
        });
    }
}
