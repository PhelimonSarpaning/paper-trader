if (!global.hasOwnProperty('db')) {
  const Sequelize = require('sequelize');
  let sequelize = null;

  if (process.env.DATABASE_URL) {
    // the application is executed on Heroku ... use the postgres database
    sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect:  'postgres',
      protocol: 'postgres',
      logging:  true, //false
      dialectOptions: {
        ssl: true
    }
    });
    console.log('wassuh');
  }
  else {
    // the application is executed on the local machine ... use mysql
    sequelize = new Sequelize('example-app-db', 'root', null, {
      dialect: 'postgres'
    });
    console.log(':(');
  }

  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    //User:      sequelize.import(__dirname + '/user') 
    // add your other models here
  }

  /*
    Associations can be defined here. E.g. like this:
    global.db.User.hasMany(global.db.SomethingElse)
  */
}

module.exports = global.db