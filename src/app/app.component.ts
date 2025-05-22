import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router'; // Add RouterLink

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent {
  title = 'tutorlink-front-final';
}
