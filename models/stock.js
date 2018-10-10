module.exports = function (sequelize, DataTypes) {

    const Stock = sequelize.define('stock', {
        symbol: DataTypes.STRING,
        username: DataTypes.TEXT,
        buyprice: DataTypes.FLOAT,
        shares: DataTypes.INTEGER
    });
    return Stock;

}