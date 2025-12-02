import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatButtonModule, RouterLink, MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}