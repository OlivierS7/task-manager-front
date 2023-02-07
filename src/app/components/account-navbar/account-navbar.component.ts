import { Component } from '@angular/core';

@Component({
  selector: 'app-account-navbar',
  templateUrl: './account-navbar.component.html',
  styleUrls: ['./account-navbar.component.scss']
})
export class AccountNavbarComponent {
  links: any
  constructor(){
    this.links = [
      {
        title: 'Public profile',
        link: '/account',
        iconClass: 'fa-regular fa-user'
      },
      {
        title: 'Account',
        link: '/account/admin',
        iconClass: 'fas fa-cog'
      },
      {
        title: 'Organizations',
        link: '/account/organizations',
        iconClass: 'fa-solid fa-users-rectangle'
      },
    ]
  }
}
