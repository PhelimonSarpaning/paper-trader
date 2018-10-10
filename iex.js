const request = require('request');

function data(ticker) {

    const promise = new Promise((resolve, reject) => {

        let profile = request('https://api.iextrading.com/1.0/stock/' + ticker + '/quote', (error, response, body) => {

            /* Error handling still needed */
            if (body != 'Unknown symbol') {
                let raw = JSON.parse(body);
                resolve({
                    symbol: raw.symbol,
                    name: raw.companyName,
                    exchange: raw.primaryExchange,
                    sector: raw.sector,
                    price: raw.latestPrice,
                    open: raw.open,
                    close: raw.close
                });
            }
            else {
                reject('Error: Unknown Stock Symbol');
            }

        });

    });

    return promise;
};


module.exports = {
    data: data
};

