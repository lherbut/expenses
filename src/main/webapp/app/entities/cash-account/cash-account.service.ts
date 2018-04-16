import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CashAccount } from './cash-account.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CashAccount>;

@Injectable()
export class CashAccountService {

    private resourceUrl =  SERVER_API_URL + 'api/cash-accounts';

    constructor(private http: HttpClient) { }

    create(cashAccount: CashAccount): Observable<EntityResponseType> {
        const copy = this.convert(cashAccount);
        return this.http.post<CashAccount>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cashAccount: CashAccount): Observable<EntityResponseType> {
        const copy = this.convert(cashAccount);
        return this.http.put<CashAccount>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CashAccount>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CashAccount[]>> {
        const options = createRequestOption(req);
        return this.http.get<CashAccount[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CashAccount[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CashAccount = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CashAccount[]>): HttpResponse<CashAccount[]> {
        const jsonResponse: CashAccount[] = res.body;
        const body: CashAccount[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CashAccount.
     */
    private convertItemFromServer(cashAccount: CashAccount): CashAccount {
        const copy: CashAccount = Object.assign({}, cashAccount);
        return copy;
    }

    /**
     * Convert a CashAccount to a JSON which can be sent to the server.
     */
    private convert(cashAccount: CashAccount): CashAccount {
        const copy: CashAccount = Object.assign({}, cashAccount);
        return copy;
    }
}
