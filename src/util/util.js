export const addThousandsSeparator = (num) => {
    if(num == null || isNaN(num)) return "";

    const numStr = num.toString();
    const parts = numStr.split('.');

    let integerPart = parts[0];
    let fractionalPart = parts[1];

    const lastThree = integerPart.substring(integerPart.length - 3);
    const otherNumbers = integerPart.substring(0, integerPart.length - 3);

    if(otherNumbers !== ''){
        const formattedOtherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
        integerPart = formattedOtherNumbers + ',' + lastThree;
    } else {
        integerPart =  lastThree;
    }

    return fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart;
}

// --- Chart data helpers ---

// Adds ordinal suffix: 1 -> 1st, 2 -> 2nd, 3 -> 3rd, 6 -> 6th, etc.
const getOrdinalDay = (day) => {
    if (day > 3 && day < 21) return `${day}th`;
    switch (day % 10) {
        case 1: return `${day}st`;
        case 2: return `${day}nd`;
        case 3: return `${day}rd`;
        default: return `${day}th`;
    }
}

// Formats a date like "6th Jul"
const getMonthLabel = (dateInput) => {
    const date = new Date(dateInput);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    return `${getOrdinalDay(day)} ${month}`;
}

// Groups transactions by exact date (YYYY-MM-DD) and sums their amounts
const groupTransactionsByDate = (transactions) => {
    const grouped = {};

    transactions.forEach((t) => {
        const dateKey = new Date(t.date).toISOString().split('T')[0]; // "2025-07-06"

        if (!grouped[dateKey]) {
            grouped[dateKey] = {
                date: dateKey,
                totalAmount: 0,
                items: [],
                month: getMonthLabel(t.date),
            };
        }

        grouped[dateKey].totalAmount += Number(t.amount) || 0;
        grouped[dateKey].items.push(t);
    });

    return Object.values(grouped).sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );
}

export const prepareIncomeLineChartData = (transactions) => {
    if (!Array.isArray(transactions) || transactions.length === 0) return [];
    return groupTransactionsByDate(transactions);
}

export const prepareExpenseLineChartData = (transactions) => {
    if (!Array.isArray(transactions) || transactions.length === 0) return [];
    return groupTransactionsByDate(transactions);
}