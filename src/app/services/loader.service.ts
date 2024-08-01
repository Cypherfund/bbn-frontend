import {ElementRef, Injectable, Renderer2} from '@angular/core';
import {BehaviorSubject, catchError, distinctUntilChanged, finalize, Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoading$: Observable<boolean>;
  renderer!: Renderer2;
  constructor() {
    this.isLoading$ = this.isLoadingSubject.asObservable().pipe(distinctUntilChanged());
  }

  showLoaderUntilComplete<T>(observable: Observable<T>, targetElement?: ElementRef, renderer?: Renderer2): Observable<T> {
    console.log(renderer, targetElement)
    this.renderer = renderer!;
    if (targetElement) this.showLoader(targetElement); else this.isLoadingSubject.next(true);
    return observable.pipe(
      tap(() => {
        this.isLoadingSubject.next(false);
        this.hideLoader(targetElement)
      }),
      catchError((error) => {
        this.isLoadingSubject.next(false);
        this.hideLoader(targetElement);
        throw error;
      }),
      finalize(() => {
        this.isLoadingSubject.next(false)
        this.hideLoader(targetElement);
      })
    );
  }

  private showLoader(targetElement?: ElementRef) {
    const loader = this.renderer.createElement('mat-spinner');
    this.renderer.addClass(loader, 'loader-spinner');
    this.renderer.appendChild(targetElement?.nativeElement, loader);
    this.renderer.setStyle(loader, 'position', 'absolute');
    this.renderer.setStyle(loader, 'top', '50%');
    this.renderer.setStyle(loader, 'left', '50%');
    this.renderer.setStyle(loader, 'transform', 'translate(-50%, -50%)');
  }

  private hideLoader(targetElement?: ElementRef) {
    if (!targetElement) return;
    const loader = targetElement?.nativeElement.ownerDocument.querySelector('.loader-spinner');
    if (loader) {
      this.renderer.removeChild(loader.parentElement, loader);
    }
  }

}
