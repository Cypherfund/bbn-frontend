import { Tips } from './../model/tips-data';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tips-screen',
  templateUrl: './tips-screen.component.html',
  styleUrl: './tips-screen.component.scss'
})
export class TipsScreenComponent {
  @Input() tips : Tips[] = []
  
}
