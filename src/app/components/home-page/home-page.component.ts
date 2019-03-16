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
    rowHeight = 225;

    ngOnInit() {
        this.breakpoint = window.innerWidth <= 924 ? 1 : 3;
        this.colspan = window.innerWidth <= 924 ? 1 : 2;
        this.rowspanText = window.innerWidth <= 924 ? 2 : 1;
    }

    onResize(event) {
        this.breakpoint = event.target.innerWidth <= 924 ? 1 : 3;
        this.colspan = window.innerWidth <= 924 ? 1 : 2;
        this.rowspanText = window.innerWidth <= 924 ? 2 : 1;
    }

    scroll(el: HTMLElement) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
