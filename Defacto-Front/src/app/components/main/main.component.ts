import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SideNavComponent } from '../side-nav/side-nav.component';
import { HeaderComponent } from '../header/header.component';



@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent,RouterOutlet,SideNavComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
