module.exports = function (sequelize, DataTypes){

    const Indice = sequelize.define('indice', {
        symbol: {
            type: DataTypes.STRING,
            validate: {
                is: /^[a-z]+$/i
            }
        },
        description: DataTypes.TEXT,
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
        }
    });
    return Indice;
}


