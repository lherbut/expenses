/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ExpensesTestModule } from '../../../test.module';
import { ExpenseDetailComponent } from '../../../../../../main/webapp/app/entities/expense/expense-detail.component';
import { ExpenseService } from '../../../../../../main/webapp/app/entities/expense/expense.service';
import { Expense } from '../../../../../../main/webapp/app/entities/expense/expense.model';

describe('Component Tests', () => {

    describe('Expense Management Detail Component', () => {
        let comp: ExpenseDetailComponent;
        let fixture: ComponentFixture<ExpenseDetailComponent>;
        let service: ExpenseService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ExpensesTestModule],
                declarations: [ExpenseDetailComponent],
                providers: [
                    ExpenseService
                ]
            })
            .overrideTemplate(ExpenseDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ExpenseDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExpenseService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Expense(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.expense).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
