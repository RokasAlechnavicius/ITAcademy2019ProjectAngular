import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
    selector: 'app-participants-dialog',
    templateUrl: './participants-dialog.component.html',
    styleUrls: ['./participants-dialog.component.scss']
})
export class ParticipantsDialogComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<ParticipantsDialogComponent>,
        private router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    join(): void {
        if (!localStorage.getItem('currentUser')) {
            this.router.navigate(['/login']);
            this.dialogRef.close({ join: false, job: this.data.job });
        } else {
            this.dialogRef.close({ join: true, job: this.data.job });
        }
    }

    closeModal(): void {
        this.dialogRef.close({ join: false, job: this.data.job });
    }

    ngOnInit() {}
}
