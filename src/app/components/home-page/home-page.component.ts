import { Component, OnInit } from '@angular/core';

const REACTIVE_PAGE_BREAKPOINTS = {
    bigWidth: 924,
    mediumWidth: 600,
    lowWidth: 400
};

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
        this.breakpoint = window.innerWidth <= REACTIVE_PAGE_BREAKPOINTS.bigWidth ? 1 : 3;
        this.colspan = window.innerWidth <= REACTIVE_PAGE_BREAKPOINTS.bigWidth ? 1 : 2;
        this.rowspanText = window.innerWidth <= REACTIVE_PAGE_BREAKPOINTS.bigWidth ? 2 : 1;
        if (window.innerWidth <= REACTIVE_PAGE_BREAKPOINTS.lowWidth) {
            this.rowHeightHow = 165;
            this.rowHeightWhen = 90;
            this.rowHeightWho = 75;
        } else if (window.innerWidth <= REACTIVE_PAGE_BREAKPOINTS.mediumWidth) {
            this.rowHeightHow = 140;
            this.rowHeightWhen = 100;
        } else if (window.innerWidth <= REACTIVE_PAGE_BREAKPOINTS.bigWidth) {
            this.rowHeightHow = 100;
            this.rowHeightWhen = 80;
            this.rowHeightWho = 60;
        } else {
            this.rowHeightHow = 250;
            this.rowHeightWhen = 225;
            this.rowHeightWho = 200;
        }
    }

    scroll(el: HTMLElement) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
