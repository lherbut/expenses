import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ExpenseComponent } from './expense.component';
import { ExpenseDetailComponent } from './expense-detail.component';
import { ExpensePopupComponent } from './expense-dialog.component';
import { ExpenseDeletePopupComponent } from './expense-delete-dialog.component';

export const expenseRoute: Routes = [
    {
        path: 'expense',
        component: ExpenseComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'expensesApp.expense.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'expense/:id',
        component: ExpenseDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'expensesApp.expense.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const expensePopupRoute: Routes = [
    {
        path: 'expense-new',
        component: ExpensePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'expensesApp.expense.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'expense/:id/edit',
        component: ExpensePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'expensesApp.expense.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'expense/:id/delete',
        component: ExpenseDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'expensesApp.expense.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
