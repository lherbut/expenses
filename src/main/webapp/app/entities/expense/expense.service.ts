import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Expense } from './expense.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Expense>;

@Injectable()
export class ExpenseService {

    private resourceUrl =  SERVER_API_URL + 'api/expenses';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(expense: Expense): Observable<EntityResponseType> {
        const copy = this.convert(expense);
        return this.http.post<Expense>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(expense: Expense): Observable<EntityResponseType> {
        const copy = this.convert(expense);
        return this.http.put<Expense>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Expense>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Expense[]>> {
        const options = createRequestOption(req);
        return this.http.get<Expense[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Expense[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Expense = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Expense[]>): HttpResponse<Expense[]> {
        const jsonResponse: Expense[] = res.body;
        const body: Expense[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Expense.
     */
    private convertItemFromServer(expense: Expense): Expense {
        const copy: Expense = Object.assign({}, expense);
        copy.expenseDate = this.dateUtils
            .convertLocalDateFromServer(expense.expenseDate);
        return copy;
    }

    /**
     * Convert a Expense to a JSON which can be sent to the server.
     */
    private convert(expense: Expense): Expense {
        const copy: Expense = Object.assign({}, expense);
        copy.expenseDate = this.dateUtils
            .convertLocalDateToServer(expense.expenseDate);
        return copy;
    }
}
