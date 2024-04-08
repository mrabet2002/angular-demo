import { Component } from '@angular/core';
import { __decorate } from "tslib"; // Import the tslib module

export interface LinkItem {
  name: string;
  url: string;
  active: boolean;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  // Links with stats (active: true | false)
  links: LinkItem[] = [
    { name: 'Home', url: '/', active: true },
    { name: 'Products', url: '/products', active: false },
    { name: 'New Products', url: '/new-products', active: false }
  ];

  ngOnInit() {
    // Get the current URL
    const currentUrl = window.location.pathname;
    // Set the active link
    this.links.forEach(link => {
      if (link.url === currentUrl) {
        this.setActive(link);
      }
    });
  }

  setActive(link: LinkItem) {
    link.active = true;
    this.links.forEach(l => {
      if (l !== link) {
        l.active = false;
      }
    })
  }
}
