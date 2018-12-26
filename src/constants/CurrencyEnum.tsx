export enum CurrencyList {
    RUB,
    USD,
    EUR
}

export var CurrencyInfo = {
    [CurrencyList.RUB]: {
       rate: 1,
       sign:'₽'
    },
    [CurrencyList.USD]: {
        rate: 68,
        sign: '$'
    },
    [CurrencyList.EUR]: {
        rate: 78,
        sign:'€'
    }
};