import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ExpensesSharedModule } from '../../shared';
import {
    CashAccountService,
    CashAccountPopupService,
    CashAccountComponent,
    CashAccountDetailComponent,
    CashAccountDialogComponent,
    CashAccountPopupComponent,
    CashAccountDeletePopupComponent,
    CashAccountDeleteDialogComponent,
    cashAccountRoute,
    cashAccountPopupRoute,
} from './';

const ENTITY_STATES = [
    ...cashAccountRoute,
    ...cashAccountPopupRoute,
];

@NgModule({
    imports: [
        ExpensesSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CashAccountComponent,
        CashAccountDetailComponent,
        CashAccountDialogComponent,
        CashAccountDeleteDialogComponent,
        CashAccountPopupComponent,
        CashAccountDeletePopupComponent,
    ],
    entryComponents: [
        CashAccountComponent,
        CashAccountDialogComponent,
        CashAccountPopupComponent,
        CashAccountDeleteDialogComponent,
        CashAccountDeletePopupComponent,
    ],
    providers: [
        CashAccountService,
        CashAccountPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExpensesCashAccountModule {}
