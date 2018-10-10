const bcrypt = require('bcryptjs');

module.exports = function (sequelize, DataTypes) {

    // setup User model and its fields.
    const User = sequelize.define('users', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
            hooks: {
                beforeCreate: (user) => {
                    return new Promise((resolve, reject) => {
                        bcrypt.hash(user.password, 10, (error, hash) => {
                            user.password = hash;
                            resolve();
                        })

                    });
                }
            },
            /*instanceMethods: {
                validPassword: function (password) {
                    return bcrypt.compareSync(password, this.password);
                }
            }*/
        });

    User.prototype.validPassword = function (password) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, this.password, (error, bool) => {

                resolve(bool);

            });
        });
    };
    
    return User;
}