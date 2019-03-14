import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StoryService } from '../../services/story.service';
import { Story } from '../../models/story';
import { StoryDetailsDialogComponent } from '../story-details-dialog/story-details-dialog.component';

@Component({
    selector: 'app-stories-list',
    templateUrl: './story-list.component.html',
    styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent {
    storiesData: Story[];
    columnsToDisplay = ['date', 'idea', 'read'];
    isLoading = true;

    constructor(private storyService: StoryService, public dialog: MatDialog) {
        this.storyService.getStoryList().subscribe(
            value => {
                this.storiesData = value;
                console.log(value);
                this.isLoading = false;
            },
            error => {
                this.isLoading = false;
            }
        );
    }

    openStoryDetail(story: Story): void {
        const dialogRef = this.dialog.open(StoryDetailsDialogComponent, {
            width: '40%',
            data: story
        });
    }
}
