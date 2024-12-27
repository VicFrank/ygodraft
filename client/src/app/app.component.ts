import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [MessageService],
    standalone: false
})
export class AppComponent {
  title = 'Yugioh Drafting';
}
