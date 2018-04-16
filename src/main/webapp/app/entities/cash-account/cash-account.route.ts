import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CashAccountComponent } from './cash-account.component';
import { CashAccountDetailComponent } from './cash-account-detail.component';
import { CashAccountPopupComponent } from './cash-account-dialog.component';
import { CashAccountDeletePopupComponent } from './cash-account-delete-dialog.component';

export const cashAccountRoute: Routes = [
    {
        path: 'cash-account',
        component: CashAccountComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'expensesApp.cashAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cash-account/:id',
        component: CashAccountDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'expensesApp.cashAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cashAccountPopupRoute: Routes = [
    {
        path: 'cash-account-new',
        component: CashAccountPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'expensesApp.cashAccount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cash-account/:id/edit',
        component: CashAccountPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'expensesApp.cashAccount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cash-account/:id/delete',
        component: CashAccountDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'expensesApp.cashAccount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
