import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
    constructor() {}

    breakpoint = 3;
    colspan = 2;
    rowspanText = 1;
    rowspanIcon = 1;
    rowHeightHow: number;
    rowHeightWho: number;
    rowHeightWhen: number;

    ngOnInit() {
        this.changeRowHeights();
    }

    onResize(event) {
        this.changeRowHeights();
    }

    changeRowHeights() {
        this.breakpoint = window.innerWidth <= 924 ? 1 : 3;
        this.colspan = window.innerWidth <= 924 ? 1 : 2;
        this.rowspanText = window.innerWidth <= 924 ? 2 : 1;
        if (window.innerWidth <= 600) {
            this.rowHeightHow = 140;
            this.rowHeightWhen = 100;
        } else if (window.innerWidth <= 924) {
            this.rowHeightHow = 100;
            this.rowHeightWhen = 80;
        } else {
            this.rowHeightHow = 250;
            this.rowHeightWhen = 225;
        }
        this.rowHeightWho = window.innerWidth <= 924 ? 60 : 200;
    }

    scroll(el: HTMLElement) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
