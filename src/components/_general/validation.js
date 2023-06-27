
export function validateInn(inn) {
    let result = false;

    let error = {
        code: 0,
        message: ''
    }

    if (typeof inn === 'number') {
        inn = inn.toString();
    } else if (typeof inn !== 'string') {
        inn = '';
    }

    if (!inn.length) {
        error.code = 1;
        error.message = 'ИНН пуст';
    } else if (/[^0-9]/.test(inn)) {
        error.code = 2;
        error.message = 'ИНН может состоять только из цифр';
    } else if ([10, 12].indexOf(inn.length) === -1) {
        error.code = 3;
        error.message = 'ИНН может состоять только из 10 или 12 цифр';
    } else {
        let checkDigit = function (inn, coefficients) {
            let n = 0;
            for (let i in coefficients) {
                n += coefficients[i] * inn[i];
            }
            return parseInt(n % 11 % 10);
        };
        switch (inn.length) {
            case 10:
                let n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
                if (n10 === parseInt(inn[9])) {
                    result = true;
                }
                break;
            case 12:
                let n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                let n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                if ((n11 === parseInt(inn[10])) && (n12 === parseInt(inn[11]))) {
                    result = true;
                }
                break;
            default:
                break;
        }
    }
    return result? result : error.message;
}

export function validateLimit(docs) {
    let error;

    if (docs > 0 && docs <= 1000) {
        return true;
    } else if (typeof docs !== 'number') {
        error = 'Введите корректные данные';
        return error;
    }
}

export function validateDate(start, end) {
    let startD = new Date(start);
    let endD = new Date(end);
    let now = new Date();
    let error;

    if (startD.getTime() > now.getTime()) {
        error = 'Дата не может быть больше текущей';
        return error;
    } else if(endD.getTime() < startD.getTime()) {
        error = 'Дата начала не может быть больше даты окончания';
        return error;
    } else {
        return true;
    }

}

// export function validateRequired