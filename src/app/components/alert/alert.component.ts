import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { Alert } from '../../models';
import { MessageType } from '../../models';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
    alert: Alert;
    public showDialog = true;
    messageType = MessageType;
    constructor(private alertService: AlertService) {}

    ngOnInit() {
        this.alertService.getMessage().subscribe(message => {
            this.alert = message;
            this.showDialog = true;
        });
    }

    toggleAlertVisibility() {
        this.showDialog = !this.showDialog;
    }
}
