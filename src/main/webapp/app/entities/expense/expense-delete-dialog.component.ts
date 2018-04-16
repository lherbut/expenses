import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Expense } from './expense.model';
import { ExpensePopupService } from './expense-popup.service';
import { ExpenseService } from './expense.service';

@Component({
    selector: 'jhi-expense-delete-dialog',
    templateUrl: './expense-delete-dialog.component.html'
})
export class ExpenseDeleteDialogComponent {

    expense: Expense;

    constructor(
        private expenseService: ExpenseService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.expenseService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'expenseListModification',
                content: 'Deleted an expense'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-expense-delete-popup',
    template: ''
})
export class ExpenseDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private expensePopupService: ExpensePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.expensePopupService
                .open(ExpenseDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
