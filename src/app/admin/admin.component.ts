import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { AuthService } from '../shared/services/auth.service';
import { MatDrawer } from '@angular/material/sidenav';

export interface IMenu {
  url: string;
  text: string;
  icon: string;
}

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements AfterViewInit {

  @ViewChild('drawer') drawer: MatDrawer;
  menu: Array<IMenu> = [
    {
      icon: 'apps',
      text: 'Dashboard',
      url: '/admin/dashboard'
    },
    {
      icon: 'train',
      text: 'Reservations',
      url: '/admin/trains'
    },
    {
      icon: 'list',
      text: 'Categories',
      url: '/admin/categories'
    },
    {
      icon: 'transfer_within_a_station',
      text: 'Stations',
      url: '/admin/stations'
    },
    {
      icon: 'money',
      text: 'Orders',
      url: '/admin/orders'
    },
    {
      icon: 'description',
      text: 'Reports',
      url: '/admin/reports'
    },
    {
      icon: 'groups',
      text: 'Users',
      url: '/admin/users'
    }
  ];

  constructor(private authService: AuthService) {
    this.drawer = {} as MatDrawer;
  }

  logout(): void {
    this.authService.logout();
  }

  ngAfterViewInit(): void {
    this.drawer.opened = true;
  }

}
