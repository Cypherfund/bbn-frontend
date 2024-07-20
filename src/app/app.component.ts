import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {MediaMatcher} from "@angular/cdk/layout";
import {UserService} from "./services/user/user.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bbn-frontend';
  @Input() opened = false;

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
  showHeader: boolean = true;
  isLogged!: boolean;


  constructor(private readonly changeDetectorRef: ChangeDetectorRef,
              private readonly media: MediaMatcher,
              private router: Router,
              private route: ActivatedRoute,
              public readonly userService: UserService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    // Listen to router events to determine if we are on login or signup page
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentRoute = this.route.snapshot.firstChild?.routeConfig?.path;
        this.showHeader = !(currentRoute === 'login' || currentRoute === 'signup');
      });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.loginUserIfTokenPresent();
    this.isLogged = !!Object.keys(this.userService.user).length;
    this.userService.login$.pipe().subscribe( loginVal => {
      if (loginVal === 1) {
        this.isLogged = !!Object.keys(this.userService.user).length;
      } else {
        this.isLogged = false;
      }
    })
  }

  private loginUserIfTokenPresent() {
    this.userService.recheckToken().subscribe();

  }
}

