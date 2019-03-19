import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { StoryService } from '../../services/story.service';
import { Story } from '../../models/story';
import { StoryDetailsDialogComponent } from '../story-details-dialog/story-details-dialog.component';

const STORY_LIST_OPTIONS = {
    itemsPerPage: 10,
    collumnsDisplay: ['date', 'idea', 'read']
};

@Component({
    selector: 'app-stories-list',
    templateUrl: './story-list.component.html',
    styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent implements OnInit {
    storyListOptions = STORY_LIST_OPTIONS;
    storiesData = new MatTableDataSource<Story>();
    columnsToDisplay = STORY_LIST_OPTIONS.collumnsDisplay;
    isLoading = true;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private storyService: StoryService, public dialog: MatDialog) {
        this.storyService.getStoryList().subscribe(
            value => {
                this.storiesData.data = value;
                this.isLoading = false;
            },
            error => {
                this.isLoading = false;
            }
        );
    }

    ngOnInit() {
        this.storiesData.paginator = this.paginator;
    }

    user() {
        return localStorage.getItem('currentUser');
    }

    openStoryDetail(story: Story): void {
        const dialogRef = this.dialog.open(StoryDetailsDialogComponent, {
            width: '40%',
            data: story
        });
    }
}
