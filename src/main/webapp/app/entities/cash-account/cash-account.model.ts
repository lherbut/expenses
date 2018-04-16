import { BaseEntity } from './../../shared';

export class CashAccount implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}
