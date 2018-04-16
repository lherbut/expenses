import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CashAccount } from './cash-account.model';
import { CashAccountPopupService } from './cash-account-popup.service';
import { CashAccountService } from './cash-account.service';

@Component({
    selector: 'jhi-cash-account-delete-dialog',
    templateUrl: './cash-account-delete-dialog.component.html'
})
export class CashAccountDeleteDialogComponent {

    cashAccount: CashAccount;

    constructor(
        private cashAccountService: CashAccountService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cashAccountService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cashAccountListModification',
                content: 'Deleted an cashAccount'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cash-account-delete-popup',
    template: ''
})
export class CashAccountDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cashAccountPopupService: CashAccountPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cashAccountPopupService
                .open(CashAccountDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
