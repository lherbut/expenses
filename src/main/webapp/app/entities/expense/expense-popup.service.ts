import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Expense } from './expense.model';
import { ExpenseService } from './expense.service';

@Injectable()
export class ExpensePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private expenseService: ExpenseService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.expenseService.find(id)
                    .subscribe((expenseResponse: HttpResponse<Expense>) => {
                        const expense: Expense = expenseResponse.body;
                        if (expense.expenseDate) {
                            expense.expenseDate = {
                                year: expense.expenseDate.getFullYear(),
                                month: expense.expenseDate.getMonth() + 1,
                                day: expense.expenseDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.expenseModalRef(component, expense);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.expenseModalRef(component, new Expense());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    expenseModalRef(component: Component, expense: Expense): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.expense = expense;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
