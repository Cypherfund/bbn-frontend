import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.scss'
})
export class TermsComponent {

  constructor(private router: Router) { }

  onAgree() {
    // Logic for agreeing to terms and conditions
    this.router.navigate(['/signup']);
  }

  onDisagree() {
    // Logic for disagreeing with terms and conditions
    this.router.navigate(['/']);
  }
}
