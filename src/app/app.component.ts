import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {MediaMatcher} from "@angular/cdk/layout";
import {UserService} from "./services/user/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bbn-frontend';
  @Input() opened = false;
  isLoggedIn = false; // Set this based on your authentication logic
  userName = 'Elizabeth Ngai';
  userId = '0345DG9';
  userBalance = '10,000';

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(private readonly changeDetectorRef: ChangeDetectorRef,
              private readonly media: MediaMatcher,
              public readonly userService: UserService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}

