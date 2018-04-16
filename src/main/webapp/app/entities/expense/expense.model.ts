import { BaseEntity } from './../../shared';

export class Expense implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public location?: string,
        public expenseDate?: any,
        public amount?: number,
        public cashAccount?: BaseEntity,
        public category?: BaseEntity,
    ) {
    }
}
