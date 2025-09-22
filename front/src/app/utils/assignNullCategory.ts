import { AmountByGrouping } from "../models/amount-by-grouping";

export const assignNullCategory = (data: AmountByGrouping[]): AmountByGrouping[] => {
    return data.map((amountByGrouping): AmountByGrouping => {
        console.log(amountByGrouping)
        if (amountByGrouping.grouping === null || amountByGrouping.grouping === '') {
            return {
                grouping: 'Non classé',
                amount: amountByGrouping.amount
            }
        }
        return amountByGrouping;
    })
}