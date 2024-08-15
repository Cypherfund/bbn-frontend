import { SocialLink } from '../model/more-social-icons';
import {ChangeDetectionStrategy, Component, signal} from '@angular/core';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  readonly panelOpenState = signal(false);


  socialLinks: SocialLink[] = [
    {
      name: 'Tiktok',
      icon: 'tiktok.png',
      url: 'https://www.tiktok.com/signup'
    },
    {
      name: 'Instagram',
      icon: 'instagram.png',
      url: 'https://www.instagram.com/signup'
    },
    {
      name: 'Twitter',
      icon: 'twitter.png',
      url: 'https://www.twitter.com/signup'
    }
  ];
}
