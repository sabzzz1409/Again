import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-base',
  imports: [RouterOutlet],
  templateUrl: './base.html',
  styleUrl: './base.scss',
})
export class Base {}
