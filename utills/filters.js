import * as currency from "currency-formatter";

export function money(money = 0, symbol = "", symbol_left = true, fixed = 2) {
    if (money == undefined) {
        money = 0;
    }
    money = Number(money);
    if (symbol_left) {
        return currency.format(money, {
            symbol: symbol,
            decimal: ".",
            thousand: ",",
            precision: fixed,
            format: {
                pos: "%s %v",
                neg: "-%s %v",
                zero: "%s %v",
            },
        });
    }
    let format = currency.format(money, {
        symbol: symbol,
        decimal: ".",
        thousand: ",",
        precision: fixed,
        format: {
            pos: "%v %s",
            neg: "-%v %s",
            zero: "%v %s",
        },
    });
    if (money >= 1) {
        format = currency.format(money, {
            symbol: symbol,
            decimal: ".",
            thousand: ",",
            precision: 2,
            format: {
                pos: "%v %s",
                neg: "-%v %s",
                zero: "%v %s",
            },
        });
    }
    return format;
}
