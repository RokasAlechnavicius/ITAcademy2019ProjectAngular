import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-participants-dialog',
    templateUrl: './participants-dialog.component.html',
    styleUrls: ['./participants-dialog.component.css']
})
export class ParticipantsDialogComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<ParticipantsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    done(): void {
        this.dialogRef.close();
    }
    ngOnInit() {}
}
