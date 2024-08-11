import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {MediaMatcher} from "@angular/cdk/layout";
import {UserService} from "./services/user/user.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, Observable} from "rxjs";
import {LoaderService} from "./services/loader.service";

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
  showFooter: boolean = true;
  isLogged!: boolean;
  isTaskRoute = false;


  showLoader$ = this.loaderService.isLoading$;

  constructor(private readonly changeDetectorRef: ChangeDetectorRef,
              private readonly media: MediaMatcher,
              private readonly router: Router,
              private readonly route: ActivatedRoute,
              private readonly loaderService: LoaderService,
              public readonly userService: UserService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    // Listen to router events to determine if we are on login or signup page
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentRoute = this.route.snapshot.firstChild?.routeConfig?.path;
        this.showHeader = !(currentRoute === 'login' || currentRoute === 'signup' || currentRoute === 'task' || currentRoute === 'micro-task');
        this.showFooter = !(currentRoute === 'task' || currentRoute === 'micro-task');
        this.isTaskRoute = this.router.url.startsWith('/task' || router.url.startsWith('/micro-task'));
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
        this.userService.loadUserBalance(this.userService.user.userId);
      } else {
        this.isLogged = false;
      }
      this.changeDetectorRef.detectChanges();
    })
  }

  private loginUserIfTokenPresent() {
    this.userService.recheckToken().subscribe();

  }
}

