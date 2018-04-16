import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Expense } from './expense.model';
import { ExpensePopupService } from './expense-popup.service';
import { ExpenseService } from './expense.service';
import { CashAccount, CashAccountService } from '../cash-account';
import { Category, CategoryService } from '../category';

@Component({
    selector: 'jhi-expense-dialog',
    templateUrl: './expense-dialog.component.html'
})
export class ExpenseDialogComponent implements OnInit {

    expense: Expense;
    isSaving: boolean;

    cashaccounts: CashAccount[];

    categories: Category[];
    expenseDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private expenseService: ExpenseService,
        private cashAccountService: CashAccountService,
        private categoryService: CategoryService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cashAccountService.query()
            .subscribe((res: HttpResponse<CashAccount[]>) => { this.cashaccounts = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.categoryService.query()
            .subscribe((res: HttpResponse<Category[]>) => { this.categories = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.expense.id !== undefined) {
            this.subscribeToSaveResponse(
                this.expenseService.update(this.expense));
        } else {
            this.subscribeToSaveResponse(
                this.expenseService.create(this.expense));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Expense>>) {
        result.subscribe((res: HttpResponse<Expense>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Expense) {
        this.eventManager.broadcast({ name: 'expenseListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCashAccountById(index: number, item: CashAccount) {
        return item.id;
    }

    trackCategoryById(index: number, item: Category) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-expense-popup',
    template: ''
})
export class ExpensePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private expensePopupService: ExpensePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.expensePopupService
                    .open(ExpenseDialogComponent as Component, params['id']);
            } else {
                this.expensePopupService
                    .open(ExpenseDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
