import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'product/list',
        pathMatch: 'full'
    },
    {
        path: 'product/list',
        component: ProductListComponent
    },
    {
        path: 'product/add',
        component: ProductEditComponent
    },
    {
        path: 'product/edit/:id',
        component: ProductEditComponent
    },
    {
        path: 'product/cart',
        component: CartComponent
    },
    {
        path: '**',
        redirectTo: 'product/list',
        pathMatch: 'full'
    }
];
