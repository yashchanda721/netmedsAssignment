import { Routes } from '@angular/router';

import { TestsComponent } from '../../pages/tests/tests.component';
import { CartComponent } from '../../pages/cart/cart.component';
import { ThankyouComponent } from '../../pages/thankyou/thankyou.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'tests',      component: TestsComponent },
    { path: 'cart',          component: CartComponent },
    { path: 'thankyou',        component: ThankyouComponent }
];
