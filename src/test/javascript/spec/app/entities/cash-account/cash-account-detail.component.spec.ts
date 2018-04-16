/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ExpensesTestModule } from '../../../test.module';
import { CashAccountDetailComponent } from '../../../../../../main/webapp/app/entities/cash-account/cash-account-detail.component';
import { CashAccountService } from '../../../../../../main/webapp/app/entities/cash-account/cash-account.service';
import { CashAccount } from '../../../../../../main/webapp/app/entities/cash-account/cash-account.model';

describe('Component Tests', () => {

    describe('CashAccount Management Detail Component', () => {
        let comp: CashAccountDetailComponent;
        let fixture: ComponentFixture<CashAccountDetailComponent>;
        let service: CashAccountService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ExpensesTestModule],
                declarations: [CashAccountDetailComponent],
                providers: [
                    CashAccountService
                ]
            })
            .overrideTemplate(CashAccountDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CashAccountDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CashAccountService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CashAccount(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cashAccount).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
