import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CashAccount } from './cash-account.model';
import { CashAccountPopupService } from './cash-account-popup.service';
import { CashAccountService } from './cash-account.service';

@Component({
    selector: 'jhi-cash-account-dialog',
    templateUrl: './cash-account-dialog.component.html'
})
export class CashAccountDialogComponent implements OnInit {

    cashAccount: CashAccount;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private cashAccountService: CashAccountService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cashAccount.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cashAccountService.update(this.cashAccount));
        } else {
            this.subscribeToSaveResponse(
                this.cashAccountService.create(this.cashAccount));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CashAccount>>) {
        result.subscribe((res: HttpResponse<CashAccount>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CashAccount) {
        this.eventManager.broadcast({ name: 'cashAccountListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-cash-account-popup',
    template: ''
})
export class CashAccountPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cashAccountPopupService: CashAccountPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cashAccountPopupService
                    .open(CashAccountDialogComponent as Component, params['id']);
            } else {
                this.cashAccountPopupService
                    .open(CashAccountDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
