import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { StoryService } from '../../services/story.service';
import { Story } from '../../models/story';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { STORY_LIST_OPTIONS } from '../../constants/story-list-constants';

@Component({
    selector: 'app-stories-list',
    templateUrl: './story-list.component.html',
    styleUrls: ['./story-list.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
            state('expanded', style({ height: '*', width: '100%' })),
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

    loadStoryImages(element) {
        if (element.hasImages) {
            this.isLoading = true;
            element.hasImages = false;
            this.storyService.getStoryImages(element.id).subscribe(value => {
                element.images = value;
                this.isLoading = false;
            });
        }
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
