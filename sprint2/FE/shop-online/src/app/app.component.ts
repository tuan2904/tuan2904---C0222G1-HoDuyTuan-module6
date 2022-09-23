import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopping-online';

  onActivate(event) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
  }
}
