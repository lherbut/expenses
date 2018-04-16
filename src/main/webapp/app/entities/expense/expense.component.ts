import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Expense } from './expense.model';
import { ExpenseService } from './expense.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-expense',
    templateUrl: './expense.component.html'
})
export class ExpenseComponent implements OnInit, OnDestroy {
expenses: Expense[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private expenseService: ExpenseService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.expenseService.query().subscribe(
            (res: HttpResponse<Expense[]>) => {
                this.expenses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInExpenses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Expense) {
        return item.id;
    }
    registerChangeInExpenses() {
        this.eventSubscriber = this.eventManager.subscribe('expenseListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
