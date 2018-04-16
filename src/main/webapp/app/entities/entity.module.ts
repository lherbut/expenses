import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ExpensesCashAccountModule } from './cash-account/cash-account.module';
import { ExpensesCategoryModule } from './category/category.module';
import { ExpensesExpenseModule } from './expense/expense.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ExpensesCashAccountModule,
        ExpensesCategoryModule,
        ExpensesExpenseModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExpensesEntityModule {}
