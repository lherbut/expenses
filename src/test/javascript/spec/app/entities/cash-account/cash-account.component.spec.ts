/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ExpensesTestModule } from '../../../test.module';
import { CashAccountComponent } from '../../../../../../main/webapp/app/entities/cash-account/cash-account.component';
import { CashAccountService } from '../../../../../../main/webapp/app/entities/cash-account/cash-account.service';
import { CashAccount } from '../../../../../../main/webapp/app/entities/cash-account/cash-account.model';

describe('Component Tests', () => {

    describe('CashAccount Management Component', () => {
        let comp: CashAccountComponent;
        let fixture: ComponentFixture<CashAccountComponent>;
        let service: CashAccountService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ExpensesTestModule],
                declarations: [CashAccountComponent],
                providers: [
                    CashAccountService
                ]
            })
            .overrideTemplate(CashAccountComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CashAccountComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CashAccountService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CashAccount(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cashAccounts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
