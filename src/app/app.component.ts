import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { config } from 'src/environments/config';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(
        private title: Title,
    ) {
        this.title.setTitle(`${config.app_name} - ${config.app_version}`);
    }
}
