import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ExpensesSharedModule } from '../../shared';
import {
    ExpenseService,
    ExpensePopupService,
    ExpenseComponent,
    ExpenseDetailComponent,
    ExpenseDialogComponent,
    ExpensePopupComponent,
    ExpenseDeletePopupComponent,
    ExpenseDeleteDialogComponent,
    expenseRoute,
    expensePopupRoute,
} from './';

const ENTITY_STATES = [
    ...expenseRoute,
    ...expensePopupRoute,
];

@NgModule({
    imports: [
        ExpensesSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ExpenseComponent,
        ExpenseDetailComponent,
        ExpenseDialogComponent,
        ExpenseDeleteDialogComponent,
        ExpensePopupComponent,
        ExpenseDeletePopupComponent,
    ],
    entryComponents: [
        ExpenseComponent,
        ExpenseDialogComponent,
        ExpensePopupComponent,
        ExpenseDeleteDialogComponent,
        ExpenseDeletePopupComponent,
    ],
    providers: [
        ExpenseService,
        ExpensePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExpensesExpenseModule {}
