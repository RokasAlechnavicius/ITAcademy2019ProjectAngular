import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-participants-dialog',
    templateUrl: './participants-dialog.component.html',
    styleUrls: ['./participants-dialog.component.scss']
})
export class ParticipantsDialogComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<ParticipantsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    closeModal(): void {
        this.dialogRef.close();
    }
    ngOnInit() {}
}
