import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CashAccount } from './cash-account.model';
import { CashAccountService } from './cash-account.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-cash-account',
    templateUrl: './cash-account.component.html'
})
export class CashAccountComponent implements OnInit, OnDestroy {
cashAccounts: CashAccount[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cashAccountService: CashAccountService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cashAccountService.query().subscribe(
            (res: HttpResponse<CashAccount[]>) => {
                this.cashAccounts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCashAccounts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CashAccount) {
        return item.id;
    }
    registerChangeInCashAccounts() {
        this.eventSubscriber = this.eventManager.subscribe('cashAccountListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
