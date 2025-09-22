import { AmountByGrouping } from "../models/amount-by-grouping";

export const assignNullCategory = (data: AmountByGrouping[]): AmountByGrouping[] => {
    return data.map((amountByGrouping): AmountByGrouping => {
        if (amountByGrouping.grouping === null || amountByGrouping.grouping === '') {
            return {
                grouping: 'Non classé',
                amount: amountByGrouping.amount
            }
        }
        return amountByGrouping;
    })
}