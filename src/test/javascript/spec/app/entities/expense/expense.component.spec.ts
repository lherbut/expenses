/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ExpensesTestModule } from '../../../test.module';
import { ExpenseComponent } from '../../../../../../main/webapp/app/entities/expense/expense.component';
import { ExpenseService } from '../../../../../../main/webapp/app/entities/expense/expense.service';
import { Expense } from '../../../../../../main/webapp/app/entities/expense/expense.model';

describe('Component Tests', () => {

    describe('Expense Management Component', () => {
        let comp: ExpenseComponent;
        let fixture: ComponentFixture<ExpenseComponent>;
        let service: ExpenseService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ExpensesTestModule],
                declarations: [ExpenseComponent],
                providers: [
                    ExpenseService
                ]
            })
            .overrideTemplate(ExpenseComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ExpenseComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExpenseService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Expense(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.expenses[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
