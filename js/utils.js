// Utils functions and constants will be available globally
const currencyCode = {
    "AED": "ae",
    "ARS": "ar",
    "AUD": "au",
    "BHD": "bh",
    "BRL": "br",
    "CAD": "ca",
    "CHF": "ch",
    "CLP": "cl",
    "CNY": "cn",
    "COP": "co",
    "CZK": "cz",
    "DKK": "dk",
    "EUR": "eu",
    "GBP": "gb",
    "HKD": "hk",
    "HRK": "hr",
    "HUF": "hu",
    "IDR": "id",
    "ILS": "il",
    "INR": "in",
    "ISK": "is",
    "JPY": "jp",
    "KRW": "kr",
    "KWD": "kw",
    "MAD": "ma",
    "MXN": "mx",
    "MYR": "my",
    "NGN": "ng",
    "NOK": "no",
    "NZD": "nz",
    "OMR": "om",
    "PEN": "pe",
    "PHP": "ph",
    "PLN": "pl",
    "RON": "ro",
    "RUB": "ru",
    "SEK": "se",
    "SGD": "sg",
    "THB": "th",
    "TRY": "tr",
    "TWD": "tw",
    "USD": "us",
    "VND": "vn",
    "ZAR": "za",
    "EGP": "eg"
};

const currencySymbols = {
    AED: "د.إ",
    ALL: "L",
    AMD: "֏",
    AOA: "Kz",
    ARS: "$",
    AUD: "$",
    BAM: "KM",
    BDT: "৳",
    BGN: "лв",
    BHD: ".د.ب",
    BIF: "FBu",
    BRL: "R$",
    BYN: "Br",
    CAD: "$",
    CHF: "CHF",
    CLP: "$",
    CNH: "¥",
    CNY: "¥",
    COP: "$",
    CZK: "Kč",
    DKK: "kr",
    EGP: "£",
    EUR: "€",
    GBP: "£",
    GHS: "₵",
    HKD: "$",
    HRK: "kn",
    HUF: "Ft",
    IDR: "Rp",
    ILS: "₪",
    INR: "₹",
    ISK: "kr",
    JOD: "د.ا",
    JPY: "¥",
    KES: "KSh",
    KRW: "₩",
    KWD: "د.ك",
    KZT: "₸",
    LBP: "ل.ل",
    LKR: "Rs",
    MAD: "د.م.",
    MUR: "₨",
    MXN: "$",
    MYR: "RM",
    NGN: "₦",
    NOK: "kr",
    NZD: "$",
    OMR: "ر.ع.",
    PEN: "S/",
    PHP: "₱",
    PKR: "₨",
    PLN: "zł",
    QAR: "ر.ق",
    RON: "lei",
    RUB: "₽",
    SAR: "﷼",
    SEK: "kr",
    SGD: "$",
    THB: "฿",
    TND: "د.ت",
    TRY: "₺",
    TWD: "NT$",
    TZS: "Sh",
    UAH: "₴",
    UGX: "USh",
    USD: "$",
    VND: "₫",
    XAF: "FCFA",
    XOF: "CFA",
    XAG: "Ag",
    XAU: "Au",
    XPD: "Pd",
    XPT: "Pt",
    ZAR: "R",
    ZWL: "$",
  };

function createChart(timeSeriesData, myChartInstance) {
    const ctx = document.getElementById('myChart');

    if (myChartInstance) {
        myChartInstance.destroy();
    }

    const data = {
        labels: timeSeriesData.map(item => item.date),
        datasets: [{
            label: 'Currency Exchange Rate',
            data: timeSeriesData.map(item => item.close),
            fill: true,
            borderColor: 'rgb(180, 222, 128)',
            backgroundColor: 'rgb(242, 250, 234)',
            tension: 0.1,
            pointRadius: 0,
            borderWidth: 2,
        }]
    };

    return new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: false, grid: {display:false}, display:false },
                x: { grid: { display: false }, display:false }
            }
        }
    });
}

function updateUI(currency1, currency2) {
    // Update symbol
    const symbol = document.getElementById('symbol');
    symbol.textContent = currencySymbols[currency2];

    // Update flags
    const flag1 = document.getElementById('flag1');
    const flag2 = document.getElementById('flag2');
    flag1.className = `fi fi-${currencyCode[currency1.toUpperCase()]}`;
    flag2.className = `fi fi-${currencyCode[currency2.toUpperCase()]}`;

    // Update currency pair display
    document.getElementById('currency-pair').textContent = `${currency1}/${currency2}`;
} 