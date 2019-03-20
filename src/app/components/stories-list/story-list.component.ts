import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { StoryService } from '../../services/story.service';
import { Story } from '../../models/story';
import { StoryDetailsDialogComponent } from '../story-details-dialog/story-details-dialog.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {ImageDialogComponent} from '../image-dialog/image-dialog.component';

const STORY_LIST_OPTIONS = {
    itemsPerPage: 10,
    collumnsDisplay: ['date', 'idea', 'read']
};

@Component({
    selector: 'app-stories-list',
    templateUrl: './story-list.component.html',
    styleUrls: ['./story-list.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
            state('expanded', style({ height: '*', width:'100%' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
        ])
    ]
})
export class StoryListComponent implements OnInit {
    storyListOptions = STORY_LIST_OPTIONS;
    storiesData = new MatTableDataSource<Story>();
    columnsToDisplay = STORY_LIST_OPTIONS.collumnsDisplay;
    isLoading = true;
    expandedElement: Story;

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

    openImageDialog(image: string): void {
        const dialogRef = this.dialog.open(ImageDialogComponent, {
            width: '90%',
            data: image
        });
    }
}
