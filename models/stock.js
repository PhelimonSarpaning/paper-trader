module.exports = function (sequelize, DataTypes){

    const Stock = sequelize.define('stock', {
        symbol: {
            type: DataTypes.STRING,
            validate: {
                is: /^[a-z]+$/i
            }
        },
        name: DataTypes.TEXT,
        primaryexchange: DataTypes.TEXT,
        sector: DataTypes.TEXT,
        currentprice: {
            type: DataTypes.FLOAT,
            validate: {
                isFloat: true
            }
        },
        dailyopen: {
            type: DataTypes.FLOAT,
            validate: {
                isFloat: true
            }
        },
        dailyclose: {
            type: DataTypes.FLOAT,
            validate: {
                isFloat: true
            }
        }
    });
    return Stock;

}