import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CashAccount } from './cash-account.model';
import { CashAccountService } from './cash-account.service';

@Component({
    selector: 'jhi-cash-account-detail',
    templateUrl: './cash-account-detail.component.html'
})
export class CashAccountDetailComponent implements OnInit, OnDestroy {

    cashAccount: CashAccount;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cashAccountService: CashAccountService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCashAccounts();
    }

    load(id) {
        this.cashAccountService.find(id)
            .subscribe((cashAccountResponse: HttpResponse<CashAccount>) => {
                this.cashAccount = cashAccountResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCashAccounts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cashAccountListModification',
            (response) => this.load(this.cashAccount.id)
        );
    }
}
