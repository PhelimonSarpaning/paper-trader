const alphavantage = require('./alphavantage.js');
const iex = require('./iex.js');

function loop() {
    db.sequelize.sync().then((onFulfilled) => {
        //alphavantage.loop();
    });
};

function stockinfo(ticker) {
    iex.data(ticker).then((asdf) => {
        console.log(asdf);
    });
};

module.exports = {
    loop: loop,
    stockinfo: stockinfo
}