import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-story-details-dialog',
    templateUrl: './story-details-dialog.component.html',
    styleUrls: ['./story-details-dialog.component.scss']
})
export class StoryDetailsDialogComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<StoryDetailsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    closeModal(): void {
        this.dialogRef.close();
    }
    ngOnInit() {}
}
