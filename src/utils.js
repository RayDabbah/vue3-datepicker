export const dow = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export const range = (end, start = 0) => {
    let arr = [];
    for (let i = start; i <= end; i++) {
        arr.push(i);
    }

    return arr;
}

export const sum = val1 => operator => val2 => {
    switch (operator) {
        case '+':
            return val1 + val2;
        case '-':
            return val1 - val2;
    }
}