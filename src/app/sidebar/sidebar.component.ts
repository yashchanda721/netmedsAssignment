import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/tests',     title: 'Tests',         icon:'nc-check-2',       class: '' },
    { path: '/cart',         title: 'Cart',             icon:'nc-cart-simple',    class: '' },
    { path: '/thankyou',         title: 'Thankyou',             icon:'nc-satisfied',    class: '' }
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
